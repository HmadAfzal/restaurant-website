
const Statistics = () => {
    const statistics=[
        { number: 50, label: 'Outlets' },
        { number: 100, label: 'Chefs' },
        { number: 200, label: 'Menus' },
        { number: 20, label: 'Countries served' },
    ]
  return (
    <section className="py-32 bg-gray-800">
    <div className="container mx-auto px-4">
        <h4 className='text-4xl font-bold text-center mb-12 text-yellow-500' >Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statistics.map((stat, index) => (
                <div key={index} className="bg-gray-700 p-6 rounded-lg">
                    <h3 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">{stat.number}+</h3>
                    <p className="text-lg">{stat.label}</p>
                </div>
            ))}
        </div>
    </div>
</section>
  )
}

export default Statistics
