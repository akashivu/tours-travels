import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import DestinationPreview from "./DestinationPreview";
import TripSummary from "./TripSummary";
import PlanningStatus from "./PlanningStatus";

const AIWorkspace = () => {
  return (
    <div className="grid gap-8 lg:grid-cols-[48%_52%]">

      {/* Conversation */}

      <div className="space-y-5">

        <ChatBubble
          type="user"
          text="Plan a 6-day Japan trip under ₹1.5 lakh with flights, hotels and airport transfers."
        />

        <TypingIndicator />

        <ChatBubble
          type="assistant"
          text="Perfect! I've planned your complete trip including flights, premium hotels, airport pickup and a personalized itinerary."
        />

      </div>

      {/* AI Result */}

      <div className="space-y-6">

        <DestinationPreview />
       <PlanningStatus />
        <TripSummary />


      </div>

    </div>
  );
};

export default AIWorkspace;