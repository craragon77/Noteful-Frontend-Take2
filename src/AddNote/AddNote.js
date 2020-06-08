import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'

export default class AddNote extends Component {
  constructor(props){
    super(props)
    //this.state = {value: ''};
    //this.handleChange = this.handleChange.bind(this)
  }
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    const newNote = {
      title: e.target['note-title'].value,
      content: e.target['note-content'].value,
      folder_id: e.target['note-folder-id'].value,
      date: new Date(),
    }
    fetch(process.env.REACT_APP_API_NOTES_ENDPOINT, {
      method: 'POST',
      headers: {
        'authorization': process.env.REACT_APP_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        //this.context.addNote(note)
        this.props.history.push(`/`)
        this.handleSubmit(note)
      })
      .catch(error => {
        console.error({ error })
      })
  }
  /*handleChange = e => {
    this.setState({[e.target.getAttribute('name')]: e.target.value})
    } */

  render() {
    const { folders=[] } = this.context
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note-title-input'>
              Name
            </label>
            <input type='text' id='note-title-input' name='note-title'/>
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' name='note-content'/>
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' name='note-folder-id'>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
