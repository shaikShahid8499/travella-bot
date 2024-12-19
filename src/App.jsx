import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import MainLayout from './layouts/MainLayout';
import ChatLayout from './layouts/ChatLayout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import ChatBot from './pages/ChatBot';
import { AuthProvider } from './context/AuthContext';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --font-primary: 'Montserrat', sans-serif;
    --font-secondary: 'Poppins', sans-serif;
    --color-primary: #2563eb;
    --color-secondary: #1d4ed8;
    --color-text: #1f2937;
    --color-text-light: #6b7280;
  }

  body {
    font-family: var(--font-secondary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--color-text);
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-primary);
    font-weight: 700;
    line-height: 1.2;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: var(--font-primary);
    cursor: pointer;
  }

  p {
    font-family: var(--font-secondary);
    line-height: 1.6;
  }
`;

function App() {
  return (
    <Router>
      <AuthProvider>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/chatbot" element={<ChatLayout><ChatBot /></ChatLayout>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
