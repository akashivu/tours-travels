
import QuickBookingForm from "../components/QuickBookingForm";

import AIPlanner from "../components/sections/AIPlanner";
import Destinations from "../components/sections/Destinations/Destinations";


import FAQSection from "./FAQ/FAQSection";

import TravelStyles from "../components/sections/TravelStyles/TravelStyles";

const Home = () => {
  return (
    <main className="pt-10">
      

      {/* Cabs */}
      <section id="cabs" className="scroll-mt-24">
        <QuickBookingForm />
      </section>
       <section id="destinations" className="scroll-mt-20">
        <Destinations />
      </section>
      <TravelStyles />
      
      {/* AI Planner */}
      <section id="ai-planner" className="scroll-mt-24">
        <AIPlanner />
      </section>

     

      {/* Destinations */}
     

      {/* Hotels */}
      

      <FAQSection />

      

      

   
    </main>
  );
};

export default Home;