import {makeCloudComboZones,distanceToCloudSegment} from "./cloud-zone-kit.js";
import {awardCloudMomentum} from "./momentum-chain-kit.js";

export const CLOUD_COMBO_DOMAIN_ID="open-above:parasailing:cloud-combo";
export function createCloudComboDomain({heightAt,zoneCount=13}={}){
  const zones=makeCloudComboZones(heightAt,zoneCount);
  let seen=new Set(),previous=null;
  let state=Object.freeze({combo:0,momentum:0,score:0,lastEvent:null});
  function update(flight){
    if(!flight||!Number.isFinite(flight.x)||!Number.isFinite(flight.y)||!Number.isFinite(flight.z))
      return null;
    let event=null;
    const from=previous||flight;
    for(const zone of zones){
      if(seen.has(zone.id))continue;
      if(distanceToCloudSegment(from,flight,zone)>zone.radius)continue;
      const kind=flight.vy>0.6?"lift-rider":flight.vy< -4?"dive-recovery":"cloud-skim";
      const next=awardCloudMomentum(state,{id:zone.id,kind});
      seen.add(zone.id);state=next;event=next.lastEvent;break;
    }
    previous={x:flight.x,y:flight.y,z:flight.z};
    return event;
  }
  function reset(){seen=new Set();previous=null;
    state=Object.freeze({combo:0,momentum:0,score:0,lastEvent:null});
    return snapshot();
  }
  function nearest(flight){
    return zones.filter(z=>!seen.has(z.id)).sort((a,b)=>
      Math.hypot(a.x-flight.x,a.y-flight.y,a.z-flight.z)-
      Math.hypot(b.x-flight.x,b.y-flight.y,b.z-flight.z))[0]||null;
  }
  function snapshot(){return Object.freeze({
    ...state,cloudsVisited:[...seen],totalClouds:zones.length
  });}
  return Object.freeze({id:CLOUD_COMBO_DOMAIN_ID,zones,update,reset,nearest,snapshot});
}
