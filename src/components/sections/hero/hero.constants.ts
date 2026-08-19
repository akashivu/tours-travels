import switzerland from "../../../assets/images/destinations/switzerland.jpg";
import bali from "../../../assets/images/destinations/bali.jpg";
import santorini from "../../../assets/images/destinations/santorini.jpg";
import dubai from "../../../assets/images/destinations/dubai.jpg";
import japan from "../../../assets/images/destinations/japan.jpg";

import type { Destination } from "./hero.types";

export const DESTINATIONS: Destination[] = [
  {
    id: 1,
    title: "Swiss Alps",
    country: "Switzerland",
    image: switzerland,
    size: "large",
  },
  {
    id: 2,
    title: "Ubud",
    country: "Bali",
    image: bali,
    size: "medium",
  },
  {
    id: 3,
    title: "Blue Domes",
    country: "Santorini",
    image: santorini,
    size: "large",
  },
  {
    id: 4,
    title: "Skyline",
    country: "Dubai",
    image: dubai,
    size: "small",
  },
  {
    id: 5,
    title: "Mount Fuji",
    country: "Japan",
    image: japan,
    size: "small",
  },
];

export const POPULAR_SEARCHES = [
  { label: "Bali" },
  { label: "Japan" },
  { label: "Dubai" },
  { label: "Switzerland" },
  { label: "Maldives" },
];