// GenerateButton.tsx
import { MouseEvent } from 'react';
import LoadingDots from "./loading/LoadingDots";

type GenerateButtonProps = {
  loading: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

const GenerateButton: React.FC<GenerateButtonProps> = ({ loading, onClick }) => {
    return (
      !loading ? (
        <button
          className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
          onClick={onClick}
        >
          Generate your bio &rarr;
        </button>
      ) : (
        <button
          className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
          disabled
        >
          <LoadingDots color="white" style="large" />
        </button>
      )
    );
  };
  
export default GenerateButton;
