// hooks/useGenerateBio.ts
import { useState, useRef } from 'react';
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";



export const useGenerateBio = () => {
  const [loading, setLoading] = useState(false);
  const [generatedBios, setGeneratedBios] = useState<string>("");
  
  const bioRef = useRef<null | HTMLDivElement>(null);
  const reset = () => setGeneratedBios("");
  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const generateBio = async (prompt: string) => {
    setLoading(true);
    reset()
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const onParse = (event: ParsedEvent | ReconnectInterval) => {
      if (event.type === "event") {
        const data = event.data;
        try {
          const text = JSON.parse(data).text ?? ""
          setGeneratedBios((prev) => prev + text);
        } catch (e) {
          console.error(e);
        }
      }
    }

    // https://web.dev/streams/#the-getreader-and-read-methods
    const reader = data.getReader();
    const decoder = new TextDecoder();
    const parser = createParser(onParse);
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      parser.feed(chunkValue);
    }
    scrollToBios();
    setLoading(false);
  };

  return { loading, generatedBios, generateBio };
};
