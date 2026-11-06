// Parasailing Domain / Slingshot Service.
// Owns per-flight recovery transitions; no changes to the cloud-combo domain.
import {createDiveRecoveryState,advanceDiveRecovery} from "./recovery-kit.js";
export const DIVE_SLINGSHOT_SERVICE_ID="open-above:parasailing:slingshot";
export function createDiveSlingshotService(){
  let state=createDiveRecoveryState();
  return Object.freeze({
    id:DIVE_SLINGSHOT_SERVICE_ID,
    update(flight,inputs){
      const next=advanceDiveRecovery(state,flight,inputs);
      state=Object.freeze({phase:next.phase,armed:next.armed,awards:next.awards,
        lastEvent:next.lastEvent});
      return next.event;
    },
    reset(){state=createDiveRecoveryState();return this.snapshot();},
    snapshot(){return Object.freeze({...state});}
  });
}
