import React, { useState } from 'react'
import TagInput from '../../components/input/TagInput'
import { MdClose } from 'react-icons/md';

const AddEditNotes = ({noteData, type, onClose}) => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const [error, setError] = useState("");

  //addNote
  const addNewNote = () => {}
  //editNote
  const editNote = () => {}


  const handleAddNote = () => {
    if (!title) {
      setError("Please enter a title");
        return;
        }
        
    if (!content) {
      setError("Please enter a content");
        return;
        }
    setError("");

    if (type === "edit") {
      editNote()
    } else {
      addNewNote()
    }

  }

  return (
    <div className="relative">

      <button 
        className='w-10 h-10 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-slate-50'
        onClick={onClose}
      >
        <MdClose className='text-xl text-slate-400 ' />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input 
          type="text" 
          className="text-2xl text-slate-950 outline-none" 
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Content</label>
        <textarea 
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded" 
          placeholder="Enter content"
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button onClick={handleAddNote} className="btn-primary font-medium mt-5 p-3">
        ADD
      </button>

    </div>
  )
}

export default AddEditNotes