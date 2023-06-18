// BioInput.tsx
import Image from "next/image";
import { ChangeEvent, FC } from "react";

interface BioInputProps {
  bio: string;
  setBio: (bio: string) => void;
}

const BioInput: FC<BioInputProps> = ({ bio, setBio }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
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
          Copy your current bio{" "}
          <span className="text-slate-500">
            (or write a few sentences about yourself)
          </span>
          .
        </p>
      </div>
      <textarea
        value={bio}
        onChange={handleChange}
        rows={4}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
        placeholder={
          "e.g. Senior Developer Advocate @vercel. Tweeting about web development, AI, and React / Next.js. Writing nutlope.substack.com."
        }
      />
    </>
  );
};

export default BioInput;
