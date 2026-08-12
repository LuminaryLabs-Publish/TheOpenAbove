import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const valueFor = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? null : args[index + 1];
};

const root = execFileSync("git", ["rev-parse", "--show-toplevel"], {
  encoding: "utf8",
}).trim();
const range = valueFor("--range");
const reportPath = valueFor("--report");

const segmentPath = (...segments) => segments.join("");
const patterns = [
  { id: "mac-home", category: "machine-path", regex: new RegExp(segmentPath("/", "Users", "/[^/\\s]+/"), "g") },
  { id: "linux-home", category: "machine-path", regex: new RegExp(segmentPath("/", "home", "/[^/\\s]+/"), "g") },
  { id: "windows-home", category: "machine-path", regex: /[A-Za-z]:\\Users\\[^\\\s]+\\/g },
  { id: "mac-private-temp", category: "machine-path", regex: new RegExp(segmentPath("/", "private", "/", "tmp", "/"), "g") },
  { id: "mac-var-folders", category: "machine-path", regex: new RegExp(segmentPath("/", "var", "/", "folders", "/"), "g") },
  { id: "github-classic-token", category: "credential", regex: /\bghp_[A-Za-z0-9]{20,}\b/g },
  { id: "github-fine-token", category: "credential", regex: /\bgithub_pat_[A-Za-z0-9_]{20,}\b/g },
  { id: "openai-token", category: "credential", regex: /\bsk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{20,}\b/g },
  { id: "aws-access-key", category: "credential", regex: /\bAKIA[0-9A-Z]{16}\b/g },
  { id: "google-api-key", category: "credential", regex: /\bAIza[0-9A-Za-z_-]{30,}\b/g },
  { id: "private-key", category: "credential", regex: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g },
  { id: "authorization-header", category: "credential", regex: /Authorization\s*:\s*(?:Bearer|Basic)\s+\S+/gi },
  { id: "credential-url", category: "credential", regex: /https?:\/\/[^\s/@:]+:[^\s/@]+@/g },
  { id: "private-network-url", category: "private-endpoint", regex: /https?:\/\/(?:10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(?:1[6-9]|2\d|3[01])\.\d+\.\d+)(?::\d+)?/g },
];

const riskyPathPatterns = [
  /(^|\/)\.env(?:\.|$)/,
  /(^|\/)(?:credentials?|secrets?)[^/]*\.json$/i,
  /\.(?:pem|key|p12|pfx|jks|keystore)$/i,
  /(^|\/)id_(?:rsa|ed25519)/i,
];

const runGit = (gitArgs, options = {}) => execFileSync("git", gitArgs, {
  cwd: root,
  encoding: options.encoding ?? "utf8",
  maxBuffer: 64 * 1024 * 1024,
});

const splitNull = (value) => value.toString().split("\0").filter(Boolean);
const isText = (buffer) => !buffer.subarray(0, 8192).includes(0);

function scanContent(file, content, target, commit = null) {
  if (!isText(content)) return false;
  const text = content.toString("utf8");
  for (const pattern of patterns) {
    pattern.regex.lastIndex = 0;
    let count = 0;
    while (pattern.regex.exec(text)) count += 1;
    if (count > 0) target.push({
      category: pattern.category,
      pattern: pattern.id,
      path: file,
      count,
      ...(commit ? { commit } : {}),
    });
  }
  return true;
}

function scanWorkingTree() {
  const files = splitNull(runGit(["ls-files", "-co", "--exclude-standard", "-z"], { encoding: "buffer" }));
  const findings = [];
  let textFiles = 0;
  for (const file of files) {
    const content = readFileSync(path.join(root, file));
    if (scanContent(file, content, findings)) textFiles += 1;
    if (riskyPathPatterns.some((pattern) => pattern.test(file)) && file !== ".env.example") {
      findings.push({ category: "risky-file", pattern: "sensitive-filename", path: file, count: 1 });
    }
  }
  return { files: files.length, textFiles, findings };
}

function scanHistory() {
  if (!range) return { range: null, commits: 0, textFiles: 0, findings: [] };
  const commits = runGit(["rev-list", "--reverse", range]).trim().split("\n").filter(Boolean);
  const findings = [];
  let textFiles = 0;
  for (const commit of commits) {
    const files = splitNull(runGit(["ls-tree", "-rz", "--name-only", commit], { encoding: "buffer" }));
    for (const file of files) {
      let content;
      try {
        content = runGit(["show", `${commit}:${file}`], { encoding: "buffer" });
      } catch {
        continue;
      }
      if (scanContent(file, content, findings, commit)) textFiles += 1;
      if (riskyPathPatterns.some((pattern) => pattern.test(file)) && file !== ".env.example") {
        findings.push({ category: "risky-file", pattern: "sensitive-filename", path: file, count: 1, commit });
      }
    }
  }
  return { range, commits: commits.length, textFiles, findings };
}

const tree = scanWorkingTree();
const history = scanHistory();
const allFindings = [...tree.findings, ...history.findings];
const report = {
  schemaVersion: "the-open-above.sanitization-report/1",
  repository: ".",
  tree: {
    filesScanned: tree.files,
    textFilesScanned: tree.textFiles,
    findings: tree.findings,
  },
  history: {
    range: history.range,
    commitsScanned: history.commits,
    textFilesScanned: history.textFiles,
    findings: history.findings,
  },
  findingCount: allFindings.reduce((sum, finding) => sum + finding.count, 0),
  result: allFindings.length === 0 ? "passed" : "blocked",
};
report.integrity = createHash("sha256").update(JSON.stringify(report)).digest("hex");

if (reportPath) {
  const absoluteReport = path.resolve(root, reportPath);
  mkdirSync(path.dirname(absoluteReport), { recursive: true });
  writeFileSync(absoluteReport, `${JSON.stringify(report, null, 2)}\n`);
}

console.log(JSON.stringify({
  treeFilesScanned: report.tree.filesScanned,
  historyRange: report.history.range,
  historyCommitsScanned: report.history.commitsScanned,
  findingCount: report.findingCount,
  result: report.result,
  report: reportPath,
}, null, 2));

if (report.result !== "passed") process.exitCode = 1;
