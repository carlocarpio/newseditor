import React from "react"
import { Link, withRouter } from "react-router-dom"
// import SunEditor, { buttonList } from 'suneditor-react'
import moment from "moment"
import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css';
// import 'suneditor/dist/css/suneditor.min.css'

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


import firebase from "../components/Firestore"

const NewsEditor = (props) => {
  const [details, setDetails] = React.useState({})
  const [contentValue, setcontentValue] = React.useState("")
  const [datePicker, showDatePicker] = React.useState(false)
  const [model, setmodel] = React.useState("")

  const handleContent = (details) => {
    const db = firebase.firestore()

    db.collection("NewsPost").add({ 
      title: details.title,
      excerpt: details.excerpt,
      url: details.url,
      tags: details.tags,
      date: moment(details.date).format("MM-DD-YYYY"),
      content: contentValue
    }).then(() => window.location.reload(true))
  }

  const handleModelChange = (e) => {
    setcontentValue(e)
  }

  return (

    <div className="container mx-auto py-10">
      <div className="flex justify-between">
        <div className="py-10"><h2 className="text-4xl">Create News</h2></div>
        <div className="py-10">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-5 rounded">
            <Link to="/">
              View All
              </Link>
          </button>
        </div>
      </div>
      <div>
        <form className="w-full">
          <div className="w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Title
            </label>
            <input value={details.title} onChange={(e) => setDetails({ ...details, title: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" />
          </div>
          <div className="w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              PUBLICATION DATE
            </label>
            {/* <input value={details.url} onChange={(e) => setDetails({ ...details, date: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" /> */}
            <SingleDatePicker
              date={details.date}
              focused={datePicker}
              id="single_date_picker"
              numberOfMonths={1}
              onFocusChange={() => showDatePicker(!datePicker)}
              onDateChange={(e) => setDetails({ ...details, date: e })}
              displayFormat="DD-MM-YYYY"
              required
              />
          </div>
          <div className="w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Excerpt
            </label>
            <input value={details.excerpt} onChange={(e) => setDetails({ ...details, excerpt: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" />
          </div>
          
          <div className="w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Tags
            </label>
            <input value={details.tags} onChange={(e) => setDetails({ ...details, tags: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" />
          </div>

          <div className="w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              URL
            </label>
            <input value={details.url} onChange={(e) => setDetails({ ...details, url: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" />
          </div>

          <div className="w-full px-3 mb-6">
            <FroalaEditor
              model={contentValue}
              onModelChange={handleModelChange}
              config={{
                key:"iE2C2I2A4A4C1tA1A1A1F1H4A1A1B1C7A5oH-9zxuycowG3C-8qr=="
              }}
            />
          </div>
          <div className="md:flex md:justify-end w-full px-3 mb-6">
            <button onClick={() => handleContent(details)} className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>


  )
}

export default withRouter(NewsEditor)