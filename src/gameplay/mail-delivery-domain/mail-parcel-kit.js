export const MAIL_PARCEL_KIT_ID = "open-above-mail-parcel-kit";

export function createMailParcel(input = {}) {
  const id = String(input.id ?? "parcel-001");
  const destinationTownId = String(input.destinationTownId ?? "brookhaven");
  return {
    id,
    label: String(input.label ?? "Brookhaven Letter Bag"),
    destinationTownId,
    status: "in-transit",
    delivered: false,
    deliveredAt: null,
    selectedAirstreamId: null,
    message: `Deliver ${input.label ?? "the mail"} to ${destinationTownId}.`
  };
}

export function resetMailParcel(parcel) {
  parcel.status = "in-transit";
  parcel.delivered = false;
  parcel.deliveredAt = null;
  parcel.selectedAirstreamId = null;
  parcel.message = `Deliver ${parcel.label} to ${parcel.destinationTownId}.`;
  return parcel;
}
