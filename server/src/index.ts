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
    'mongodb+srv://push3:push3@cluster0.yoh5c.mongodb.net/?retryWrites=true&w=majority'
  ).then(()=>{
    console.log("listening on port "+port);
    app.listen(port);

  })

