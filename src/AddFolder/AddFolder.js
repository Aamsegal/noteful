import React from 'react'
import ApiContext from '../ApiContext'
import NotePageNave from '../NotePageMain/NotePageMain'
import config from '../config'



export default class AddFolder extends React.Component {
    static defaultProps ={
        addFolder: () => {},
        history: {
            goBack: () => { }
          },
          match: {
            params: {}
          }
      }

      folderID() {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10); 
      }

      static contextType = ApiContext;

      handleAddNote = () => {
        this.props.history.push('/')
      }

      handleSubmit = e => {
        e.preventDefault()
        // get the form fields from the event
        const {name} = e.target
        const id = this.folderID()
        const folder = {
          id,
          name: name.value}
        console.log(folder)
        this.setState({ error: null })

        fetch(`${config.API_ENDPOINT}/folders`, {
          method: 'POST',
          body: JSON.stringify(folder),
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
            id.value = ''
            name.value =''
            this.context.addFolder(data)
            this.handleAddNote()
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
          <button>Submit</button>
        </form> 
       ) 
    }
}
