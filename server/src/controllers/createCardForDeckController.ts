import Deck from "../models/Deck"
import { Request,Response } from "express";

export async function createCardForDeck (req: Request, res: Response){
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);
    const {text} = req.body;
    if(!deck) return res.status(400).json("no deck found");
    deck.cards.push(text);
    await deck.save();
       
        res.json(deck);
}