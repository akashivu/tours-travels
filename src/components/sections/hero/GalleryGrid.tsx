import DestinationCard from "./DestinationCard";
import { DESTINATIONS } from "./hero.constants";



const GalleryGrid = () => {
  return (
    <div className="flex w-full max-w-[430px] gap-4">

      {/* Left column */}
      <div className="flex w-1/2 flex-col gap-4">
        <DestinationCard destination={DESTINATIONS[1]} />
        <DestinationCard destination={DESTINATIONS[3]} />
      </div>

      {/* Right column */}
      <div className="flex w-1/2 flex-col gap-4">
        <DestinationCard destination={DESTINATIONS[2]} />
        <DestinationCard destination={DESTINATIONS[4]} />
      </div>

    </div>
  );
};

export default GalleryGrid;