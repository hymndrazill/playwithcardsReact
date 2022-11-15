import React, { useEffect, useState } from 'react'
import { createdDeck } from './api/createDeck';
// import { TDeck } from './api/getDecks';
import { useParams } from 'react-router-dom';
import { createCard } from './api/createCard';
import { getDeck } from './api/getDeck';
import { TDeck } from './api/getDecks';
import { deleteCard } from './api/deleteCard';

const Deck = () => {
  const [text, setText] = useState('');
  const [deck,setDeck] = useState<TDeck | undefined>()
  const [cards,setCards]= useState<string[]>([]);
  const  { deckId } = useParams();

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    const {cards: serverCards} = await createCard(deckId!,text)
    setCards(serverCards);
    setText("");
  }
  async function handleDeleteCard(index:number){
    if(!deckId)return;
   const newDeck = await deleteCard(deckId,index)
    setCards(newDeck.cards);
    // setDecks(decks.filter(deck=>deck._id !==deckId))
  }
  // }

  useEffect(()=>{
    async function fetchDeck(){
      if(!deckId)return;
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards);
    }
    fetchDeck();
  },[deckId]);



  return (
    <div className="App">
      <div className="decks">
        {cards?.map((card,index)=>(
          <li key={index}>          
            <button onClick={()=>handleDeleteCard(index)}>X</button>
          {card}
          </li>
        ))}
      </div>
     <form onSubmit={handleSubmit}>
        <label htmlFor='card-text'>card Text</label>
        <input id="card-text" type="text" placeholder='Card Text'
        value={text}
        onChange={(e: React.ChangeEvent <HTMLInputElement> )=> setText(e.target.value)}
        />
        <button>Create Card</button>
     </form>
    </div>
  )
}

export default Deck
