import React from 'react';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

// Include special components if required.
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

class EditorComponent extends React.Component {
  constructor () {
    super();

    this.handleModelChange = this.handleModelChange.bind(this);

    this.state = {
      model: 'Example text'
    };
  }

  handleModelChange = (model) => {
    this.setState({
      model: model
    });
  }

  render () {
    return (
      <>
        <div className="m-10" >
          <FroalaEditor
            model={this.state.model}
            onModelChange={this.handleModelChange}
          />
        </div>
      
        <div className="m-5">
          <h1>Content Preview</h1>
        </div>
        <hr />
        <div className="m-5">
            <FroalaEditorView  model={this.state.model}/>
        </div>
      </>
    )
  }
}

export default EditorComponent