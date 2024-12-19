import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const HeroContainer = styled.div`
  min-height: 100vh;
  position: relative;
  background: #040C18;
  overflow: hidden;
  padding-top: 120px;
  display: flex;
  align-items: center;
`;

const GradientBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: radial-gradient(circle at 3% 25%, rgba(0, 40, 83, 1) 0%, rgba(4, 12, 24, 1) 100%);
`;

const HeroContent = styled.div`
  position: relative;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;
`;

const TextContent = styled.div`
  max-width: 800px;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: white;
  line-height: 1.2;
`;

const Gradient = styled.span`
  background: linear-gradient(89.97deg, #AE67FA 1.84%, #F49867 102.67%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  color: #81AFDD;
  font-family: var(--font-secondary);
  max-width: 600px;
  margin: 0 auto 2.5rem;
`;

const StyledButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(103.22deg, #AE67FA -13.86%, #F49867 99.55%);
  color: white;
  border-radius: 30px;
  font-family: var(--font-primary);
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(174, 103, 250, 0.2);
  transition: all 0.3s ease;
  position: relative;
  isolation: isolate;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      103.22deg,
      #F49867 -13.86%,
      #AE67FA 99.55%
    );
    transition: transform 0.5s ease;
    z-index: -1;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 30px rgba(174, 103, 250, 0.3);
  }

  &:hover::before {
    transform: translateX(100%);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const HeroSection = () => {
  return (
    <HeroContainer>
      <GradientBg />
      <HeroContent>
        <TextContent>
          <Title>
            Transform Your Travel Experience with <Gradient>AI-Powered</Gradient> Intelligence
          </Title>
          <Description>
            Let our AI companion guide you through personalized adventures, 
            real-time recommendations, and seamless travel planning.
          </Description>
          <StyledButton to="/auth">
            Begin Your Adventure
            <FaArrowRight />
          </StyledButton>
        </TextContent>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection; 