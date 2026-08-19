export interface MapCoordinate {
  latitude: number;

  longitude: number;
}

export interface MapPlace {
  id: string;

  name: string;

  coordinate: MapCoordinate;

  type?: "hotel" | "place" | "airport" | "destination";

  imageUrl?: string;
}

export interface MapRoute {
  coordinates: MapCoordinate[];

  distanceMeters?: number;

  durationSeconds?: number;
}

export interface TripMapData {
  origin?: MapPlace;

  destination?: MapPlace;

  stops?: MapPlace[];

  route?: MapRoute;

  places?: MapPlace[];

  hotels?: MapPlace[];
}