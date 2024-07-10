import { Address, DeepNullable } from "@juhuu/sdk-ts";

function validateStringAuthenticity(text: string | null | undefined) {
  // console.log("validateStringAuthenticity'", text, "'");

  if (text === undefined || text === null || text === "") {
    return false;
  }

  if (text.length > 200 || text.length < 4) {
    return false;
  }

  return true;
}

export default function validateAddress(
  address: Partial<DeepNullable<Address>> | null | undefined
): boolean {
  // console.log("address", address);

  if (address === null || address === undefined) {
    return false;
  }

  if (validateStringAuthenticity(address.line1) === false) {
    return false;
  }

  if (validateStringAuthenticity(address.postalCode) === false) {
    return false;
  }

  if (validateStringAuthenticity(address.city) === false) {
    return false;
  }

  if (address.country !== "AT" && address.country !== "DE") {
    return false;
  }

  return true;
}
