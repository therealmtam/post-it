import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Description:
 * A template component that takes in input and has its own local state.
 *
 * @prop {Object} state - Object passed in by App component.
 */
class EditNoteView extends Component {
    constructor(props) {
        super(props);

        //store the state for this component from the passed in state from the parent
        let { noteIndexToModify, noteTitle, noteBody, noteColor } = this.props.state;

        this.state = {
            noteTitle,
            noteBody,
            noteColor,
            noteIndexToModify
        };
    }

    // ----------------------------------//
    // FORM INPUT FUNCTIONS:

    updateNoteTitle(event) {
        this.setState({
            noteTitle: event.target.value
        });

        console.log('updated the event state');
    }

    updateNoteBody(event) {
        this.setState({
            noteBody: event.target.value
        });
    }

    updateNoteColor(event) {
        this.setState({
            noteColor: event.target.value
        });
    }

    render() {
        return (
            <div id="note-editor-section">
                <form id="note-editor" onSubmit={
                    () => {
                        //update the note in the parent component by passing in the params from this child component
                        this.props.updateNote(this.state.noteColor, this.state.noteTitle, this.state.noteBody);
                    }
                    }>
                    <label id="note-editor-title" >
                    Title:
                    <input
                        id="title-input-field"
                        type="text"
                        maxLength="20"
                        value={this.state.noteTitle}
                        onChange={this.updateNoteTitle.bind(this)}
                    />
                    </label>
                    <label id="note-editor-body">
                    Note:
                    <textarea
                        style={{ whiteSpace: 'pre' }}
                        value={this.state.noteBody}
                        onChange={this.updateNoteBody.bind(this)}
                    />
                    </label>
                    <label id="note-editor-color">
                    Note Color:
                    <select
                        id="color-selector"
                        onChange={this.updateNoteColor.bind(this)}
                    >
                        <option value={this.state.noteColor} selected>Select</option>
                        <option value="rgb(250, 169, 176)">Red</option>
                        <option value="rgb(251, 219, 174)">Mango</option>
                        <option value="rgb(181, 236, 209)">Lime</option>
                        <option value="rgb(86, 182, 191)">Ocean</option>
                    </select>
                    </label>
                    <input id="submit-button" type="submit" value="Update" />
                </form>
            </div>
        );
    }
}

EditNoteView.propTypes = {
    updateNote: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
};

export default EditNoteView;
