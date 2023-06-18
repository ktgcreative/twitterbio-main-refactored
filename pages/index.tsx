import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { VibeType } from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import BioInput from "../components/BioInput";
import GenerateButton from "../components/GenerateButton";
import GeneratedBiosDisplay from "../components/GeneratedBiosDisplay";
import VibeSelector from "../components/VibeSelector";
import { useGenerateBio } from '../hooks/useGenerateBio';
import HeroSection from "../components/HeroSection";

const Home: NextPage = () => {
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState<VibeType>("Professional");
  const { loading, generatedBios, generateBio } = useGenerateBio();

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const generatePrompt = (vibe: VibeType, bio: string) => {
    return `Generate 2 ${vibe} twitter biographies with no hashtags and clearly labeled "1." and "2.". ${vibe === "Funny"
      ? "Make sure there is a joke in there and it's a little ridiculous."
      : null
      }
    Make sure each generated biography is less than 160 characters, has short sentences that are found in Twitter bios, and base them on this context: ${bio}${bio.slice(-1) === "." ? "" : "."
      }`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = generatePrompt(vibe, bio);
    generateBio(prompt);
  };

  // Call scrollToBios when generatedBios updates
  useEffect(() => {
    if (generatedBios) {
      scrollToBios();
    }
  }, [generatedBios]);

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Twitter Bio Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/Nutlope/twitterbio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a>

        <HeroSection title="Generate your next Twitter bio using chatGPT"
                     subtitle="47,118 bios generated so far." />

        <div className="max-w-xl w-full">
          <BioInput bio={bio} setBio={setBio} />

          <VibeSelector vibe={vibe} setVibe={setVibe} />

          <GenerateButton loading={loading} onClick={handleSubmit} />
        </div>


        <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 2000 }} />

        <GeneratedBiosDisplay generatedBios={generatedBios} bioRef={bioRef} />

      </main>
      <Footer />
    </div>
  );
};

export default Home;