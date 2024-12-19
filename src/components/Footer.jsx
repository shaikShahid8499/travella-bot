import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import LogoImage from '../assets/Logo.png';

const FooterContainer = styled.footer`
  background: #040C18;
  padding: 5rem 2rem 2rem;
  color: white;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 4rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BrandSection = styled.div`
  img {
    height: 60px;
    width: auto;
    margin-bottom: 1.5rem;
  }

  p {
    color: #81AFDD;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    max-width: 400px;
  }
`;

const FooterColumn = styled.div`
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    background: linear-gradient(89.97deg, #AE67FA 1.84%, #F49867 102.67%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  a {
    color: #81AFDD;
    transition: all 0.3s ease;
    font-size: 0.95rem;

    &:hover {
      color: #AE67FA;
      transform: translateX(5px);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(174, 103, 250, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #AE67FA;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(174, 103, 250, 0.2);
    transform: translateY(-3px);
  }
`;

const BottomSection = styled.div`
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #81AFDD;
  font-size: 0.9rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <TopSection>
          <BrandSection>
            <img src={LogoImage} alt="TravelBot Logo" />
            <p>
              Revolutionizing travel experiences with AI-powered personalization. 
              Your intelligent companion for discovering the world's wonders.
            </p>
            <SocialLinks>
              <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </SocialIcon>
              <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </SocialIcon>
              <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </SocialIcon>
              <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </SocialIcon>
            </SocialLinks>
          </BrandSection>

          <FooterColumn>
            <h3>Company</h3>
            <FooterLinks>
              <Link to="/about">About Us</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/press">Press</Link>
              <Link to="/blog">Blog</Link>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <h3>Support</h3>
            <FooterLinks>
              <Link to="/help">Help Center</Link>
              <Link to="/safety">Safety</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <h3>Contact</h3>
            <FooterLinks>
              <a href="mailto:support@travelbot.ai">support@travelbot.ai</a>
              <a href="tel:+1234567890">+1 (234) 567-890</a>
              <address style={{ color: '#81AFDD', fontStyle: 'normal' }}>
                123 AI Avenue<br />
                San Francisco, CA 94105
              </address>
            </FooterLinks>
          </FooterColumn>
        </TopSection>

        <BottomSection>
          <p>&copy; {new Date().getFullYear()} TravelBot. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </BottomSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 