import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="Title Card"
            date="2017-12-01"
            content="Content Card"
            tags="#tags"
            isPinned={true}
            onDeleteNote={() => {}}
            onEditNote={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>
    </>
  )
}

export default Home