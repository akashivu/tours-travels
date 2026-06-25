/// <reference types="google.maps" />
import { useEffect, useRef, useState } from "react";
import { Navigation, Loader2 } from "lucide-react";

type Props = {
  placeholder?: string;
  className?: string;
  value?: string;
  showCurrentLocation?: boolean;
  onChange?: (val: string) => void;
  onSelect?: (address: string, lat: number, lng: number) => void;
};

export default function AddressAutocomplete({
  placeholder = "Enter location",
  className,
  value = "",
  showCurrentLocation = false,
  onChange,
  onSelect,
}: Props){
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
  padding: "12px 14px",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: 400,
  color: "#111827",
  backgroundColor: isReady ? "#fff" : "#f9fafb",
  outline: "none",
  transition: "all 0.2s ease",
  boxSizing: "border-box",
}}
        onFocus={(e) => {
  e.currentTarget.style.borderColor = "#f97316";
  e.currentTarget.style.boxShadow =
    "0 0 0 3px rgba(249,115,22,0.12)";
}}
        onBlur={(e) => {
  e.currentTarget.style.borderColor = "#e5e7eb";
  e.currentTarget.style.boxShadow = "none";
}}
      />
{showCurrentLocation && (
<button
  onClick={handleUseCurrentLocation}
  type="button"
  disabled={isLocating || !isReady}
  className="
    mt-3 inline-flex items-center gap-1.5
    text-sm font-medium
    text-emerald-600 hover:text-emerald-700
    transition-colors duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  "
>
  {isLocating ? (
    <>
      <Loader2 className="w-3.5 h-3.5 animate-spin" />
      Detecting location...
    </>
  ) : (
    <>
      <Navigation className="w-3.5 h-3.5" />
      Use Current Location
    </>
  )}
</button>
)}

      {!isReady && (
        <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
          Loading Google Maps...
        </div>
      )}
    </div>
  );
}
