import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  signOut
} from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #040C18 0%, #0F1B2B 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
`;

const BackButton = styled(Link)`
  position: fixed;
  top: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(-5px);
  }
`;

const AuthCard = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
`;

const WelcomeText = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;

  h2 {
    color: white;
    font-size: 2rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(89.97deg, #AE67FA 1.84%, #F49867 102.67%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: #81AFDD;
    font-size: 1rem;
  }
`;

const TabButtons = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.5rem;
  border-radius: 16px;
  margin-bottom: 2rem;
`;

const TabButton = styled.button`
  flex: 1;
  background: ${props => props.active ? 'rgba(174, 103, 250, 0.2)' : 'transparent'};
  border: none;
  color: ${props => props.active ? '#AE67FA' : '#81AFDD'};
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? 'rgba(174, 103, 250, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  padding-left: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: #81AFDD;
  }

  &:focus {
    outline: none;
    border-color: #AE67FA;
    background: rgba(174, 103, 250, 0.1);
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(103.22deg, #AE67FA -13.86%, #F49867 99.55%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(174, 103, 250, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
  color: #81AFDD;
  font-size: 0.9rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled(motion.div)`
  color: #ff6b6b;
  font-size: 0.9rem;
  text-align: center;
  padding: 0.75rem;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 107, 107, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    font-size: 1.1rem;
  }
`;

const ResendButton = styled(motion.button)`
  background: none;
  border: none;
  color: #AE67FA;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(174, 103, 250, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: #81AFDD;
  }
`;

const CountdownText = styled.span`
  color: #81AFDD;
  font-size: 0.9rem;
`;

const SignupMessage = styled(motion.div)`
  text-align: center;
  padding: 1rem;
  background: rgba(75, 181, 67, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(75, 181, 67, 0.2);
  margin-bottom: 1rem;

  h3 {
    color: #4BB543;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  p {
    color: #81AFDD;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .resend-section {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
`;

const errorVariants = {
  initial: { 
    opacity: 0, 
    y: -10,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    y: 10,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please try again.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please sign up.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was cancelled. Please try again.';
    default:
      return 'An error occurred. Please try again.';
  }
};

const Auth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [lastEmail, setLastEmail] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResendVerification = async () => {
    if (countdown > 0) return;
    
    try {
      setLoading(true);
      setError('');
      
      // Create a temporary user credential to send verification email
      const userCredential = await signInWithEmailAndPassword(auth, lastEmail, password);
      await sendEmailVerification(userCredential.user);
      await signOut(auth);
      
      setVerificationSent(true);
      setCountdown(60); // Start 60 second countdown
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setVerificationSent(false);
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;
    setLastEmail(email); // Store email for resend functionality

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
          await sendEmailVerification(userCredential.user);
          setError('Please verify your email before signing in. A new verification email has been sent.');
          setCountdown(60); // Start countdown
          await signOut(auth);
          return;
        }
        navigate('/');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user, {
          url: window.location.origin,
          handleCodeInApp: false,
        });
        setVerificationSent(true);
        setCountdown(60); // Start countdown
        await signOut(auth);
      }
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setLoading(true);
    const provider = new GoogleAuthProvider();
    
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <BackButton to="/">
        <FaArrowLeft /> Back to Home
      </BackButton>
      
      <AuthCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <WelcomeText>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>
            {isLogin 
              ? 'Sign in to continue your journey' 
              : verificationSent 
                ? 'Please verify your email to continue'
                : 'Join us to start your journey'
            }
          </p>
        </WelcomeText>

        <TabButtons>
          <TabButton 
            active={isLogin} 
            onClick={() => {
              setIsLogin(true);
              setVerificationSent(false);
              setError('');
            }}
          >
            Sign In
          </TabButton>
          <TabButton 
            active={!isLogin} 
            onClick={() => {
              setIsLogin(false);
              setVerificationSent(false);
              setError('');
            }}
          >
            Sign Up
          </TabButton>
        </TabButtons>

        <AnimatePresence mode="wait">
          {!isLogin && verificationSent ? (
            <SignupMessage
              key="verification"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h3>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  ✉️
                </motion.span>
                Check Your Email
              </h3>
              <p>
                We've sent a verification link to your email address.
                Please check your inbox and verify your email to complete the signup process.
              </p>
              <div className="resend-section">
                {countdown > 0 ? (
                  <CountdownText>
                    Resend available in {formatTime(countdown)}
                  </CountdownText>
                ) : (
                  <ResendButton
                    onClick={handleResendVerification}
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Resend Verification Email
                  </ResendButton>
                )}
              </div>
            </SignupMessage>
          ) : (
            <Form
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleEmailAuth}
            >
              {!isLogin && (
                <InputGroup>
                  <Input 
                    type="text" 
                    name="name" 
                    placeholder="Full Name"
                    required 
                  />
                </InputGroup>
              )}
              
              <InputGroup>
                <Input 
                  type="email" 
                  name="email" 
                  placeholder="Email Address"
                  required 
                />
              </InputGroup>

              <InputGroup>
                <Input 
                  type="password" 
                  name="password" 
                  placeholder="Password"
                  required 
                />
              </InputGroup>

              <AnimatePresence mode="wait">
                {error && (
                  <ErrorMessage
                    key={error}
                    variants={errorVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <motion.div
                      initial={{ rotate: -90 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      ⚠️
                    </motion.div>
                    {error}
                  </ErrorMessage>
                )}
              </AnimatePresence>

              <SubmitButton
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.98 }}
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </SubmitButton>

              <Divider>or continue with</Divider>

              <GoogleButton
                type="button"
                onClick={handleGoogleAuth}
                disabled={loading}
              >
                <FaGoogle />
                Google
              </GoogleButton>
            </Form>
          )}
        </AnimatePresence>
      </AuthCard>
    </PageContainer>
  );
};

export default Auth; 