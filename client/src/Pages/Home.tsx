import Bestseller from "../components/Bestseller";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Special from "../components/Special";
import Statistics from "../components/Statistics";
import Subscription from "../components/Subscription";

export default function Home() {

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />
            <Hero />
            <Bestseller />
            <Special />
            <Statistics />
            <Subscription />
            <Footer />
        </div>
    )
}