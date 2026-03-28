import Scene from "@/components/3Dmodel";
import TypingText from "./Typingtext";

const Hero = () => {
  return (
    <>
      
      <div className="grid grid-cols-4 grid-rows-3 h-screen mt-5 
                      bg-gradient-to-r from-slate-900 via-blue-950 to-black">

        
        <div className="row-span-2 col-span-2 p-10 flex flex-col justify-center">
          <h1 className="text-2xl md:text-5xl font-bold text-white leading-tight">
            Explore the World with Smart Travel Planning
          </h1>

          <p className="mt-4 text-lg text-gray-200 max-w-xl">
            Plan trips, discover destinations, and travel smarter — all in one place.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full text-white font-semibold">
              Get Started
            </button>

            <button className="border border-white px-6 py-3 rounded-full text-white">
              Explore Trips
            </button>
          </div>
        </div>

        
        <div className="col-span-2 flex items-center justify-center">
          <TypingText />
        </div>

        
        <div className="col-span-2 row-span-2 flex items-center justify-center">
          <Scene />
        </div>

      </div>
    </>
  );
};

export default Hero;
