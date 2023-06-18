// GeneratedBiosDisplay.tsx
import { toast } from "react-hot-toast";

type GeneratedBiosDisplayProps = {
  generatedBios: string;
  bioRef: React.RefObject<HTMLDivElement>; // <-- add this line
};

const GeneratedBiosDisplay: React.FC<GeneratedBiosDisplayProps> = ({ generatedBios, bioRef }) => { // <-- add bioRef here
  return (
    <div className="space-y-10 my-10">
      {generatedBios && (
        <>
          <div>
            <h2
              className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
              ref={bioRef} // <-- use bioRef here
            >
              Your generated bios
            </h2>
          </div>
          <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
            {generatedBios
              .substring(generatedBios.indexOf("1") + 3)
              .split("2.")
              .map((generatedBio) => {
                return (
                  <div
                    className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedBio);
                      toast("Bio copied to clipboard", {
                        icon: "✂️",
                      });
                    }}
                    key={generatedBio}
                  >
                    <p>{generatedBio}</p>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default GeneratedBiosDisplay;
