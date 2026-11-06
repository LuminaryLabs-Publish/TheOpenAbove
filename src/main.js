// Fast, isolated racing startup: the renderable course is not gated on world-generation workers.
const loader=document.getElementById("boot");
const message=document.getElementById("bootMessage");
function fail(error) {
  console.error("The Open Above startup failed",error);
  loader.hidden=false;
  loader.classList.add("failed");
  message.textContent="Unable to start the renderer. "+String(error?.message||error)+". Check WebGL support and reload.";
  const retry=document.getElementById("bootRetry");
  retry.hidden=false;
  retry.onclick=()=>location.reload();
}
import("./parasail/parasail-app.js").then(({startParasail})=>{
  const app=startParasail();
  window.GameHost=Object.freeze({getState:app.getState,getMode:()=>"parasailing",dispose:app.dispose});
}).catch(fail);
