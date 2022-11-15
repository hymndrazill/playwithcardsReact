const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Deck from './models/Deck';
import cors from "cors";
const app = express();
app.use(cors({
    origin: "*"
}));
app.use(express.json());

const port = 5000;

app.get('/decks',async (req:Request,res:Response)=>{
    const decks = await Deck.find();
    res.status(200).json(decks);
})


app.post('/decks', async (req: Request, res: Response) => {
    const newDeck = new Deck({
        title: req.body.title,
    });
   const createdDeck =  await newDeck.save();
    res.json(createdDeck);
});
app.delete('/decks/:deckId', async (req: Request, res: Response) => {
    const deckId = req.params.deckId;
    await Deck.findByIdAndDelete(deckId);
    res.json({
        message: 'successfully deleted the deck'
    })
});


 mongoose.connect(
    process.env.MONGO_URL!).then(()=>{
    console.log(`listening on port ${port}`);
    app.listen(port);

  })

