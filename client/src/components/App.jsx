import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditNoteView from './EditNoteView.jsx';

/**
 * Description:
 * App component renders all views for the application.
 * Its State holds all data and disseminates it to all
 * React sub-components.
 *
 * @prop - none.
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      notes: [{
        title: 'Welcome!',
        body: 'Try out this post-it app',
        color: 'rgb(250, 169, 176)',
      }],
      noteColor: '',
      noteTitle: '',
      noteBody: '',
      noteIndexToModify: null,
    };
  }

  // ----------------------------------//
  // ADD / EDIT / DELETE FUNCTIONS:

  deleteNote(noteIndex) {
    const updatedNotes = this.state.notes;
    updatedNotes.splice(noteIndex, 1);

    this.setState({
      notes: updatedNotes,
    });
  }

  editNote(noteIndex) {
    this.setState({
      view: 'editNote',
      noteColor: this.state.notes[noteIndex].color,
      noteTitle: this.state.notes[noteIndex].title,
      noteBody: this.state.notes[noteIndex].body,
      noteIndexToModify: noteIndex,
    });
  }

  updateNote(noteColor, noteTitle, noteBody) {
    const updatedNote = {
      color: noteColor || 'rgb(250, 169, 176)',
      title: noteTitle || '(add a title)',
      body: noteBody || '(add a note)',
    };

    const revisedNotes = this.state.notes;
    revisedNotes[this.state.noteIndexToModify] = updatedNote;

    this.setState({
      view: 'home',
      notes: revisedNotes,
      noteColor: '',
      noteTitle: '',
      noteBody: '',
    });
  }

  addNewNote() {
    const newNote = {
      color: 'rgb(250, 169, 176)',
      title: '(add a title)',
      body: '(add a note)',
    };

    this.setState({
      notes: [...this.state.notes, newNote],
    });
  }

  // ----------------------------------//
  renderView() {
    if (this.state.view === 'home') {
      return (
        <main>
          {
            this.state.notes.map((note, index) => (
              <div className="post-it" key={index}>
                <div
                  id="note-color"
                  style={{ backgroundColor: `${note.color}` }}
                />
                <div id="note-header">
                  <h2 id="note-title">{note.title}</h2>
                  <div id="note-buttons">
                    <img
                      className="icons"
                      src="pencil_icon.png"
                      alt=""
                      onClick={() => { this.editNote(index); }}
                    />
                    <img
                      className="icons"
                      src="trash_icon.png"
                      alt=""
                      onClick={() => { this.deleteNote(index); }}
                    />
                  </div>
                </div>
                <div id="note-body">
                  <p id="note-text">
                    {note.body}
                  </p>
                </div>
              </div>
           ))
          }
        </main>
      );
    } else if (this.state.view === 'editNote') {
      return (
        < EditNoteView
            state={this.state}
            updateNote={this.updateNote.bind(this)}
        />
      );
    }
  }

  // ----------------------------------//

  render() {
    return (
      <div id="page" >
        <header>
          <div id="left-spacer" />
          <h1 id="page-title" >Post-It</h1>
          <div id="right-spacer">
            {
                (() => (
                    this.state.view === 'home' ? <input
                    id="btn-add-note"
                    type="button"
                    value="+      Add Note"
                    onClick={this.addNewNote.bind(this)}
                    /> : <div />
                ))()
            }
          </div>
        </header>
        {this.renderView()}
      </div>
    );
  }
}

App.propTypes = {
};

export default App;

