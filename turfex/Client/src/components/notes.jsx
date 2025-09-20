import { useEffect, useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import { useLocalStorage } from '../lib/hooks/storage';

export const Notes = ({ onClose }) => {
  const [notes, setNotes] = useLocalStorage('notes', []);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const editorRef = useRef(null);

  const selectedNote = notes.find(n => n.id === selectedNoteId) || null;

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || '');
      setContent(selectedNote.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [selectedNoteId]);

  const onSaveNote = () => {
    const now = new Date().toISOString();
    if (selectedNote) {
      const updated = notes.map(n => n.id === selectedNote.id ? { ...n, title, content, updatedAt: now } : n);
      setNotes(updated);
    } else {
      const newNote = { id: String(Date.now()), title, content, createdAt: now, updatedAt: now };
      setNotes([newNote, ...notes]);
      setSelectedNoteId(newNote.id);
    }
  };

  const onNewNote = () => {
    setSelectedNoteId(null);
  };

  const onDeleteNote = (id) => {
    const filtered = notes.filter(n => n.id !== id);
    setNotes(filtered);
    if (selectedNoteId === id) setSelectedNoteId(null);
  };

  const onExportPdf = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const margin = 15;
    const maxLineWidth = 180;
    doc.setFont('Times', 'Normal');
    doc.setFontSize(16);
    doc.text((title || 'Untitled Note'), margin, 20);
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(content || '', maxLineWidth);
    let y = 30;
    lines.forEach((line) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(line, margin, y);
      y += 6;
    });
    doc.save((title || 'note') + '.pdf');
  };

  return (
    <div className="fixed inset-0 bg-white/95 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="md:col-span-1 border rounded-xl p-3 space-y-3 max-h-[70vh] overflow-auto">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Your Notes</h3>
            <div className="flex gap-2">
              <button onClick={onNewNote} className="px-3 py-1 rounded-lg bg-black text-white text-sm">New</button>
              <button onClick={onClose} className="px-3 py-1 rounded-lg border text-sm">Close</button>
            </div>
          </div>
          <div className="space-y-2">
            {notes.length === 0 && (
              <p className="text-sm text-gray-500">No notes yet. Create one.</p>
            )}
            {notes.map(n => (
              <div key={n.id} className={`p-2 rounded-lg border cursor-pointer ${selectedNoteId === n.id ? 'border-black' : 'border-gray-200'}`} onClick={() => setSelectedNoteId(n.id)}>
                <div className="flex items-center justify-between gap-2">
                  <div className="truncate font-medium">{n.title || 'Untitled'}</div>
                  <button onClick={(e) => { e.stopPropagation(); onDeleteNote(n.id); }} className="text-xs text-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 space-y-3">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full px-3 py-2 border rounded-lg outline-none" />
          <textarea ref={editorRef} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your note here..." className="w-full min-h-[300px] border rounded-lg p-3 outline-none bg-white resize-y"></textarea>
          <div className="flex items-center gap-2 justify-end">
            <button onClick={onSaveNote} className="px-4 py-2 rounded-lg bg-black text-white">Save</button>
            <button onClick={onExportPdf} className="px-4 py-2 rounded-lg border">Export PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
};
