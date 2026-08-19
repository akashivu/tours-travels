import Container from "../ui/Container";
import Section from "../ui/Section";

const Hero = () => {
  return (
    <Section className="min-h-screen flex items-center">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div>
            Left Content
          </div>

          {/* Right Image */}
          <div>
            Hero Image
          </div>

        </div>
      </Container>
    </Section>
  );
};

export default Hero;