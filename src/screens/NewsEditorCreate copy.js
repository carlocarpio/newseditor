import React from "react"
import { Link, withRouter } from "react-router-dom"
import SunEditor, { buttonList } from 'suneditor-react'
import moment from "moment"
import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css';
import 'suneditor/dist/css/suneditor.min.css'

import firebase from "../components/Firestore"

const NewsEditor = (props) => {
  const [details, setDetails] = React.useState({})
  const [contentValue, setcontentValue] = React.useState("")
  const [datePicker, showDatePicker] = React.useState(false)

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
              onBlur={() => console.log('blur')}
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
            <SunEditor
              setContents={contentValue}
              setOptions={{
                height: 600,
                buttonList: [['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
                ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
                ['link', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save']]
              }}
              onChange={(e) => setcontentValue(e)}
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