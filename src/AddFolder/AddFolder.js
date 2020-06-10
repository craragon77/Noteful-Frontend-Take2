import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddFolder.css'

export default class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    const folder = {
      id:'',
      name: e.target['folder-name'].value
    }
    if (!folder.name){
      alert('please enter a for the folder')
    } else {
        fetch(process.env.REACT_APP_API_FOLDERS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': process.env.REACT_APP_API_KEY,
          'content-type': 'application/json'
        },
        body: JSON.stringify(folder),
      })
        .then(res => {
          if (!res.ok)
            return res.then(e => Promise.reject(e))
          return res
        })
        .then(() => {  
          this.props.handleAddFolder(folder)
          console.log(folder)
          console.log('the second then activated!')
          //this.context.addFolder(folder)
          //this.props.history.push('/')
          })
        .catch(error => {
          console.error({ error })
        })
    }
  }
  
    
  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' name='folder-name'/>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
