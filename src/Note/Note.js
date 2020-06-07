import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import './Note.css'

export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const id = this.props.id

    fetch(process.env.REACT_APP_API_ENDPOINT + `/api/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'authorization': process.env.REACT_APP_API_KEY,
        'content-type': 'body/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.then(e => Promise.reject(e))
        return res
      })
      .then(() => {
        this.context.deleteNote(id)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(id)
      })
      .catch(error => {
        console.error({error})
      })
  }

  render() {
    const { title, id, date } = this.props
    
    console.log(id)
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {title}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
            {format(date, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
