import Image from "next/image";

const Hero = () => {
  return (
    <div className="mb-8 relative">
      <div>
        <Image
          src="/herowheels.jpg"
          alt="Hero"
          width={400}
          height={400}
          className="w-full h-[350px] object-cover rounded-2xl"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 rounded-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className="text-white text-3xl font-bold">Explore all our vehicles for sale!</p>
      </div>
    </div>
  );
};

export default Hero;