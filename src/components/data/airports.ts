export type Airport = {
  code: string;
  city: string;
  airport: string;
  country: string;
};

export const AIRPORTS: Airport[] = [
  {
    code: "BLR",
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    country: "India",
  },
  {
    code: "DEL",
    city: "New Delhi",
    airport: "Indira Gandhi International Airport",
    country: "India",
  },
  {
    code: "BOM",
    city: "Mumbai",
    airport:
      "Chhatrapati Shivaji Maharaj International Airport",
    country: "India",
  },
  {
    code: "HYD",
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    country: "India",
  },
  {
    code: "MAA",
    city: "Chennai",
    airport: "Chennai International Airport",
    country: "India",
  },
  {
    code: "CCU",
    city: "Kolkata",
    airport:
      "Netaji Subhas Chandra Bose International Airport",
    country: "India",
  },
  {
    code: "COK",
    city: "Kochi",
    airport: "Cochin International Airport",
    country: "India",
  },
  {
    code: "GOI",
    city: "Goa",
    airport: "Manohar International Airport",
    country: "India",
  },
  {
    code: "PNQ",
    city: "Pune",
    airport: "Pune International Airport",
    country: "India",
  },
  {
    code: "AMD",
    city: "Ahmedabad",
    airport:
      "Sardar Vallabhbhai Patel International Airport",
    country: "India",
  },
  {
    code: "JAI",
    city: "Jaipur",
    airport: "Jaipur International Airport",
    country: "India",
  },
  {
    code: "LKO",
    city: "Lucknow",
    airport:
      "Chaudhary Charan Singh International Airport",
    country: "India",
  },
  {
    code: "IXC",
    city: "Chandigarh",
    airport: "Chandigarh International Airport",
    country: "India",
  },
  {
    code: "SXR",
    city: "Srinagar",
    airport: "Sheikh ul-Alam International Airport",
    country: "India",
  },
  {
    code: "TRV",
    city: "Thiruvananthapuram",
    airport:
      "Trivandrum International Airport",
    country: "India",
  },
  {
    code: "IXM",
    city: "Madurai",
    airport: "Madurai Airport",
    country: "India",
  },
  {
    code: "BBI",
    city: "Bhubaneswar",
    airport:
      "Biju Patnaik International Airport",
    country: "India",
  },
  {
    code: "PAT",
    city: "Patna",
    airport:
      "Jay Prakash Narayan International Airport",
    country: "India",
  },
  {
    code: "GAU",
    city: "Guwahati",
    airport:
      "Lokpriya Gopinath Bordoloi International Airport",
    country: "India",
  },
  {
    code: "NAG",
    city: "Nagpur",
    airport:
      "Dr. Babasaheb Ambedkar International Airport",
    country: "India",
  },
  {
    code: "IDR",
    city: "Indore",
    airport:
      "Devi Ahilya Bai Holkar Airport",
    country: "India",
  },
  {
    code: "VNS",
    city: "Varanasi",
    airport:
      "Lal Bahadur Shastri International Airport",
    country: "India",
  },

  // International
  {
    code: "DXB",
    city: "Dubai",
    airport: "Dubai International Airport",
    country: "United Arab Emirates",
  },
  {
    code: "SIN",
    city: "Singapore",
    airport: "Singapore Changi Airport",
    country: "Singapore",
  },
  {
    code: "LHR",
    city: "London",
    airport: "London Heathrow Airport",
    country: "United Kingdom",
  },
  {
    code: "CDG",
    city: "Paris",
    airport: "Charles de Gaulle Airport",
    country: "France",
  },
  {
    code: "BKK",
    city: "Bangkok",
    airport: "Suvarnabhumi Airport",
    country: "Thailand",
  },
  {
    code: "KUL",
    city: "Kuala Lumpur",
    airport: "Kuala Lumpur International Airport",
    country: "Malaysia",
  },
  {
    code: "DOH",
    city: "Doha",
    airport: "Hamad International Airport",
    country: "Qatar",
  },
  {
    code: "JFK",
    city: "New York",
    airport: "John F. Kennedy International Airport",
    country: "United States",
  },
  {
    code: "SFO",
    city: "San Francisco",
    airport: "San Francisco International Airport",
    country: "United States",
  },
  {
    code: "SYD",
    city: "Sydney",
    airport: "Sydney Kingsford Smith Airport",
    country: "Australia",
  },
  {
    code: "IST",
    city: "Istanbul",
    airport: "Istanbul Airport",
    country: "Turkey",
  },
];

export function searchAirports(
  query: string,
  limit = 8
): Airport[] {
  const value = query.trim().toLowerCase();

  if (!value) {
    return AIRPORTS.slice(0, limit);
  }

  return AIRPORTS
    .filter((airport) => {
      return (
        airport.code
          .toLowerCase()
          .includes(value) ||
        airport.city
          .toLowerCase()
          .includes(value) ||
        airport.airport
          .toLowerCase()
          .includes(value) ||
        airport.country
          .toLowerCase()
          .includes(value)
      );
    })
    .slice(0, limit);
}