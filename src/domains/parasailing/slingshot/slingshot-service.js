// Parasailing Domain / Slingshot Service — independent of cloud combo scoring.
import {createDiveRecoveryState,advanceDiveRecovery} from "./recovery-kit.js";
export const DIVE_SLINGSHOT_SERVICE_ID="open-above:parasailing:slingshot";
export function createDiveSlingshotService(){
  let state=createDiveRecoveryState();
  return Object.freeze({
    id:DIVE_SLINGSHOT_SERVICE_ID,
    update(flight,controls){
      const next=advanceDiveRecovery(state,flight,controls);
      state=Object.freeze({phase:next.phase,armed:next.armed,awards:next.awards,
        diveDistance:next.diveDistance,peakDescent:next.peakDescent,
        lastEvent:next.lastEvent});
      return next.event;
    },
    reset(){state=createDiveRecoveryState();return this.snapshot();},
    snapshot(){return Object.freeze({...state});}
  });
}
