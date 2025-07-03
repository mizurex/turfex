import { useEffect, useState } from 'react';

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

  return <span>{displayedText}</span>;
};

export default TypeWriter;
