const Destinations = () => {
  return (
    <section id="destinations" className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sample destination cards */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3" alt="Paris" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">Paris, France</h3>
              <p className="text-gray-600">Experience the city of love and its iconic landmarks.</p>
            </div>
          </div>
          {/* Add more destination cards as needed */}
        </div>
      </div>
    </section>
  );
};

export default Destinations; 