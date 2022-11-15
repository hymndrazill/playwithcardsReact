import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

type TDeck = {
  title: string,
  _id:string;
}

function App() {
  const [title, setTitle] = useState('');
  const [decks,setDecks]= useState<TDeck[]>([]);

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
   await fetch("http://localhost:5000/decks", {
     
      method: "POST",
      body: JSON.stringify({
        title
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
    setTitle("");
  }


  useEffect(()=>{
    async function fechDecks(){
      const response = await fetch("http://localhost:5000/decks");
      const newDecks = await response.json();
      setDecks(newDecks);
    }
  
    fechDecks();
    return () => {
      console.log("were are done clean up");
    }
  },[]);

  return (
    <div className="App">
      <div className="decks">
        {decks?.map((deck)=>(
          <li key={deck._id}>{deck.title}</li>
        ))}
      </div>
     <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Deck Title</label>
        <input id="title" type="text" placeholder='Deck Title'
        value={title}
        onChange={(e: React.ChangeEvent <HTMLInputElement> )=> setTitle(e.target.value)}
        />
        <button>Create Deck</button>
     </form>
    </div>
  )
}

export default App
