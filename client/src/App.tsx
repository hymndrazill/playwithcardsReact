import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Link } from 'react-router-dom';
import { createdDeck } from './api/createDeck';
import { deleteDeck } from './api/deleteDeck';
import { getDecks, TDeck } from './api/getDecks';


function App() {
  const [title, setTitle] = useState('');
  const [decks,setDecks]= useState<TDeck[]>([]);

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    const deck = await createdDeck(title)
    setDecks([...decks, deck])
    setTitle("");
  }
  async function handleDeleteDeck(deckId: string){
    deleteDeck(deckId)
    setDecks(decks.filter(deck=>deck._id !==deckId))
    
  }

  useEffect(()=>{
    async function fetchDecks(){
      
      const newDecks = await getDecks();
      setDecks(newDecks);
    }
  
    fetchDecks();
    return () => {
      console.log("were are done clean up");
    }
  },[]);



  return (
    <div className="App">
      <div className="decks">
        {decks?.map((deck)=>(
          <li key={deck._id}>          
            <button onClick={()=>handleDeleteDeck(deck._id)}>X</button>
            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
          </li>
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
