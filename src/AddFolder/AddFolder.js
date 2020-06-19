import React from 'react'
import ApiContext from '../ApiContext'
import NotePageNave from '../NotePageMain/NotePageMain'
import config from '../config'



export default class AddFolder extends React.Component {
    state = {
      name: ''
    }

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

      handleSubmit = async (e) => {
        e.preventDefault()
        // get the form fields from the event
        const id = this.folderID()
        const folder = {
          id,
          title: this.state.name}
        this.setState({ error: null })

        try {
          const res = await fetch(`${config.API_ENDPOINT}/api/folders`, {
            method: 'POST',
            body: JSON.stringify(folder),
            headers: {
              'content-type': 'application/json'
            }
          })
          if (!res.ok) {
            return res.json().then(e => Promise.reject(e))
          }
          const dataJson = await res.json()
          this.context.addFolder(dataJson)
          this.props.history.push('/')
        
        } catch (e) {
          this.setState({ error: e })
        }        
      }

    render() {
       return(
        <form onSubmit = {this.handleSubmit}>
          <label for = "name">Folder Name</label>
          <input 
          type='text'
          name='name'
          id='name'
          placeholder="Folder Name"
          value={this.state.name}
          onChange={(e) => this.setState({name: e.currentTarget.value})}
          required />
          <button type='submit'>Submit</button>
        </form> 
       ) 
    }
}
