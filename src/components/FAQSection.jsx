import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const Section = styled.section`
  padding: 8rem 2rem;
  background: #040C18;
  position: relative;
`;

const Container = styled.div`
  max-width: 1000px;
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

const FAQList = styled.div`
  display: grid;
  gap: 1rem;
`;

const FAQItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(174, 103, 250, 0.3);
  }
`;

const Question = styled.button`
  width: 100%;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  color: white;
  font-size: 1.1rem;
  text-align: left;
  cursor: pointer;
  font-weight: 500;

  svg {
    color: #AE67FA;
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const Answer = styled(motion.div)`
  color: #81AFDD;
  font-size: 1rem;
  line-height: 1.6;
  padding: 0 1.5rem 1.5rem;
`;

const faqs = [
  {
    id: 1,
    question: "How does the AI travel assistant work?",
    answer: "Our AI travel assistant uses advanced machine learning algorithms to analyze your preferences, travel history, and current trends to provide personalized recommendations. It learns from your interactions to better understand your travel style and improve its suggestions over time."
  },
  {
    id: 2,
    question: "Can I customize my travel itinerary?",
    answer: "Absolutely! While our AI provides initial recommendations, you have full control to modify and customize every aspect of your itinerary. You can adjust activities, timings, and destinations to match your preferences perfectly."
  },
  {
    id: 3,
    question: "What happens if I need assistance during my trip?",
    answer: "Our 24/7 support system combines AI assistance with human expertise. You can access immediate help through our chatbot for common queries, or connect with our travel experts for more complex situations. We're always here to ensure your journey goes smoothly."
  },
  {
    id: 4,
    question: "How far in advance should I plan my trip?",
    answer: "While our AI can help plan trips on short notice, we recommend starting your planning at least 3-6 months ahead for international trips and 1-3 months for domestic travel. This ensures better availability and pricing for accommodations and activities."
  },
  {
    id: 5,
    question: "Is my personal information secure?",
    answer: "Yes, we take data security very seriously. All your personal information is encrypted and stored securely following industry-standard protocols. We never share your data with third parties without your explicit consent."
  }
];

const FAQ = ({ question, answer, isOpen, onClick }) => {
  return (
    <FAQItem>
      <Question isOpen={isOpen} onClick={onClick}>
        {question}
        <FaChevronDown />
      </Question>
      <AnimatePresence>
        {isOpen && (
          <Answer
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {answer}
          </Answer>
        )}
      </AnimatePresence>
    </FAQItem>
  );
};

const FAQSection = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <Section id="faq">
      <Container>
        <Header>
          <Title>Frequently Asked <span>Questions</span></Title>
          <Description>
            Find answers to common questions about our AI-powered travel planning service.
          </Description>
        </Header>
        <FAQList>
          {faqs.map((faq) => (
            <FAQ
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onClick={() => toggleFAQ(faq.id)}
            />
          ))}
        </FAQList>
      </Container>
    </Section>
  );
};

export default FAQSection; 