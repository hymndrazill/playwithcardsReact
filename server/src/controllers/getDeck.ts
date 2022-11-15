import { Request, Response } from 'express';
import Deck from '../models/Deck';

export async function getDeck(req:Request,res:Response){
    const {deckId} = req.params
    const deck = await Deck.findById(deckId);
    res.status(200).json(deck);
}