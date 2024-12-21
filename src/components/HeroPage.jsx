import React from "react";
import InputBox from "./InputBox";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Heart } from "lucide-react";
const services = [
  {
    title: "Health Dashboard",
    body: "We provide a health report based on the information provided by you.",
    img: "mn.png",
  },
  {
    title: "Personalization Suggestion",
    body: "Based on the your information, we will generate a personalized health report specifically tailored to your unique needs and concerns.",
    img: "pi.png  ",
  },
  {
    title: "Potential Risk Management",
    body: "To minimize risks and ensure informed decision-making, our health report help to analysis based on the information you.",
    img: "Tteokbokki.png",
  },
];
const lifestyle = [
  {
    title: "Sleep Improvement",
    description:
      "Expert-curated strategies to enhance your sleep quality and establish healthy bedtime routines.",
    img: "Night.png",
    bgColor: "bg-blue-50",
  },
  {
    title: "Daily Motivation",
    description:
      "Inspiring quotes and success stories to keep you motivated and focused on your wellness journey.",
    img: "Idea.png",
    bgColor: "bg-green-50",
  },
  {
    title: "Personal Optimization",
    description:
      "Customized recommendations aligned with your specific health goals and preferences.",
    img: "Ambition.png",
    bgColor: "bg-purple-50",
  },
];
const HeroPage = () => {
  return (
    <div className="bg-[#f9f4f1]">
      <Navbar />
      <div className="hero-container mx-10 grid space-y-36 text-center md:text-start xl:mx-48">
        <div className="hero-text-image grid min-h-[80vh] gap-10 md:grid-cols-2">
          <div className="hero-text flex flex-col gap-4 self-center items-center lg:items-start">
            <div className="health-label flex">
              <p className="mt-10 flex cursor-default items-center justify-center gap-5 rounded-full border-2 p-3 py-2 text-sm font-bold transition-transform hover:scale-110 lg:mt-0">
                Health Matters <Heart />
              </p>
            </div>
            <h1 className="text-4xl font-bold md:text-[3rem]">
              <span className="block text-[#4f9b18]">One Step Solution</span>
              <span className="my-5 md:block">for all your Health</span> needs
            </h1>
            <button className="mx-4 my-5 lg:self-start rounded-lg bg-secondary px-6 py-2 shadow-md transition duration-300 hover:bg-[#8bb967]">
              Explore
            </button>
          </div>
          <div className="hero-image self-center">
            <img
              className="w-full"
              src="https://media.discordapp.net/attachments/1316344599983292418/1316675483554938950/HERO.png?ex=675be919&is=675a9799&hm=1307f8ed588d6b71db74a36135a4e01a381a29644c1d4ed8e10c5632fbf44472&=&format=webp&quality=lossless"
              alt="hero"
            />
          </div>
        </div>
        <div className="space-y-12">
          <h2 className="text-center text-4xl font-bold">
            Enhance Your <span className="text-[#4f9b18]">Lifestyle</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {lifestyle.map((item, index) => (
              <div
                key={index}
                className={`${item.bgColor} transform rounded-2xl p-6 shadow-md transition-all duration-300 hover:-translate-y-4 hover:shadow-xl`}
              >
                <div className="flex flex-col items-center space-y-4 text-center">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="mb-4 h-24 w-24 object-contain"
                  />
                  <h3 className="text-2xl font-bold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="services-section container mx-auto px-4 py-16">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold">
              Our <span className="text-[#4f9b18]">Services</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Discover comprehensive health solutions tailored to your unique
              needs
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="group flex transform flex-col overflow-hidden rounded-xl border border-gray-100 bg-gray-100 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
                </div>

                <div className="flex flex-grow flex-col justify-between gap-6 p-6">
                  <h3 className="mb-3 text-xl font-bold text-[#4f9b18]">
                    {service.title}
                  </h3>
                  <p className="flex-grow text-gray-600">{service.body}</p>
                  <button className="mt-auto w-full rounded-md bg-[#4f9b18] px-4 py-2 text-white transition-colors hover:bg-[#3a7a12] focus:outline-none focus:ring-2 focus:ring-[#4f9b18] focus:ring-opacity-50">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="italic text-gray-500">
              * Personalized solutions for your health journey
            </p>
          </div>
        </div>
        <div className="subscribe-section grid justify-items-center gap-10">
          <div className="flex">
            <h1 className="text-4xl font-bold md:text-[3rem]">
              <span className="text-[#4f9b18]">SUBSCRIBE</span> FOR REGULAR
              UPDATES
            </h1>
          </div>
          <div className="subscribe-content w-full lg:w-1/2">
            <InputBox
              content="Your email"
              className="rounded-lg border-2 shadow-lg"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HeroPage;
