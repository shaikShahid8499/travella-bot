import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatbotPane from '../components/ChatbotPane';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ChatbotPane />
    </>
  );
};

export default MainLayout; 