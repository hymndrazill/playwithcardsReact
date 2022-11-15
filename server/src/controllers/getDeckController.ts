import { Request, Response } from 'express';
import Deck from '../models/Deck';

export async function getDecks(req:Request,res:Response){
    const decks = await Deck.find();
    res.status(200).json(decks);
}