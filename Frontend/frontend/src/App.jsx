
import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  
  const [notes, setNotes] = useState([])
 

  function fetchNotes(){
         axios.get('https://first-q14z.onrender.com/api/notes')
.then((res)=>{
  setNotes(res.data.notes) 
})
  }

  useEffect(()=>{
      fetchNotes()
  },[])

  
  

  function submithandler(e){
    e.preventDefault()

    const {title,description} = e.target.elements
    console.log(title.value,description.value);

    axios.post("https://first-q14z.onrender.com/api/notes",{
      title: title.value,
      description: description.value
    }).then(res=>{
      console.log(res.data);
      fetchNotes()
    })
    
  }

  function deletehandler(noteId){
    axios.delete("https://first-q14z.onrender.com/api/notes/"+noteId)
    .then(res=>{
      console.log(res.data);
      fetchNotes()
    })
    
  }

  function handleUpdateNote(noteId){
    const newDescription = prompt("enter new description")
    axios.patch("https://first-q14z.onrender.com/api/notes/"+noteId,
    {description: newDescription}).then((res)=>{
      console.log(res.data);
      fetchNotes();
      
    })
  }

 
  



  return (
    <>
     <form className='note-create-form' onSubmit={submithandler}>
      <input  name='title' type="text" placeholder='Enter title'
     
      />
      <input  name='description'   type="text" placeholder='Enter description' 
  
      
      />
      <button>create</button>
     </form>


     <div className="notes">
     {notes.map(note=>{
      return  <div className="note">
        <h1>{note.title}</h1>
        <p>{note.description}</p>
        <button onClick={()=>{deletehandler(note._id)}}>delete</button>
       <button onClick={()=>{
        handleUpdateNote(note._id)
       }}>Update</button>
      </div>
     })}
     </div>
    </>
  )
}

export default App
    