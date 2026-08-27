export interface TravelLocations {
  origin: string | null;
  destination: string | null;
}

export function extractTravelLocations(
  message: string
): TravelLocations {
  /*
   * Matches examples such as:
   *
   * "Bengaluru to Dubai"
   * "Flight from Mumbai to London"
   * "Plan a trip from Delhi to Paris"
   */

  const fromToPattern =
    /\bfrom\s+(.+?)\s+to\s+(.+?)(?:[?.!,]|$)/i;

  const directToPattern =
    /\b([A-Za-z\s]+?)\s+to\s+([A-Za-z\s]+?)(?:[?.!,]|$)/i;

  const fromToMatch =
    message.match(fromToPattern);

  if (fromToMatch) {
    return {
      origin: fromToMatch[1].trim(),
      destination: fromToMatch[2].trim(),
    };
  }

  /*
   * Simple fallback for prompts such as
   * "Bengaluru to Dubai".
   */
  const directMatch =
    message.match(directToPattern);

  if (directMatch) {
    return {
      origin: directMatch[1].trim(),
      destination: directMatch[2].trim(),
    };
  }

  return {
    origin: null,
    destination: null,
  };
}