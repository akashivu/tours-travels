export interface Hotel {
  id: string;
  name: string;
  location: string;
  price: string;
  rating: string;
  ratingLabel: string;
  image: string;
  amenities: string[];
}

export const HOTELS: Hotel[] = [
  {
    id: "alila-seminyak",
    name: "Alila Seminyak",
    location: "Seminyak, Bali",
    price: "₹12,400",
    rating: "4.8",
    ratingLabel: "Excellent",
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1000&q=85",
    amenities: [
      "Beachfront",
      "Free breakfast",
      "Pool",
    ],
  },

  {
    id: "anantara-ubud",
    name: "Anantara Ubud Bali Resort",
    location: "Ubud, Bali",
    price: "₹9,800",
    rating: "4.7",
    ratingLabel: "Excellent",
    image:
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1000&q=85",
    amenities: [
      "Pool",
      "Spa",
      "Free breakfast",
    ],
  },

  {
    id: "westin-nusa-dua",
    name: "The Westin Resort Nusa Dua",
    location: "Nusa Dua, Bali",
    price: "₹14,200",
    rating: "4.9",
    ratingLabel: "Exceptional",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=85",
    amenities: [
      "Beachfront",
      "Pool",
      "Spa",
    ],
  },
];