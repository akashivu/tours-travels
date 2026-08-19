import Container from "../../ui/Container";
import Section from "../../ui/Section";

import AIPlannerContent from "./AIPlannerContent";
import AIPlannerVisual from "./AIPlannerVisual";

const AIPlanner = () => {
  return (
    <Section className="bg-white py-20">

      <Container>

        <div className="grid items-center gap-12 lg:grid-cols-[65%_35%]">

          <AIPlannerContent />

          <AIPlannerVisual />

        </div>

      </Container>

    </Section>
  );
};

export default AIPlanner;