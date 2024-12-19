import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Section = styled.section`
  padding: 8rem 2rem;
  background: #040C18;
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
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
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  color: white;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  svg {
    color: #AE67FA;
    font-size: 1.2rem;
  }
`;

const InfoText = styled.div`
  h4 {
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
  }

  p {
    color: #81AFDD;
    font-size: 0.95rem;
  }
`;

const Form = styled(motion.form)`
  display: grid;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: white;
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #AE67FA;
    background: rgba(174, 103, 250, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #AE67FA;
    background: rgba(174, 103, 250, 0.1);
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(103.22deg, #AE67FA -13.86%, #F49867 99.55%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(174, 103, 250, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ContactSection = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <Section id="contact">
      <Container>
        <Header>
          <Title>Get in <span>Touch</span></Title>
          <Description>
            Have questions about our AI travel companion? We're here to help you plan
            your perfect journey.
          </Description>
        </Header>
        <ContentWrapper>
          <ContactInfo>
            <InfoItem>
              <FaEnvelope />
              <InfoText>
                <h4>Email</h4>
                <p>support@travelbot.ai</p>
              </InfoText>
            </InfoItem>
            <InfoItem>
              <FaPhoneAlt />
              <InfoText>
                <h4>Phone</h4>
                <p>+1 (555) 123-4567</p>
              </InfoText>
            </InfoItem>
            <InfoItem>
              <FaMapMarkerAlt />
              <InfoText>
                <h4>Location</h4>
                <p>123 AI Avenue, San Francisco, CA 94105</p>
              </InfoText>
            </InfoItem>
          </ContactInfo>
          <Form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <InputGroup>
              <Label>Name</Label>
              <Input type="text" required />
            </InputGroup>
            <InputGroup>
              <Label>Email</Label>
              <Input type="email" required />
            </InputGroup>
            <InputGroup>
              <Label>Subject</Label>
              <Input type="text" required />
            </InputGroup>
            <InputGroup>
              <Label>Message</Label>
              <TextArea required />
            </InputGroup>
            <SubmitButton
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </SubmitButton>
          </Form>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default ContactSection; 