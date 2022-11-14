import mongoose, { mongo } from "mongoose";


const Schmea = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;


const DeckSchema = new Schmea({
    title: String,
    
})


const DeckModel = mongoose.model("Deck",DeckSchema)

export default DeckModel;
