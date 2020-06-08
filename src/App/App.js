import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import ApiContext from '../ApiContext'
import config from '../config'
import './App.css'

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    const notesUrl = process.env.REACT_APP_API_ENDPOINT + `/api/notes`
    const foldersUrl = process.env.REACT_APP_API_ENDPOINT + `/api/folders`
    const API_KEY = process.env.REACT_APP_API_KEY
    Promise.all([
      fetch(notesUrl),
      fetch(foldersUrl)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e))
          
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
    console.log(this.state.notes)
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/folders/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        )}
        <Route
          path='/notes/:noteId'
          component={NotePageNav}
        />
        <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folders/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        )}
        <Route
          path='/notes/:noteId'
          component={NotePageMain}
        />
        <Route
          path='/add-folder'
          render = {() => <AddFolder handleAddFolder={this.handleAddFolder} />}
        />
        <Route
          path='/add-note'
          render ={() => <AddNote handleAddNote={this.handleAddNote} />}
        />
      </>
    )
  }

  render() {
    console.log(this.state.notes)
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
    }
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <nav className='App__nav'>
            {this.renderNavRoutes()}
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>
              {' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <main className='App__main'>
            {this.renderMainRoutes()}
          </main>
        </div>
      </ApiContext.Provider>
    )
  }
}

export default App
