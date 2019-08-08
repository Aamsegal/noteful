import React from 'react'
import ApiContext from '../ApiContext'
import config from '../config'



export default class AddNote extends React.Component {
    static defaultProps ={
        onAddNote: () => this.props.history.push('/')
      }

      noteID() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10); 
      }

      static contextType = ApiContext;

      handleAddNote = noteId => {
        this.props.history.push('/')
      }

      handleSubmit = e => {
        e.preventDefault()
        const folderId = this.props.match.params.folderId
        console.log(this.props)
        // get the form fields from the event
        const {name, content, modified, id} = e.target
        const noteId = this.noteID()
        const date = Date.now()
        const note = {
            id: noteId.value,
            name: name.value,
            modified: date,
            folderId: folderId,
            content: content.value
        }
        this.setState({ error: null })

        fetch(`${config.API_ENDPOINT}/notes`, {
          method: 'POST',
          body: JSON.stringify(note),
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(data => {
            id = note.noteId
            name = note.name
            modified = note.modified
            content = note.content
            //modified = ''
            //folderId.value = ''
            this.context.addNote(data)
          })
          .catch(error => {
            this.setState({ error })
          })
      }
    

    render() {
       return(
        <form onSubmit = {this.handleSubmit}>
            <input 
            type='text'
            name='name'
            id='name'
            required />

            <input 
            type='text'
            name='content'
            id='content'
            required />
            <button>Submit</button>
        </form> 
       ) 
    }
}
