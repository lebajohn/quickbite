const Hero = () => {
  return (
    <section
      className="h-screen bg-cover bg-center relative flex items-center justify-center px-4 sm:px-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')"
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>

      <div className="relative z-10 text-center px-6 fade-in">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 font-serif">
          Delicious Food,
          <br />
          Delivered Fast
        </h1>

        <p className="max-w-xl mx-auto text-lg text-gray-300 mb-8">
          Discover premium dishes crafted with passion and delivered to your
          doorstep.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
          {/* ORDER BUTTON */}
          <a
            href="#menu"
            className="bg-amber-500 hover:bg-amber-400 transition px-8 py-4 rounded-full text-black font-bold shadow-xl hover:scale-105"
          >
            Order Now
          </a>

          {/* CONTACT BUTTON */}
          <a
            href="#about"
            className="border border-amber-400 text-amber-300 hover:bg-amber-500 hover:text-black transition px-8 py-4 rounded-full font-bold backdrop-blur-sm"
          >
            Contact Us
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;