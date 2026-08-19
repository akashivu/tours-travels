export type DestinationCategory =
  | "all"
  | "beaches"
  | "mountains"
  | "cities"
  | "adventure"
  | "culture";

export interface Destination {
  id: string;

  name: string;

  slug: string;

  country: string;

  coordinates: [number, number];

  category: Exclude<
    DestinationCategory,
    "all"
  >;

  image: string;

  description: string;
}
export interface GooglePhoto {
  name: string;
  widthPx?: number;
  heightPx?: number;
  authorAttributions?: {
    displayName: string;
    uri: string;
    photoUri?: string;
  }[];
}