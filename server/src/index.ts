const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Deck from './models/Deck';

const app = express();

app.use(express.json());

const port = 5000;
app.post('/decks', async (req: Request, res: Response) => {
    const newDeck = new Deck({
        title: req.body.title,
    });
   const createdDeck =  await newDeck.save();
    res.json(createdDeck);
});

 mongoose.connect(
    process.env.MONGO_URL!).then(()=>{
    console.log(`listening on port ${port}`);
    app.listen(port);

  })

