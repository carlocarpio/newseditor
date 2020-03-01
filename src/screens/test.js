import React from 'react';
import SunEditor, { buttonList } from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'

import firebase from "./components/Firestore"

const test = '<table style="width: 100%;"><tbody><tr>	<td><span style="font-size: 24px;">This is a test</span></td>	<td><span style="font-size: 16px; font-family: &quot;Times New Roman&quot;, Times, serif;">this is a small header</span></td>	<td><ul><li>asasasasas</li><li>asasasas</li><li>werwrererer<br></li></ul></td>	<td><br></td>	<td><br></td>	<td><br></td></tr><tr>	<td><br></td>	<td><br></td>	<td><br></td>	<td><br></td>	<td><br></td>	<td><br></td></tr><tr>	<td><br></td>	<td><br></td>	<td><br></td>	<td><br></td>	<td><br></td>	<td><br></td></tr></tbody></table>'

function App () {

  const [details, setDetails] = React.useState({
    title: "aaaa",
    excerpt: "",
    url: "",
    tags: "",
    content: ""
  })
  const [testData, settestData] = React.useState({})
  const [listMode, setlistMode] = React.useState(2)
  const [doc, setdoc] = React.useState()
  const [activeId, setactiveId] = React.useState("")

  const handleContent = async (details) => {
    console.log(details)
    const db = firebase.firestore()
    db.settings({
      timestampsInSnapshots: true
    })

    await activeId === "" ? (
      db.collection("News").add({
        title: details.title,
        excerpt: details.excerpt,
        url: details.url,
        tags: details.tags,
        content: details.content
      })
    ) : (
      db.collection("News").doc(activeId).update({
        title: details.title,
        excerpt: details.excerpt,
        url: details.url,
        tags: details.tags,
        content: details.content
      })
    ).then(() => window.location.reload(true))
  }

  const getItems = async () => {
    const test = await firebase.firestore().collection('News').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    })
  }

  React.useEffect(() => {
    getItems()
  }, [])

  return (
    <div className="container mx-auto">
      <div className="mb-10">
        <button onClick={() => setlistMode(listMode === 1 ? 2 : 1)}>View Mode {activeId}</button>
      </div>
      {listMode === 1 &&
        <div>
          <form class="w-full">
            <div class="w-full px-3 mb-6">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Title
            </label>
              <input value={details.title} onChange={(e) => setDetails({ ...details, title: e.target.value })} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" />
            </div>
            <div class="w-full px-3 mb-6">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Excerpt
            </label>
              <input value={details.excerpt} onChange={(e) => setDetails({ ...details, excerpt: e.target.value })} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" />
            </div>
            <div class="w-full px-3 mb-6">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Tags
            </label>
              <input value={details.tags} onChange={(e) => setDetails({ ...details, tags: e.target.value })} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" />
            </div>

            <div class="w-full px-3 mb-6">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                URL
            </label>
              <input value={details.url} onChange={(e) => setDetails({ ...details, url: e.target.value })} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" />
            </div>

            <div class="w-full px-3 mb-6">
              <SunEditor
                setContents={details.content}
                setOptions={{
                  height: 200,
                  buttonList: [['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
                  ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
                  ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
                  ['link', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save']]
                }}
                onChange={(e) => setDetails({ ...details, content: e })}
              />
            </div>

            <div class="md:flex md:justify-end w-full px-3 mb-6">
              <button onClick={() => handleContent(details)} class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Submit
              </button>
            </div>
          </form>
        </div>
      }

      {listMode === 2 && (
        <div className="test">
          <table >
            <thead>
              <tr>
                <th class="px-4 py-2">Title</th>
                <th class="px-4 py-2">action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(testData).map(item => (
                <tr className={testData[item].id}>
                  <td class="border px-4 py-2">{testData[item].data().title}</td>
                  <td class="border px-4 py-2"><div onClick={() => selectItem(testData[item].id)}>Edit</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
