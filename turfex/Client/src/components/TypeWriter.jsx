import { useEffect, useState } from 'react';

const TypeWriter = ({ text, speed, onDone }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        if (onDone) onDone();  // 👈 Notify parent when done
      }
    }, speed);

    return () => clearInterval(interval);
  }, []);

  return <span>{displayedText}</span>;
};

export default TypeWriter;
