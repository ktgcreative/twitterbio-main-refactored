// VibeSelector.tsx
import Image from "next/image";
import DropDown, { VibeType } from "./DropDown";

interface VibeSelectorProps {
  vibe: VibeType;
  setVibe: (vibe: VibeType) => void;
}

const VibeSelector: React.FC<VibeSelectorProps> = ({ vibe, setVibe }) => {
  return (
    <>
      <div className="flex mb-5 items-center space-x-3">
        <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
        <p className="text-left font-medium">Select your vibe.</p>
      </div>
      <div className="block">
        <DropDown vibe={vibe} setVibe={setVibe} />
      </div>
    </>
  );
};

export default VibeSelector;
