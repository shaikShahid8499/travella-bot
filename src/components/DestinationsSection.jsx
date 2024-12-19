import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Section = styled.section`
  padding: 8rem 2rem;
  background: #040C18;
  position: relative;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
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

const Subtitle = styled.p`
  color: #81AFDD;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(174, 103, 250, 0.5);
    box-shadow: 0 10px 30px rgba(174, 103, 250, 0.2);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.1);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const CardDescription = styled.p`
  color: #81AFDD;
  font-size: 0.95rem;
  margin-bottom: 1rem;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  color: #AE67FA;
  font-size: 0.9rem;
  gap: 0.5rem;
`;

const ViewButton = styled.button`
  background: rgba(174, 103, 250, 0.1);
  color: #AE67FA;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  width: 100%;

  &:hover {
    background: rgba(174, 103, 250, 0.2);
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ModalContent = styled(motion.div)`
  background: #0F1624;
  border-radius: 20px;
  max-width: 600px;
  width: 100%;
  position: relative;
  border: 1px solid rgba(174, 103, 250, 0.2);
  overflow: hidden;
  max-height: 90vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-height: 95vh;
  }
`;

const ModalImage = styled.div`
  width: 100%;
  height: 250px;
  position: relative;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
  overflow-y: auto;
  flex-grow: 1;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ModalTitle = styled.h3`
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ModalDescription = styled.p`
  color: #81AFDD;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ModalDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const DetailItem = styled.div`
  color: white;
  
  span {
    display: block;
    color: #AE67FA;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const MapButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(174, 103, 250, 0.1);
  color: #AE67FA;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  margin-top: 1rem;

  &:hover {
    background: rgba(174, 103, 250, 0.2);
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const destinations = [
  {
    id: 1,
    title: "Bali, Indonesia",
    description: "Experience tropical paradise with pristine beaches and rich cultural heritage.",
    fullDescription: "Discover the magic of Bali, where ancient temples meet pristine beaches. Immerse yourself in the vibrant local culture, indulge in world-class cuisine, and find peace in lush rice terraces. Perfect for both adventure seekers and those looking for spiritual renewal.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    rating: 4.8,
    bestTime: "April to October",
    duration: "7-14 days",
    activities: ["Temple Tours", "Beach Activities", "Cultural Shows", "Spa Treatments"],
    highlights: ["Ubud Sacred Monkey Forest", "Tanah Lot Temple", "Rice Terraces", "Mount Batur"],
    mapUrl: "https://maps.app.goo.gl/o6NQfb2j5yUmjSdR8"
  },
  {
    id: 2,
    title: "Santorini, Greece",
    description: "Discover whitewashed buildings and breathtaking Mediterranean sunsets.",
    fullDescription: "Step into a postcard-perfect setting in Santorini, where blue-domed churches and white-washed buildings cascade down volcanic cliffs. Experience world-famous sunsets, explore ancient ruins, and indulge in exceptional Mediterranean cuisine.",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e",
    rating: 4.9,
    bestTime: "June to September",
    duration: "5-10 days",
    activities: ["Sunset Watching", "Wine Tasting", "Island Hopping", "Archaeological Tours"],
    highlights: ["Oia Village", "Fira Town", "Red Beach", "Ancient Akrotiri"],
    mapUrl: "https://goo.gl/maps/QDEhz3PbAnFqEfPE7"
  },
  {
    id: 3,
    title: "Kyoto, Japan",
    description: "Immerse yourself in ancient temples and traditional Japanese gardens.",
    fullDescription: "Journey through time in Kyoto, Japan's cultural heart. Walk through serene bamboo forests, visit centuries-old temples, and witness the beauty of cherry blossoms. Experience traditional tea ceremonies and find peace in meticulously maintained Zen gardens.",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9",
    rating: 4.7,
    bestTime: "March to May, October to November",
    duration: "4-7 days",
    activities: ["Temple Visits", "Tea Ceremonies", "Garden Tours", "Kimono Experience"],
    highlights: ["Fushimi Inari Shrine", "Kinkaku-ji", "Arashiyama Bamboo Grove", "Gion District"],
    mapUrl: "https://goo.gl/maps/dB9BKCz5Vx3HbXUV7"
  },
  {
    id: 4,
    title: "Machu Picchu, Peru",
    description: "Explore the ancient Incan citadel set high in the Andes Mountains.",
    fullDescription: "Journey to one of the world's most iconic archaeological sites. This 15th-century Incan citadel, perched high in the Andes Mountains, offers breathtaking views and fascinating insights into ancient civilization. Trek through cloud forests and discover the mysteries of the Incan Empire.",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1",
    rating: 4.9,
    bestTime: "May to October",
    duration: "4-5 days",
    activities: ["Inca Trail Hiking", "Archaeological Tours", "Mountain Climbing", "Cultural Experiences"],
    highlights: ["Sun Gate", "Huayna Picchu", "Temple of the Sun", "Intihuatana"],
    mapUrl: "https://goo.gl/maps/d7SPYvxvyPk8KsHt7"
  },
  {
    id: 5,
    title: "Maldives",
    description: "Paradise on Earth with crystal clear waters and overwater bungalows.",
    fullDescription: "Experience luxury and tranquility in the heart of the Indian Ocean. The Maldives offers pristine white-sand beaches, vibrant coral reefs, and world-class water sports. Stay in overwater villas and witness some of the most spectacular sunsets on Earth.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
    rating: 4.8,
    bestTime: "November to April",
    duration: "5-7 days",
    activities: ["Snorkeling", "Scuba Diving", "Spa Treatments", "Island Hopping"],
    highlights: ["Male Atoll", "Underwater Restaurant", "Bioluminescent Beach", "Coral Gardens"],
    mapUrl: "https://goo.gl/maps/zaaCPw1mBwRPKrKn8"
  },
  {
    id: 6,
    title: "Cappadocia, Turkey",
    description: "Surreal landscapes and hot air balloon rides over fairy chimneys.",
    fullDescription: "Float above a landscape that seems from another world. Cappadocia's unique rock formations, underground cities, and cave churches create an unforgettable experience. Watch the sunrise from a hot air balloon and stay in cave hotels carved into ancient rock.",
    image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd",
    rating: 4.7,
    bestTime: "April to June, September to November",
    duration: "3-5 days",
    activities: ["Hot Air Balloon Rides", "Cave Hotels", "Underground City Tours", "Hiking"],
    highlights: ["Göreme Open Air Museum", "Uçhisar Castle", "Red Valley", "Underground Cities"],
    mapUrl: "https://goo.gl/maps/YxvWvjGxT3TpZJFT6"
  }
];

const DestinationsSection = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);

  const handleCardClick = (destination) => {
    console.log('Selected destination:', destination);
    setSelectedDestination(destination);
  };

  return (
    <Section id="destinations">
      <Container>
        <SectionHeader>
          <Title>Popular <span>Destinations</span></Title>
          <Subtitle>
            Explore our handpicked selection of stunning destinations, 
            each offering unique experiences and unforgettable memories.
          </Subtitle>
        </SectionHeader>
        <Grid>
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: destination.id * 0.1 }}
            >
              <CardImage>
                <img src={destination.image} alt={destination.title} />
              </CardImage>
              <CardContent>
                <CardTitle>{destination.title}</CardTitle>
                <CardDescription>{destination.description}</CardDescription>
                <CardMeta>
                  <span>⭐ {destination.rating}</span>
                </CardMeta>
                <ViewButton onClick={() => handleCardClick(destination)}>
                  View Details
                </ViewButton>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Container>

      <AnimatePresence>
        {selectedDestination && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDestination(null)}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setSelectedDestination(null)}>
                <IoClose size={24} />
              </CloseButton>
              <ModalImage>
                <img src={selectedDestination.image} alt={selectedDestination.title} />
              </ModalImage>
              <ModalBody>
                <ModalTitle>{selectedDestination.title}</ModalTitle>
                <ModalDescription>{selectedDestination.fullDescription}</ModalDescription>
                <ModalDetails>
                  <DetailItem>
                    <span>Best Time to Visit</span>
                    {selectedDestination.bestTime}
                  </DetailItem>
                  <DetailItem>
                    <span>Recommended Duration</span>
                    {selectedDestination.duration}
                  </DetailItem>
                  <DetailItem>
                    <span>Rating</span>
                    ⭐ {selectedDestination.rating}
                  </DetailItem>
                  <DetailItem>
                    <span>Activities</span>
                    {selectedDestination.activities.join(', ')}
                  </DetailItem>
                </ModalDetails>
                <MapButton 
                  href={selectedDestination.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <FaMapMarkerAlt /> View on Map
                </MapButton>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default DestinationsSection; 