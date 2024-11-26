import { useState, useEffect } from 'react';
import './index.css'
import Note from './components/Note';
import noteService from './services/';
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })

      .catch(error => {
        setErrorMessage(
          `the note '${note.content}' was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
          console.log("test")
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  useEffect(() => {
      noteService
        .getAll()
        .then(initialNotes => {
          setNotes(initialNotes)
      })

  }, []);

  const addNote = event => {
    event.preventDefault();
      const noteObject = {
        id: notes.length + 1,
        content: newNote,
        important: Math.random() > 0.5,
      };
    if (newNote.length > 0){
      noteService
      .create(noteObject)
      .then(initialNotes => {
        setNotes(notes.concat(initialNotes))
        setNewNote('')
      })
      .catch(error => {
        console.log("failed", error)
      })
    }
  };

  const handleNoteChange = event => {
    setNewNote(event.target.value);
  };

  let notesToShow;
  notes && (notesToShow = showAll ? notes : notes.filter(note => note.important));

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>

        {notes && notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>

  );
};

export default App;
