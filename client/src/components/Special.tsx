
const Special = () => {
  return (
    <section id="promo" className="py-32 bg-gray-900">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <img src="https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Special Dish" className="rounded-lg shadow-xl" />
      </div>
      <div className="md:w-1/2 md:pl-12">
        <h2 className="text-4xl font-bold mb-6 text-yellow-500">Oriental Taste</h2>
        <p className="text-xl mb-8">Experience the exotic flavors of the East with our chef's special Oriental cuisine. A perfect blend of spices and tradition.</p>
        <button className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-600 transition duration-300">
          Try Now
        </button>
      </div>
    </div>
  </section>
  )
}

export default Special
