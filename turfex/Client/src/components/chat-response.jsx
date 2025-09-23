import { useState, useEffect, useRef } from 'react';
import { IoMdDoneAll } from "react-icons/io";
import { FaPencilAlt, FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
import MarkdownWriter from './markdown';
import { CopyIcon, ThumbsUp, Notebook, Pencil, Download } from 'lucide-react';

export const ChatResponse = ({ memory, onCopy, editedText, setEditedText, loading, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [editModeIndex, setEditModeIndex] = useState(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (editModeIndex !== null && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [editModeIndex]);

  const handleDownloadPDF = (text) => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const margin = 20;
    const maxLineWidth = 170;

    doc.setFont("Times", "Normal");
    doc.setFontSize(12);
    doc.setTextColor(33, 33, 33);

    const lines = doc.splitTextToSize(text, maxLineWidth);
    let currentY = 30;

    doc.text("Turfex AI Result", margin, 20);
    doc.setDrawColor(200);
    doc.line(margin, 22, 190, 22);

    lines.forEach((line) => {
      if (currentY > 280) {
        doc.addPage();
        currentY = 20;
      }
      doc.text(line, margin, currentY);
      currentY += 7;
    });

    doc.save('turfex-output.pdf');
  };

  if (!memory || memory.length === 0) return null;

  return (
    <div className="px-2 py-4 space-y-6 max-w-full">
      {memory.map((msg, i) => (
        <div
          key={i}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`py-3 break-words min-w-0 ${
              msg.role === "user"
                ? "bg-neutral-100 px-7 rounded-full text-black max-w-[80%]"
                : "text-black max-w-[90%] w-full"
            }`}
          >
            {msg.role === "model" ? (
              <>
                {editMode && editModeIndex === i ? (
                  <div className="w-full">
                    <textarea
                      ref={textareaRef}
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg outline-none resize-none bg-white custom-textarea"
                      style={{ minWidth: '100%' }}
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleDownloadPDF(editedText)}
                        className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                      >
                        <FaDownload className="w-4 h-4" />
                      </button>
                      <button
                        onClick={onCopy}
                        className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                      >
                        <CopyIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditMode(false);
                          setEditModeIndex(null);
                        }}
                        className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                      >
                        <IoMdDoneAll className="w-4 h-4" />
                      </button>
                      <button className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className='px-0.5'>
                       <MarkdownWriter text={msg.content}/>
                    </div>
                  
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleDownloadPDF(msg.content)}
                        className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                      >
                        <Download className="hover:text-neutral-500 w-4 h-4" />
                      </button>
                      <button
                        onClick={onCopy}
                        className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                      >
                        <CopyIcon className="hover:text-neutral-500 w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditedText(msg.content);
                          setEditMode(true);
                          setEditModeIndex(i);
                        }}
                        className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                      >
                        <Pencil className="hover:text-neutral-500 w-4 h-4" />
                      </button>
                      <button className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                        <ThumbsUp className="hover:text-neutral-500 w-4 h-4" />
                      </button>
                      <button 
                      onClick={() => {
                        onSave && onSave(msg.content);
                      }}
                      className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                        <Notebook className="hover:text-neutral-500 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p>{msg.content}</p>
            )}
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex justify-start">
        <span className="loading loading-dots loading-xs"></span>
        </div>
      )}
    </div>
  );
};

export default ChatResponse;