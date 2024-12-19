const About = () => {
  return (
    <section id="about" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">About TravelBot</h2>
            <p className="text-gray-600 mb-4">
              TravelBot is your intelligent travel companion, powered by advanced AI technology.
              We help you discover amazing destinations, plan your trips, and make your travel
              dreams come true.
            </p>
            <p className="text-gray-600">
              Our AI-powered chatbot provides personalized recommendations, travel tips,
              and answers to all your travel-related questions 24/7.
            </p>
          </div>
          <div className="mt-8 lg:mt-0">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828"
              alt="Travel Planning"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 