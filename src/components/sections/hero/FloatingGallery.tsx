import DestinationCard from "./DestinationCard";
import { DESTINATIONS } from "./hero.constants";

const FloatingGallery = () => {
  return (
    <div className="relative mx-auto h-[520px] w-full max-w-[420px]">

      {/* Large */}
      <div className="absolute right-0 top-0 w-[82%]">
        <DestinationCard destination={DESTINATIONS[0]} />
      </div>

      {/* Small */}
      <div className="absolute left-0 top-[230px] w-[55%]">
        <DestinationCard destination={DESTINATIONS[1]} />
      </div>

      {/* Large */}
      <div className="absolute right-0 top-[340px] w-[82%]">
        <DestinationCard destination={DESTINATIONS[2]} />
      </div>

      {/* Small */}
      <div className="absolute left-6 bottom-0 w-[55%]">
        <DestinationCard destination={DESTINATIONS[3]} />
      </div>

    </div>
  );
};

export default FloatingGallery;