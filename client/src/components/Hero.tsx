
const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
    <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Restaurant Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
    <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-down">Welcome to Savoria</h1>
        <p className="text-xl md:text-2xl mb-8 animate-fade-in-up">Experience culinary excellence like never before</p>
        <button className="px-8 py-3 bg-yellow-500 text-gray-900 rounded-full text-lg font-semibold hover:bg-yellow-600 transition-colors animate-bounce">Order Now</button>
    </div>
</section>
  )
}

export default Hero
