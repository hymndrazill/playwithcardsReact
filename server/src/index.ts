const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Deck from './models/Deck';
import cors from "cors";
import { getDecks } from './controllers/getDeckController';
import { createDecks } from './controllers/createDeckController';
import { deleteDeck } from './controllers/deleteDeckController';
const app = express();
app.use(cors({
    origin: "*"
}));
app.use(express.json());

const port = 5000;

app.get('/decks',getDecks)


app.post('/decks', createDecks);
app.delete('/decks/:deckId',deleteDeck);


 mongoose.connect(
    process.env.MONGO_URL!).then(()=>{
    console.log(`listening on port ${port}`);
    app.listen(port);

  })

