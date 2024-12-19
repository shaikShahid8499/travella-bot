import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSend, FiChevronLeft, FiUser, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getGeminiResponse } from '../config/gemini';
import ReactMarkdown from 'react-markdown';
import { aiResponseSound } from '../config/sounds';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #040C18;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackButton = styled(Link)`
  color: #AE67FA;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 0.9rem;
`;

const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  padding-bottom: calc(2rem + 100px);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(174, 103, 250, 0.2);
    border-radius: 3px;
  }
`;

const Message = styled(motion.div)`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  ${props => props.isUser ? 'flex-direction: row-reverse;' : ''}
  max-width: 70%;
  ${props => props.isUser ? 'margin-left: auto;' : ''}
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: ${props => props.isUser ? 
    'linear-gradient(135deg, #AE67FA 0%, #F49867 100%)' : 
    'rgba(255, 255, 255, 0.05)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

const MessageContent = styled.div`
  background: ${props => props.isUser ? 
    'linear-gradient(135deg, #AE67FA 0%, #F49867 100%)' : 
    'rgba(255, 255, 255, 0.05)'};
  padding: 1rem 1.25rem;
  border-radius: 16px;
  color: white;
  font-size: 0.95rem;
  line-height: 1.5;

  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.isUser ? 'white' : '#AE67FA'};
    margin: 1rem 0 0.5rem 0;
    font-weight: 600;
  }

  ul, ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin: 0.25rem 0;
  }

  p {
    margin: 0.5rem 0;
  }

  strong {
    color: ${props => props.isUser ? 'white' : '#AE67FA'};
    font-weight: 600;
  }
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.25rem 0;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(174, 103, 250, 0.5);
    display: inline-block;
  }
`;

const InputContainer = styled.div`
  padding: 2rem;
  background: rgba(4, 12, 24, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10;
`;

const InputWrapper = styled.form`
  display: flex;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Input = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 1.25rem;
  border-radius: 12px;
  color: white;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #AE67FA;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const SendButton = styled(motion.button)`
  background: linear-gradient(135deg, #AE67FA 0%, #F49867 100%);
  border: none;
  padding: 0 1.5rem;
  border-radius: 12px;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TypingAnimation = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;

  span {
    width: 6px;
    height: 6px;
    background: rgba(174, 103, 250, 0.6);
    border-radius: 50%;
    display: inline-block;
  }
`;

const SoundButton = styled(motion.button)`
  position: fixed;
  bottom: 7rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  color: ${props => props.enabled ? '#AE67FA' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  z-index: 10;
`;

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        text: "Hi! I'm your AI travel assistant. How can I help you plan your next adventure?",
        isUser: false,
        timestamp: Date.now()
      }]);
    }
  }, []);

  const playSound = () => {
    if (isSoundEnabled) {
      aiResponseSound.play().catch(err => console.log('Sound play failed:', err));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = {
      text: input.trim(),
      isUser: true,
      timestamp: Date.now()
    };

    try {
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);

      const response = await getGeminiResponse(input.trim());
      await new Promise(resolve => setTimeout(resolve, 500));

      const botMessage = {
        text: response,
        isUser: false,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botMessage]);
      playSound();
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        isUser: false,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <PageContainer>
      <ChatHeader>
        <BackButton to="/">
          <FiChevronLeft /> Back to Home
        </BackButton>
      </ChatHeader>

      <ChatArea>
        {messages.map((message) => (
          <Message
            key={message.timestamp}
            isUser={message.isUser}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Avatar isUser={message.isUser}>
              {message.isUser ? <FiUser /> : '🤖'}
            </Avatar>
            <MessageContent isUser={message.isUser}>
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </MessageContent>
          </Message>
        ))}
        {isTyping && (
          <Message
            isUser={false}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Avatar isUser={false}>🤖</Avatar>
            <MessageContent isUser={false}>
              <TypingAnimation>
                <motion.span
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                />
                <motion.span
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                />
                <motion.span
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                />
              </TypingAnimation>
            </MessageContent>
          </Message>
        )}
        <div ref={messagesEndRef} />
      </ChatArea>

      <InputContainer>
        <InputWrapper onSubmit={handleSubmit}>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about travel..."
            disabled={isTyping}
          />
          <SendButton
            type="submit"
            disabled={!input.trim() || isTyping}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiSend />
          </SendButton>
        </InputWrapper>
      </InputContainer>

      <SoundButton
        enabled={isSoundEnabled}
        onClick={() => setIsSoundEnabled(!isSoundEnabled)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={isSoundEnabled ? 'Disable sounds' : 'Enable sounds'}
      >
        {isSoundEnabled ? <FiVolume2 /> : <FiVolumeX />}
      </SoundButton>
    </PageContainer>
  );
};

export default ChatBot; 