/// <reference types="google.maps" />
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
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const onChangeRef = useRef(onChange);
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    onChangeRef.current = onChange;
    onSelectRef.current = onSelect;
  }, [onChange, onSelect]);

  
  useEffect(() => {
    if ((window as any).google?.maps?.places) {
      setIsReady(true);
      return;
    }

    const checkInterval = setInterval(() => {
      if ((window as any).google?.maps?.places) {
        clearInterval(checkInterval);
        setIsReady(true);
      }
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(checkInterval);
    }, 10000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, []);

 
  useEffect(() => {
    if (!isReady || !inputRef.current || autocompleteRef.current) return;

    try {
      const g = (window as any).google as typeof google;
      const autocomplete = new g.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "in" },
        fields: ["formatted_address", "geometry", "name", "place_id"],
        types: ["geocode", "establishment"],
      });

      autocompleteRef.current = autocomplete;

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place?.geometry?.location) return;

        const address = place.formatted_address || place.name || "";
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        if (inputRef.current) inputRef.current.value = address;
        onChangeRef.current?.(address);
        onSelectRef.current?.(address, lat, lng);
      });
    } catch (e) {
     
      console.error(e);
      
    }

    return () => {
      if (autocompleteRef.current) {
        const g = (window as any).google as typeof google | undefined;
        g?.maps?.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, [isReady]);

  
  useEffect(() => {
    if (inputRef.current && value !== undefined) {
      inputRef.current.value = value;
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeRef.current?.(e.target.value);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
         
          const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY; 
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
          );
          const data = await res.json();

          if (data.status === "OK" && data.results?.[0]) {
            const address = data.results[0].formatted_address;
            if (inputRef.current) inputRef.current.value = address;
            onChangeRef.current?.(address);
            onSelectRef.current?.(address, latitude, longitude);
          } else {
            alert("Unable to get address. Please try again.");
          }
        } catch {
         
          alert("Error getting address. Please try again.");
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        alert("Unable to get location. Please enable location permissions.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className={className} style={{ width: "100%" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        disabled={!isReady}
        autoComplete="off"
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
          e.currentTarget.style.borderColor = "#3b82f6";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.2)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#d1d5db";
          e.currentTarget.style.boxShadow = "none";
        }}
      />

      <button
        onClick={handleUseCurrentLocation}
        type="button"
        disabled={isLocating || !isReady}
        style={{
          marginTop: "6px",
          fontSize: "14px",
          color: isLocating || !isReady ? "#9ca3af" : "#2563eb",
          textDecoration: "underline",
          cursor: isLocating || !isReady ? "not-allowed" : "pointer",
          opacity: isLocating || !isReady ? 0.6 : 1,
          background: "none",
          border: "none",
          padding: "0",
        }}
      >
        {isLocating ? "Locating..." : "Use Current Location"}
      </button>

      {!isReady && (
        <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
          Loading Google Maps...
        </div>
      )}
    </div>
  );
}
