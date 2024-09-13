
const Bestseller = () => {
const dishes=[
    {
        name: 'Grilled Salmon',
        description: 'Fresh Atlantic salmon with lemon butter sauce',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    },
    {
        name: 'Truffle Risotto',
        description: 'Creamy Arborio rice with black truffle shavings',
        image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
        name: 'Wagyu Steak',
        description: 'Premium Japanese Wagyu beef cooked to perfection',
        image: 'https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    }
]

  return (
    <section id="product" className="py-32 bg-gray-800">
    <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-500">Our Best Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dishes.map((dish, index) => (
                <div key={index} className="bg-gray-700 rounded-lg overflow-hidden shadow-lg  duration-300 hover:shadow-xl  transition-all hover:scale-105">
                    <img src={dish.image} alt={dish.name} className="w-full h-64 object-cover" />
                    <div className="p-6 ">
                        <h3 className="text-2xl font-semibold mb-2 text-yellow-500">{dish.name}</h3>
                        <p className="text-gray-300">{dish.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
</section>
  )
}

export default Bestseller
