import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaRobot, FaMapMarkedAlt, FaUserFriends, FaShieldAlt } from 'react-icons/fa';

const Section = styled.section`
  padding: 8rem 2rem;
  background: #040C18;
  position: relative;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  color: white;
  margin-bottom: 1rem;
  font-weight: bold;

  span {
    background: linear-gradient(89.97deg, #AE67FA 1.84%, #F49867 102.67%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Description = styled.p`
  color: #81AFDD;
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(174, 103, 250, 0.5);
    box-shadow: 0 10px 30px rgba(174, 103, 250, 0.2);
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  background: rgba(174, 103, 250, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #AE67FA;
  font-size: 1.8rem;
`;

const FeatureTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: #81AFDD;
  font-size: 1rem;
  line-height: 1.6;
`;

const features = [
  {
    id: 1,
    icon: <FaRobot />,
    title: "AI Travel Assistant",
    description: "Our intelligent AI companion provides personalized recommendations, real-time assistance, and smart travel insights tailored to your preferences."
  },
  {
    id: 2,
    icon: <FaMapMarkedAlt />,
    title: "Custom Itineraries",
    description: "Get expertly crafted travel plans with optimized routes, local insights, and hidden gems that match your interests and travel style."
  },
  {
    id: 3,
    icon: <FaUserFriends />,
    title: "24/7 Support",
    description: "Enjoy peace of mind with round-the-clock assistance from our AI companion and expert team throughout your journey."
  }
];

const AboutSection = () => {
  return (
    <Section id="about">
      <Container>
        <Header>
          <Title>Why Choose <span>TravelBot</span>?</Title>
          <Description>
            Experience the future of travel planning with our AI-powered platform. 
            We combine cutting-edge technology with human expertise to create 
            unforgettable journeys tailored just for you.
          </Description>
        </Header>
        <Grid>
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.id * 0.1 }}
            >
              <IconWrapper>{feature.icon}</IconWrapper>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default AboutSection; 