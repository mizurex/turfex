import { useState, useEffect, useRef } from 'react';
import { IoMdCopy } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaEdit, FaSave } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa"; // PDF icon
import { jsPDF } from "jspdf"; // 👈 import jsPDF
import TypeWriter from './TypeWriter';
import { Delete, Ellipsis } from 'lucide-react';

const Response = ({ result, onCopy, onSave, editedText, setEditedText }) => {
  const [editMode, setEditMode] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [show, setShow] = useState(true);
  const [showOption,setShowOption] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (editMode && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [editMode]);

  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => {
      setEditedText(result);
      setShow(true);
      setTypingDone(false);
      setEditMode(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [result]);

  const handleShowOptions = ()=>{
    setShowOption(!showOption);
  }

 const handleDownloadPDF = () => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const margin = 20;
  const maxLineWidth = 170;

  doc.setFont("Times", "Normal");
  doc.setFontSize(12);
  doc.setTextColor(33, 33, 33); // Dark gray text

  const lines = doc.splitTextToSize(editedText || result, maxLineWidth);

  let currentY = 30;

  doc.text("Turfex AI Result", margin, 20);
  doc.setDrawColor(200);
  doc.line(margin, 22, 190, 22); // underline title

  lines.forEach((line) => {
    if (currentY > 280) {
      doc.addPage();
      currentY = 20;
    }
    doc.text(line, margin, currentY);
    currentY += 7; // line height
  });

  doc.save('turfex-output.pdf');
};


  if (!result) return null;

  return (
    <div className="h-70 px-5 mt-2.5">
      {/* Top Buttons */}
      <div className="flex justify-end gap-2 mb-2">
        <button onClick={onCopy} title="Copy"><IoMdCopy /></button>
       
  <div className="relative hover:bg-gray-500 ">
  
  <button
    className="relative"
    onClick={handleShowOptions}
  >
    <Ellipsis />
  </button>


  {showOption && (
    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow z-10 p-2 space-y-2">
      <button
        onClick={handleDownloadPDF}
        className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded"
      >
        <FaFilePdf /> Save as PDF
      </button>

      <button
        onClick={() => alert("Delete clicked")}
        className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded"
      >
        <Delete /> Delete
      </button>
    </div>
  )}
</div>

        {typingDone && (
          editMode ? (
            <button onClick={() => setEditMode(false)} title="Save Edits">
              <FaSave />
            </button>
          ) : (
            <button onClick={() => setEditMode(true)} title="Edit Text">
              <FaEdit />
            </button>
          )
        )}
      </div>

   
      {show && (
        <div className="font-outfit prose prose-sm pretty py-5 px-4 break-words whitespace-pre-wrap overflow-hidden max-w-full mt-2  text-[17px] text-black bg-[#fdfaf5]   rounded-md shadow-sm">
          {editMode ? (
            <textarea
              ref={textareaRef}
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              className="w-full bg-transparent outline-none resize-none overflow-hidden"
              placeholder="Edit your text..."
              style={{ transition: 'height 0.2s ease-in-out' }}
            />
          ) : (
            <TypeWriter text={editedText} speed={5} onDone={() => setTypingDone(true)} />
          )}
        </div>
      )}
    </div>
  );
};

export default Response;
