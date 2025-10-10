import { useEffect, useRef } from "react";

type Props = {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (val: string) => void;
  onSelect?: (address: string, lat: number, lng: number) => void;
  apiKey: string;
};

let isScriptLoaded = false;
let isScriptLoading = false;
const scriptCallbacks: (() => void)[] = [];

export default function AddressAutocomplete({
  placeholder = "Enter location",
  className,
  value,
  onChange,
  onSelect,
  apiKey,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const placeAutocompleteRef = useRef<any>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      return new Promise<void>((resolve) => {
        if (isScriptLoaded && window.google?.maps?.places?.PlaceAutocompleteElement) {
          resolve();
          return;
        }

        if (isScriptLoading) {
          scriptCallbacks.push(resolve);
          return;
        }

        const existingScript = document.querySelector(
          `script[src*="maps.googleapis.com"]`
        );
        
        if (existingScript) {
          isScriptLoaded = true;
          resolve();
          return;
        }

        isScriptLoading = true;
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA2cFuK7PcvkCnGBxbkKVstFb0vP1Ue6i4&libraries=places&v=weekly`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          isScriptLoaded = true;
          isScriptLoading = false;
          resolve();
          scriptCallbacks.forEach(cb => cb());
          scriptCallbacks.length = 0;
        };
        script.onerror = () => {
          isScriptLoading = false;
          console.error("Failed to load Google Maps script");
        };
        document.head.appendChild(script);
      });
    };

    loadGoogleMapsScript().then(() => {
      if (!containerRef.current || !window.google?.maps?.places?.PlaceAutocompleteElement) {
        return;
      }

      const placeAutocomplete = document.createElement(
        "gmp-place-autocomplete"
      ) as any;
      
      placeAutocomplete.style.width = "100%";
      placeAutocomplete.style.display = "block";
      
     
      placeAutocomplete.style.colorScheme = "light";
      
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        containerRef.current.appendChild(placeAutocomplete);
      }

      placeAutocompleteRef.current = placeAutocomplete;

     
      const forceInputStyles = () => {
        const inputElement = placeAutocomplete.querySelector("input");
        if (inputElement) {
         
          inputElement.removeAttribute("style");
          
          
         const styleString = `
  width: 100% !important;
  padding: 12px !important;
  background-color: #ffffff !important;
  background: #ffffff !important;
  color: #000000 !important;
  border: 1px solid #d1d5db !important;
  border-radius: 6px !important;
  font-size: 16px !important;
  outline: none !important;
  box-sizing: border-box !important;
  color-scheme: light !important;
  -webkit-text-fill-color: #000000 !important;
  box-shadow: none !important;
`;
          
          inputElement.setAttribute("style", styleString);
          
          if (placeholder) {
            inputElement.placeholder = placeholder;
          }
          if (className) {
            inputElement.className = className;
          }

          
          const focusHandler = () => {
  inputElement.setAttribute("style", styleString + `
    border: 1px solid #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
  `);
};
          
          const blurHandler = () => {
            inputElement.setAttribute("style", styleString);
          };
          
          inputElement.removeEventListener("focus", focusHandler);
          inputElement.removeEventListener("blur", blurHandler);
          inputElement.addEventListener("focus", focusHandler);
          inputElement.addEventListener("blur", blurHandler);

         
          const inputHandler = (e: Event) => {
            const target = e.target as HTMLInputElement;
            onChange?.(target.value);
          };
          
          inputElement.removeEventListener("input", inputHandler);
          inputElement.addEventListener("input", inputHandler);

          return true;
        }
        return false;
      };

     
      const attemptStyling = () => {
        let attempts = 0;
        const maxAttempts = 20;
        
        const tryStyle = () => {
          if (forceInputStyles()) {
            return; 
          }
          
          attempts++;
          if (attempts < maxAttempts) {
            setTimeout(tryStyle, 100);
          }
        };
        
        tryStyle();
      };

      
      attemptStyling();

      
      const observer = new MutationObserver(() => {
        forceInputStyles();
      });

      observer.observe(placeAutocomplete, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style"],
      });

      const handlePlaceSelect = async (event: any) => {
        const place = event.place;
        
        if (!place) {
          console.error("No place details found");
          return;
        }

        await place.fetchFields({
          fields: ["displayName", "formattedAddress", "location"],
        });

        const address = place.formattedAddress || place.displayName || "";
        const lat = place.location?.lat() ?? 0;
        const lng = place.location?.lng() ?? 0;

        onSelect?.(address, lat, lng);
        onChange?.(address);
        
        
        setTimeout(forceInputStyles, 100);
      };

      placeAutocomplete.addEventListener("gmp-placeselect", handlePlaceSelect);

      return () => {
        observer.disconnect();
        if (placeAutocomplete) {
          placeAutocomplete.removeEventListener("gmp-placeselect", handlePlaceSelect);
        }
      };
    });
  }, [apiKey, onSelect, onChange, placeholder, className]);

  useEffect(() => {
    if (placeAutocompleteRef.current && value !== undefined) {
      const inputElement = placeAutocompleteRef.current.querySelector("input");
      if (inputElement) {
        inputElement.value = value;
      }
    }
  }, [value]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: "100%",
        backgroundColor: "#ffffff",
        border: "1px solid #d1d5db",
        colorScheme: "light",
      }} 
    />
  );
}