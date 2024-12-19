import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMessageSquare } from 'react-icons/fi';

const ChatbotButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: linear-gradient(135deg, #AE67FA 0%, #F49867 100%);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 998;
  box-shadow: 0 4px 15px rgba(174, 103, 250, 0.4);
`;

const ChatbotPane = () => {
  const navigate = useNavigate();

  return (
    <ChatbotButton
      onClick={() => navigate('/chatbot')}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <FiMessageSquare />
    </ChatbotButton>
  );
};

export default ChatbotPane; 