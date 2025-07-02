import { IoMdCopy } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import TypeWriter from './TypeWriter';

const Response = ({ result, onCopy, onSave }) => {
  if (!result) return null;

  return (
    <div className=" rounded-xl  p-4 border border-gray-200 h-full">
      <div className="flex justify-end gap-2 mb-2">
        <button onClick={onCopy} title="Copy"><IoMdCopy /></button>
        <button onClick={onSave} title="Save"><FaHeart /></button>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(result)}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on X"
        >
          <RiTwitterXLine />
        </a>
      </div>
     <div className="font-book break-words whitespace-pre-wrap overflow-hidden max-w-full mt-2 p-4 text-[15px] text-[#2c2c2c] bg-[#fdfaf5] font-serif leading-relaxed rounded-md shadow-sm">
  <TypeWriter text={result} speed={30}/>
</div>

    </div>
  );
};

export default Response;
