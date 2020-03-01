import React from "react"
import { Link } from "react-router-dom"
 
import firebase from "../components/Firestore"

const NewsList = () => {
  const [testData, settestData] = React.useState({})

  const getItems = async () => {
    const data = await firebase.firestore().collection('NewsPost').get().then(function (querySnapshot) {
      settestData(querySnapshot.docs)
    })
    return data
  }

  const deleteItem = (id) => {
    console.log(id)
    firebase.firestore().collection('NewsPost').doc(id).delete().then(() => window.location.reload(true))
  }
  
  React.useEffect(() => {
    getItems()
  }, [])

  const LinkItem = ({item, id}) => {
    const [activeConfirm, setactiveConfirm] = React.useState(false)
    return (
      <>
      <div className="relative">
        <div class="max-w-sm rounded overflow-hidden shadow-lg relative w-full h-full">
          <Link to={`news-editor/${item.url}`} className="mx-4 w-full h-full">
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">{item.title}</div>
              <p class="text-gray-700 text-base">
                {item.excerpt}
              </p>
              
            </div>
          </Link>
          <div className="p-3">
            <button class="bg-red text-gray-800 py-2 px-4 border border-gray-400 rounded shadow" onClick={() => setactiveConfirm(true)}>
                Delete
            </button>
          </div>
        </div>

        {activeConfirm &&
          <div>
            <div className="card-confirm absolute top-0 bottom-0 left-0 right-0 flex flex-col item-center justify-center p-10">
              <div className="mb-5">Are you sure?</div>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                onClick={() => deleteItem(id)}
              >
                Yes
            </button>
            <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => setactiveConfirm(false)}
            >
                No
            </button>
            </div>
            </div>}
        </div>
      </>
    )
  }


  return (
    <div>
      
      <div class="container mx-auto py-10">
        <div className="flex justify-between">
          <div className="py-10"><h2 className="text-4xl">News List</h2></div>
          <div className="py-10">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Link to="/news-editor">
              + Create New
              </Link>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap">
          {Object.keys(testData).map(item => {
            return (
              <div className="news-card mr-3 mb-3">
                <LinkItem item={testData[item].data()} id={testData[item].id} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
    
  )
}

export default NewsList