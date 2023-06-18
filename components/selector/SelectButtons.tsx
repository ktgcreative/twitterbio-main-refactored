import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";

interface Button {
  value: string;
  text: string;
}

const buttons: Button[] = [
    { value: "reading", text: "Reading" },
    { value: "writing", text: "Writing" },
    { value: "painting", text: "Painting" },
    { value: "gardening", text: "Gardening" },
    { value: "cooking", text: "Cooking" },
    { value: "traveling", text: "Traveling" },
    { value: "photography", text: "Photography" },
    { value: "music", text: "Music" },
    { value: "sports", text: "Sports" },
    { value: "hiking", text: "Hiking" },
    { value: "dancing", text: "Dancing" },
    { value: "gaming", text: "Gaming" },
];
  
const MyComponent = () => {
  const [activeButtons, setActiveButtons] = useState<Record<string, boolean>>({});
  const appRouter = useRouter();

  const handleClick = (button: Button) => {
    setActiveButtons(prevState => ({ ...prevState, [button.value]: !prevState[button.value] }));
  };

  return (
    <>
      <div className="flex mt-10 items-center space-x-3">
        <Image
          src="/1-black.png"
          width={30}
          height={30}
          alt="1 icon"
          className="mb-5 sm:mb-0"
        />
        <p className="text-left font-medium">
          Choose your interests {" "}
          <span className="text-slate-500">
            (Click the button to select an interest)
          </span>
          .
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
        {buttons.map((button, index) => (
          <button
            key={index}
            className={`flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors duration-300 mb-5 ${activeButtons[button.value] ? 'bg-black text-white' : ''}`}
            onClick={() => handleClick(button)}
          >
            <p>{button.text}</p>
          </button>
        ))}
      </div>
    </>
  );
};

export default MyComponent;
