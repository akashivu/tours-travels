export type DestinationSize =
  | "small"
  | "medium"
  | "large";

export interface Destination {
  id: number;
  title: string;
  country: string;
  image: string;
  size: DestinationSize;
}

export interface DestinationCardProps {
  destination: Destination;
}