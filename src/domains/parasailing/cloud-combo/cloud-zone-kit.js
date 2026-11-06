// Open Above / Parasailing / Cloud Combo Service / Cloud-Zone Kit.
// Descriptors and contact detection are renderer-neutral.
export const CLOUD_ZONE_KIT_ID="open-above:parasailing:cloud-combo:zones";
export function makeCloudComboZones(heightAt=()=>0,count=13){
  if(typeof heightAt!=="function")throw new TypeError("Height sampler required");
  return Object.freeze(Array.from({length:count},(_,i)=>{
    const z=-210-i*330,x=150*Math.sin((i+1)*.65)+38*Math.sin(i*1.33);
    const y=Number(heightAt(x,z))+415-45*Math.sin(i*.69);
    return Object.freeze({id:"cloud-"+String(i+1).padStart(2,"0"),x,y,z,radius:265+20*Math.sin(i*.9)});
  }));
}
export function distanceToCloudSegment(from,to,zone){
  const dx=to.x-from.x,dy=to.y-from.y,dz=to.z-from.z;
  const len2=dx*dx+dy*dy+dz*dz;
  const u=len2>0?Math.max(0,Math.min(1,((zone.x-from.x)*dx+(zone.y-from.y)*dy+(zone.z-from.z)*dz)/len2)):0;
  return Math.hypot(from.x+dx*u-zone.x,from.y+dy*u-zone.y,from.z+dz*u-zone.z);
}
