import { useEffect, useState } from "react";

import { getPlacePhoto } from "../../../services/destinationService";

interface PlacePhotoProps {
  photoName: string;
  alt: string;
}

const PlacePhoto = ({
  photoName,
  alt,
}: PlacePhotoProps) => {
  const [photoUrl, setPhotoUrl] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadPhoto = async () => {
      try {
        const url =
          await getPlacePhoto(photoName);

        if (!cancelled) {
          setPhotoUrl(url);
        }
      } catch (error) {
        console.error(
          "Failed to load place photo:",
          error
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadPhoto();

    return () => {
      cancelled = true;
    };
  }, [photoName]);

  if (isLoading) {
    return (
      <div className="h-44 w-full animate-pulse rounded-[18px] bg-gray-100" />
    );
  }

  if (!photoUrl) {
    return null;
  }

  return (
    <img
      src={photoUrl}
      alt={alt}
      className="h-44 w-full rounded-[18px] object-cover"
      loading="lazy"
    />
  );
};

export default PlacePhoto;