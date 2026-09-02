export const MAIL_ROUTE_KIT_ID = "open-above-mail-route-kit";

export function createDefaultMailTowns() {
  return FIVE_TOWNS;
}

export function createDefaultMailRoute() {
  return Object.freeze({
    id: "meadow-mail-run",
    parcel: Object.freeze({
      id: "parcel-001",
      label: "Brookhaven Letter Bag",
      destinationTownId: "brookhaven"
    }),
    correctAirstreamId: "meadow-to-brookhaven",
    towns: createDefaultMailTowns()
  });
}
import { FIVE_TOWNS } from "../../data/five-towns.config.js";
