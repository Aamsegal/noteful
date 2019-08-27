import React from 'react'
import ApiContext from '../ApiContext'
import config from '../config'



export default class AddNote extends React.Component {
    state = {
        name: '',
        content: ''
    }

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
        let name = this.state.name
        let content = this.state.content
        const noteId = this.noteID()
        const date = Date.now()
        console.log(e.target)
        const note = {
            id: noteId,
            name: name,
            modified: date,
            folderId: folderId,
            content: content
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
            //folderId = note.folderId
            console.log(data)
            this.context.addNote(data)
            this.props.history.push('/')
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
            value={this.state.name}
            onChange= {(e) => this.setState({name: e.currentTarget.value})}
            required />

            <input 
            type='text'
            name='content'
            id='content'
            value={this.state.content}
            onChange= {(e) => this.setState({content: e.currentTarget.value})}
            required />
            <button>Submit</button>
        </form> 
       ) 
    }
}
