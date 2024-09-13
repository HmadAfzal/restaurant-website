
const Subscription = () => {
  return (
    <section id="contact" className="py-32 bg-gray-900">
    <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
    <p className="text-xl mb-8">Stay updated with our latest offers and promotions</p>
        <form className="max-w-md mx-auto">
            <div className="flex">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-700"
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-yellow-500 text-gray-900 rounded-r-full font-semibold hover:bg-yellow-600 transition-colors"
                >
                    Subscribe
                </button>
            </div>
        </form>
    </div>
</section>
  )
}

export default Subscription
