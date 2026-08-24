import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";

const AIPlannerContent = () => {
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    navigate("/ai");
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -40,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.8,
      }}
      className="max-w-xl"
    >
      <h2 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 lg:text-6xl">
        Your entire trip,
        <br />
        planned in seconds.
      </h2>

      <p className="mt-8 max-w-lg text-lg leading-8 text-gray-600">
        Simply describe where you want to go, your budget, and your travel
        style. Elixway's AI instantly builds a complete journey with the best
        flights, airport transfers, and a personalized itinerary.
      </p>

      <div className="mt-10">
        <Button onClick={handleStartPlanning}>
          Start Planning
        </Button>
      </div>
    </motion.div>
  );
};

export default AIPlannerContent;