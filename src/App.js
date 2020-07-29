import React, { useState, useEffect } from 'react'
import {Note, ButtonWithStyle} from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import styled from 'styled-components'

const HeaderWithStyle = styled.h1`
  margin:0px;
  font-family: 'Roboto', sans-serif;
  font-size: 40px;
  line-height: 70px;
  display: relative;
  letter-spacing: -0.015em;
  text-align: center;
  transition: all .2s ease;
  background: #333;
  color: #fff;
`;

const InputWithStyle = styled.input`
  font-style: normal;
  font-weight: 600;
  width: 40rem;
  line-height: 2rem;
  font-size: 0.833333rem;
  color: white;
  background: rgb(33, 33, 33);
  border-radius: 50px;
  border: 1px solid transparent;
  flex: 20 0 auto;
  margin: 3px
`

const App = () => {
  // console.log(props.notes)
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  
  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  
  const hook = () => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        console.log('got all notes from server')
        setNotes(initialNotes)
      })
  }

  useEffect(hook, []) // 2 parameters: function, how often effect is run
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event)
    const newNoteObj = {
      content: newNote,
      date : new Date(),
      important: Math.random() > .5
    }
    noteService
      .create(newNoteObj)
      .then(newObj => {
        // console.log(response)
        console.log('added new note to server')
        setNotes(notes.concat(newObj))
        setNewNote('')
      })
  }

  const toggleImportanceOf = (id) => {
    console.log('toggling importance of: id =', id)
    // const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = {
      ...note,
      important : !note.important,
      dateUpdated : new Date()
    }
    noteService
      .update(id, changedNote)
      .then(updatedNote => {
        console.log('updated note to server')
        setNotes(notes.map((note) => note.id === id ? changedNote : note))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })

  }

  const handleNoteChange = (event) => {
    console.log('input box:',event.target.value)
    // console.log("value changed in input form")
    setNewNote(event.target.value)
  }

  return (
    <div>
      <HeaderWithStyle>Notes</HeaderWithStyle>
      <Notification message={errorMessage} />
      <ButtonWithStyle onClick = {()=>setShowAll(!showAll)}>
        Showing: {showAll ? 'All' : 'Important'}
      </ButtonWithStyle>
      <ul style = {{"margin" : "2px"}}>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <InputWithStyle value = {newNote} onChange = {handleNoteChange}/>
        <ButtonWithStyle type="submit">save</ButtonWithStyle>
      </form>
      <Footer/>
    </div>
  )
}

export default App