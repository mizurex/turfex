import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const TypeWriter = ({ text = '', speed = 30, onDone }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    let timeout;

    setDisplayedText(''); // reset the output

    const type = () => {
      if (i <= text.length) {
        setDisplayedText(text.slice(0, i));
        i++;
        timeout = setTimeout(type, speed);
      } else {
        if (onDone) onDone();
      }
    };

    type(); // start typing

    return () => clearTimeout(timeout); // cleanup on unmount
  }, [text, speed]);

  return (
    <div className="text-[16px]  text-black font-outfit">
<ReactMarkdown
  components={{
    p: ({ node, ...props }) => (
      <p className="mb-2 text-black" {...props} />
    ),
    ul: ({ node, ...props }) => (
      <ul className="list-disc ml-6 text-black mb-2" {...props} />
    ),
    li: ({ node, ...props }) => (
      <li className="text-black mb-1" {...props} />
    ),
    strong: ({ node, ...props }) => (
      <strong className="font-semibold text-black" {...props} />
    ),
    h1: ({ node, ...props }) => (
      <h1 className="text-2xl font-bold text-black mb-2" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-xl font-semibold text-black mb-2" {...props} />
    ),
    a: ({ node, ...props }) => (
      <a className="text-blue-600 underline" target="_blank" rel="noopener noreferrer" {...props} />
    ),
  }}
>
  {displayedText}
</ReactMarkdown>

    </div>
  )
};

export default TypeWriter;
