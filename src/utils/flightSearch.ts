export type FlightTripType =
  | "oneway"
  | "roundtrip";

export interface FlightSearchParams {
  fromCode: string;
  toCode: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  tripType: FlightTripType;
}

function pad(
  value: number,
): string {
  return String(value).padStart(
    2,
    "0",
  );
}

function parseISODate(
  value: string,
): Date | null {
  if (!value) {
    return null;
  }

  const [
    year,
    month,
    day,
  ] = value
    .split("-")
    .map(Number);

  if (
    !year ||
    !month ||
    !day
  ) {
    return null;
  }

  const date =
    new Date(
      year,
      month - 1,
      day,
    );

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return null;
  }

  return date;
}

function formatTravelpayoutsDate(
  value: string,
): string {
  const date =
    parseISODate(value);

  if (!date) {
    return "";
  }

  return `${pad(
    date.getDate(),
  )}${pad(
    date.getMonth() + 1,
  )}`;
}

export function buildFlightSearchCode({
  fromCode,
  toCode,
  departureDate,
  returnDate,
  passengers,
  tripType,
}: FlightSearchParams): string {
  const departure =
    formatTravelpayoutsDate(
      departureDate,
    );

  if (!departure) {
    throw new Error(
      "Invalid departure date.",
    );
  }

  let code =
    `${fromCode}${departure}${toCode}`;

  if (
    tripType ===
      "roundtrip" &&
    returnDate
  ) {
    const returnCode =
      formatTravelpayoutsDate(
        returnDate,
      );

    if (!returnCode) {
      throw new Error(
        "Invalid return date.",
      );
    }

    code +=
      `${returnCode}${fromCode}`;
  }

  code += String(
    passengers,
  );

  return code;
}

export function buildFlightResultsUrl(
  params: FlightSearchParams,
): string {
  const flightSearch =
    buildFlightSearchCode(
      params,
    );

  const query =
    new URLSearchParams();

  query.set(
    "flightSearch",
    flightSearch,
  );

  query.set(
    "destination_airports",
    "0",
  );

  return `/flights?${query.toString()}`;
}