import { Button } from "@/components/ui/button";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Banner from "/banner.jpg";

const HeroSection = () => {
  const imageRef = useRef();

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPostion = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPostion > scrollThreshold) {
        // imageElement.style.transform = `translateY(${
        //   scrollPostion - scrollThreshold
        // }px)`;
        imageElement.classList.add("scrolled");
      } else {
        // imageElement.style.transform = "translateY(0)";
        imageElement.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
          Manage Your finances <br /> with Intelligence
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          An AI-powered financial management platform that helps ypu track,
          analyze, and optimize your spending with real-time insights.
        </p>
        <div className="flex justify-center">
          <Link to="/dashboard">
            <Button size="lg" variant="outline" className="px-8">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper py-20">
          <div ref={imageRef} className="hero-image">
            <img
              src={Banner}
              alt="Dashboard Preview"
              className="rounded-lg"
              width={1280}
              height={720}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
