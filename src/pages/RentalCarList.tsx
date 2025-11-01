import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

interface RentalCar {
  id: number;
  car_type?: string;
  carType?: string;
  image_url?: string;
  imageUrl?: string;
  seats: number;
  fare4H: number;
  fare8H: number;
  fare12H: number;
  fuel_type?: string;
  fuelType?: string;
  ac: boolean;
}

export default function RentalCarList() {
  const location = useLocation();
  const navigate = useNavigate();

 
  const navState = (location.state as any) || {};
  const query = new URLSearchParams(location.search);

  const city   = navState.city        ?? query.get("city")   ?? "";
  const pickup = navState.pickup      ?? query.get("pickup") ?? "";
  const date   = navState.pickupDate  ?? navState.date ?? query.get("date") ?? "";
  const time   = navState.pickupTime  ?? navState.time ?? query.get("time") ?? "";
  const mobile = navState.mobile      ?? query.get("mobile") ?? "";

  const [cars, setCars] = useState<RentalCar[]>([]);
  const [packageType, setPackageType] = useState("4H");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axiosClient.get("/rental/cars");
        setCars(res.data);
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const getFare = (car: RentalCar): number => {
    const fare = packageType === "4H" ? car.fare4H
               : packageType === "8H" ? car.fare8H
               : car.fare12H;
    return Number(fare) || 0;
  };

  const handleSelect = (car: RentalCar) => {
   
    const normalizedCar = {
      ...car,
      carType:  car.carType  ?? car.car_type,
      imageUrl: car.imageUrl ?? car.image_url,
      fuelType: car.fuelType ?? car.fuel_type,
    };

    navigate("/rental-confirm", {
      state: {
        car: normalizedCar,
        packageType,
        fare: getFare(car),
        city,
        pickup,
        date,
        time,
        mobile,
      },
    });
  };

  const packages = [
    { id: "4H", label: "4 Hours", details: "40 KM" },
    { id: "8H", label: "8 Hours", details: "80 KM" },
    { id: "12H", label: "12 Hours", details: "120 KM" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Available Rental Packages
          </h1>
          <p className="text-gray-600">Select your preferred package for {city}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
            Choose Package
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setPackageType(pkg.id)}
                className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                  packageType === pkg.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="text-left">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-lg font-semibold ${
                        packageType === pkg.id ? "text-blue-600" : "text-gray-900"
                      }`}
                    >
                      {pkg.label}
                    </span>
                    {packageType === pkg.id && (
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">Includes {pkg.details}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <div className="flex items-start gap-6 flex-1">
                    <div className="flex-shrink-0">
                      <img
                        src={car.imageUrl || car.image_url}
                        alt={(car.carType || car.car_type) ?? "Car"}
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {car.carType || car.car_type}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <span>{car.seats} Seater</span>
                        <span className="text-gray-300">•</span>
                        <span>{car.fuelType || car.fuel_type}</span>
                        <span className="text-gray-300">•</span>
                        <span>{car.ac ? "AC" : "Non-AC"}</span>
                      </div>
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {packageType === "4H" ? "40" : packageType === "8H" ? "80" : "120"} km included
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 sm:gap-3 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6">
                    <div className="text-left sm:text-right">
                      <p className="text-sm text-gray-500 mb-1">Total Fare</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{Number(getFare(car) || 0).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSelect(car)}
                      className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 whitespace-nowrap"
                    >
                      Select Vehicle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {(!loading && cars.length === 0) && (
            <div className="text-center text-gray-600">No cars found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
