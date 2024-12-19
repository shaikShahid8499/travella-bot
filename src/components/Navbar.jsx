import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import LogoImage from '../assets/Logo.png';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  background: transparent;
  transition: all 0.3s ease;
  transform: translateY(${props => props.hide ? '-100%' : '0'});
`;

const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background: ${props => props.scrolled ? 'rgba(15, 23, 42, 0.75)' : 'rgba(15, 23, 42, 0.25)'};
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, ${props => props.scrolled ? '0.1' : '0.05'});
  border-radius: 100px;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.25rem 1.5rem;
  }
`;

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;

  img {
    height: 90px;
    width: auto;
    object-fit: contain;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    img {
      height: 70px;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem;
  border-radius: 50px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background: rgba(174, 103, 250, 0.2);
    color: #AE67FA;
  }
`;

const AuthButton = styled(Link)`
  background: linear-gradient(
    135deg,
    #AE67FA 0%,
    #F49867 100%
  );
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
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
      135deg,
      #F49867 0%,
      #AE67FA 100%
    );
    transition: transform 0.5s ease;
    z-index: -1;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(174, 103, 250, 0.4);
  }

  &:hover::before {
    transform: translateX(100%);
  }

  &:active {
    transform: scale(0.95);
  }

  ${props => props.logout && `
    background: rgba(255, 255, 255, 0.1);
    
    &:hover {
      background: rgba(255, 0, 0, 0.1);
      border-color: rgba(255, 0, 0, 0.2);
    }
  `}
`;

const MobileMenuButton = styled.button`
  display: none;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: calc(100% + 1rem);
    left: 2rem;
    right: 2rem;
    flex-direction: column;
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 1rem;
    gap: 0.5rem;
    animation: slideDown 0.3s ease forwards;

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

const MobileNavLink = styled(NavLink)`
  width: 100%;
  text-align: left;
  padding: 0.75rem 1.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
`;

const MobileAuthButton = styled(AuthButton)`
  margin: 0.5rem;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(174, 103, 250, 0.5);
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hide, setHide] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled past threshold
      setScrolled(currentScrollY > 50);
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHide(true);
      } else {
        setHide(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Nav scrolled={scrolled} hide={hide}>
      <NavContainer scrolled={scrolled}>
        <LogoWrapper to="/">
          <img src={LogoImage} alt="TravelBot Logo" />
        </LogoWrapper>
        <NavLinks>
          <NavLink to="/" className="active">Home</NavLink>
          <NavLink to="#destinations">Destinations</NavLink>
          <NavLink to="#about">About</NavLink>
          <NavLink to="#contact">Contact</NavLink>
          {user ? (
            <UserInfo>
              {user.photoURL && (
                <UserAvatar src={user.photoURL} alt={user.displayName || 'User'} />
              )}
              <AuthButton as="button" onClick={handleLogout} logout>
                Sign Out
              </AuthButton>
            </UserInfo>
          ) : (
            <AuthButton to="/auth">Sign In</AuthButton>
          )}
        </NavLinks>
        <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </MobileMenuButton>
      </NavContainer>
      <MobileMenu isOpen={isOpen}>
        <MobileNavLink to="/">Home</MobileNavLink>
        <MobileNavLink to="#destinations">Destinations</MobileNavLink>
        <MobileNavLink to="#about">About</MobileNavLink>
        <MobileNavLink to="#contact">Contact</MobileNavLink>
        {user ? (
          <MobileAuthButton as="button" onClick={handleLogout} logout>
            Sign Out
          </MobileAuthButton>
        ) : (
          <MobileAuthButton to="/auth">Sign In</MobileAuthButton>
        )}
      </MobileMenu>
    </Nav>
  );
};

export default Navbar; 