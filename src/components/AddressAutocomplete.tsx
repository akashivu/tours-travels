import { useEffect, useRef, useState } from "react";

type Props = {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (val: string) => void;
  onSelect?: (address: string, lat: number, lng: number) => void;
};

export default function AddressAutocomplete({
  placeholder = "Enter location",
  className,
  value = "",
  onChange,
  onSelect,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google?.maps?.places) {
        clearInterval(interval);
        setIsReady(true);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    if (!isReady || !inputRef.current) return;

    
    if (autocompleteRef.current) {
      window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      autocompleteRef.current = null;
    }

    
    try {
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current!,
        {
          componentRestrictions: { country: "in" },
          fields: ["formatted_address", "geometry", "name", "vicinity"],
        }
      );

      autocompleteRef.current = autocomplete;

      const handlePlaceSelect = async () => {
        const place = autocomplete.getPlace();
        if (!place) {
          console.warn("No place found yet");
          return;
        }

        let address = place.formatted_address || place.name || "";
        let lat = place.geometry?.location?.lat() ?? null;
        let lng = place.geometry?.location?.lng() ?? null;

        
        if ((!lat || !lng) && address) {
          try {
            const encoded = encodeURIComponent(address);
            const res = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${
                import.meta.env.VITE_GOOGLE_MAPS_KEY
              }`
            );
            const data = await res.json();
            if (data.status === "OK" && data.results[0]) {
              const loc = data.results[0].geometry.location;
              lat = loc.lat;
              lng = loc.lng;
              console.log("Fallback geocode used:", lat, lng);
            }
          } catch (err) {
            console.error("Geocode fallback error:", err);
          }
        }

        if (inputRef.current) inputRef.current.value = address;
        onChange?.(address);

        if (lat && lng) {
          onSelect?.(address, lat, lng);
          console.log("Location selected:", address, lat, lng);
        } else {
          console.warn("No coordinates found for:", address);
        }
      };

      
      autocomplete.addListener("place_changed", handlePlaceSelect);
    } catch (err) {
      console.error("Error initializing Google Autocomplete:", err);
    }
  }, [isReady, onChange, onSelect]);

  
  useEffect(() => {
    if (inputRef.current && value !== undefined) {
      inputRef.current.value = value;
    }
  }, [value]);

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

 
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported in your browser.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
              import.meta.env.VITE_GOOGLE_MAPS_KEY
            }`
          );
          const data = await res.json();

          if (data.status === "OK" && data.results[0]) {
            const address = data.results[0].formatted_address;
            if (inputRef.current) inputRef.current.value = address;
            onChange?.(address);
            onSelect?.(address, latitude, longitude);
            console.log("📍 Current location selected:", address);
          } else {
            alert("Unable to get address. Try again.");
          }
        } catch (err) {
          console.error("Reverse geocode error:", err);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error("Location error:", error);
        alert("Enable location permissions and try again.");
        setIsLocating(false);
      }
    );
  };

  return (
    <div className={className} style={{ width: "100%" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        defaultValue={value}
        onChange={handleInputChange}
        disabled={!isReady}
        className="w-full"
        style={{
          width: "100%",
          padding: "12px",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          fontSize: "16px",
          color: "#000",
          backgroundColor: isReady ? "#fff" : "#f3f4f6",
          outline: "none",
          transition: "all 0.2s ease",
          boxSizing: "border-box",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#3b82f6";
          e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.2)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#d1d5db";
          e.target.style.boxShadow = "none";
        }}
      />

      
      <button
        onClick={handleUseCurrentLocation}
        type="button"
        disabled={isLocating}
        style={{
          marginTop: "6px",
          fontSize: "14px",
          color: "#2563eb",
          textDecoration: "underline",
          cursor: isLocating ? "not-allowed" : "pointer",
          opacity: isLocating ? 0.6 : 1,
          background: "none",
          border: "none",
          padding: "0",
        }}
      >
        {isLocating ? "Locating..." : "Use Current Location"}
      </button>

      {!isReady && (
        <div
          style={{
            fontSize: "12px",
            color: "#6b7280",
            marginTop: "4px",
          }}
        >
          Loading Google Maps...
        </div>
      )}
    </div>
  );
}