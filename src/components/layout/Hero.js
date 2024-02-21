import Right from "../icons/Right";
import Image from "next/image";

export default function Hero() {
    return(
        <section className="hero">
            <div className="py-12">
                <h1 className="text-6xl font-bold">Everything <br />is better <br />with <span className="text-primary">Food</span></h1>
                <p className="my-6 text-gray-600">Satisfy Your Cravings, Anytime, Anywhere.</p>
                <div className="flex gap-4 text-sm">
                    <button className="bg-primary uppercase flex gap-2 items-center text-white px-4 py-2 rounded-full">
                        Order Now
                        <Right />
                    </button>
                    <button className="flex gap-2 py-2 text-gray-600 font-semibold">
                        Learn More
                        <Right />
                    </button>
                </div>
            </div>
            <div className="relative">
                <Image src={'/burger.png'} layout={'fill'} objectFit={'contain'} alt={'Burger'}/>
            </div>
        </section>
    );
}