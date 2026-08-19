import { motion } from "framer-motion";

const DestinationsContent = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.7,
      }}
      className="mx-auto max-w-3xl text-center"
    >
      <h2 className="text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
        Explore the world
        <br />
        your way.
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
        Discover destinations that match the way
        you want to travel. Explore places, find
        inspiration, and plan what comes next.
      </p>
    </motion.div>
  );
};

export default DestinationsContent;