import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { VibeType } from "../components/dropdown/DropDown";
import Footer from "../components/footer/Footer";
import Github from "../components/GitHub";
import Header from "../components/header/Header";
import BioInput from "../components/bio/BioInput";
import GenerateButton from "../components/GenerateButton";
import GeneratedBiosDisplay from "../components/bio/GeneratedBiosDisplay";
import VibeSelector from "../components/selector/VibeSelector";
import { useGenerateBio } from '../hooks/useGenerateBio';
import HeroSection from "../components/header/HeroSection";
import Buttons from '../components/selector/SelectButtons';


const Home: NextPage = () => {
  const [bio, setBio] = useState("");
  const [vibe, setVibe] = useState<VibeType>("Professional");
  const [selectedHobbies, setSelectedHobbies] = useState<Record<string, boolean>>({});
  const { loading, generatedBios, generateBio } = useGenerateBio();
  const bioRef = useRef<null | HTMLDivElement>(null);

  // Function to scroll to the generated bios section
  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHobbySelection = (hobby: string) => {
    setSelectedHobbies(prevState => ({ ...prevState, [hobby]: !prevState[hobby] }));
  };

  // Function to generate the prompt for the bio generation
  const generatePrompt = (vibe: VibeType, bio: string, hobbies: string[]) => {
    const hobbiesText = hobbies.length > 0 ? `Hobbies: ${hobbies.join(', ')}.` : '';
    return `Generate 2 ${vibe} twitter biographies with no hashtags and clearly labeled "1." and "2.". ${vibe === "Funny"
      ? "Make sure there is a joke in there and it's a little ridiculous."
      : null
      }
    Make sure each generated biography is less than 160 characters, has short sentences that are found in Twitter bios, and base them on this context: ${bio}${bio.slice(-1) === "." ? "" : "."} ${hobbiesText}`;
  };

  

  // Function to handle the form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedHobbiesList = Object.keys(selectedHobbies).filter(hobby => selectedHobbies[hobby]);
    const prompt = generatePrompt(vibe, bio, selectedHobbiesList);
    console.log(prompt)
    generateBio(prompt);
  };

  // Effect to scroll to the bios section when the generatedBios state updates
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
        {/* <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/Nutlope/twitterbio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a> */}

        <HeroSection title="Generate your next Twitter bio using chatGPT"
                     subtitle="47,118 bios generated so far." />

        <div className="max-w-xl w-full">
          <BioInput bio={bio} setBio={setBio} />
          <Buttons handleHobbySelection={handleHobbySelection} selectedHobbies={selectedHobbies} />
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
