import { useEffect, useRef } from "react";

type Props = {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (val: string) => void;
  onSelect?: (address: string, lat: number, lng: number) => void;
};

export default function AddressAutocomplete({
  placeholder,
  className,
  value,
  onChange,
  onSelect,
}: Props) {
  const elRef = useRef<any>(null);
   const inputRef = useRef<HTMLInputElement>(null);
  const PlaceAutocomplete = "gmpx-place-autocomplete" as any;

  useEffect(() => {
    const el = elRef.current;
    if (el) {
     
      const placeHandler = (e: any) => {
        const place: google.maps.places.PlaceResult = e.detail;
        const address = place.formatted_address || inputRef.current?.value || "";
        const lat = place.geometry?.location?.lat() ?? 0;
        const lng = place.geometry?.location?.lng() ?? 0;
if (onSelect) onSelect(address, lat, lng);
        if (onChange) onChange(address);
      };

      el.addEventListener("gmpx-placeautocomplete-placechange", placeHandler);
      return () => {
        el.removeEventListener("gmpx-placeautocomplete-placechange", placeHandler);
      };
    }
  }, [onSelect, onChange]);

  return (
    <PlaceAutocomplete ref={elRef} style={{ display: "block", width: "100%" }}>
      <input
        ref={inputRef}
        slot="input"
        type="text"
        value={value}
        placeholder={placeholder || "Enter location"}
        className={className}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </PlaceAutocomplete>
  );
}
