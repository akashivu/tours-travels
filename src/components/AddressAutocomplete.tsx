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
  const containerRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for Google Maps API to load
    const checkGoogle = setInterval(() => {
      if (window.google?.maps?.places) {
        clearInterval(checkGoogle);
        setIsReady(true);
      }
    }, 100);

    return () => clearInterval(checkGoogle);
  }, []);

  useEffect(() => {
    if (!inputRef.current || !isReady) return;

    try {
      // Initialize Autocomplete with the new API
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          componentRestrictions: { country: "in" },
          fields: ["formatted_address", "geometry", "name"],
        }
      );

      // Listen for place selection
      const listener = autocompleteRef.current.addListener(
        "place_changed",
        () => {
          const place = autocompleteRef.current.getPlace();

          if (!place || !place.geometry || !place.geometry.location) {
            console.log("No valid place selected");
            return;
          }

          const address = place.formatted_address || place.name || "";
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

          if (inputRef.current) {
            inputRef.current.value = address;
          }

          onChange?.(address);
          onSelect?.(address, lat, lng);
        }
      );

      return () => {
        if (listener) {
          window.google.maps.event.removeListener(listener);
        }
      };
    } catch (error) {
      console.error("Error initializing AddressAutocomplete:", error);
    }
  }, [isReady, onChange, onSelect]);

  // Update input value when prop changes
  useEffect(() => {
    if (inputRef.current && value !== undefined) {
      inputRef.current.value = value;
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div ref={containerRef} className={className} style={{ width: "100%" }}>
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
      {!isReady && (
        <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
          Loading...
        </div>
      )}
    </div>
  );
}