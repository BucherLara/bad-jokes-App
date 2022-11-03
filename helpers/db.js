import mongoose, { Schema, model, models } from "mongoose";

const URI = `mongodb+srv://bad-jokes:${process.env.MONGODB_PASSWORD}@cluster0.n66auxt.mongodb.net/?retryWrites=true&w=majority`;

const jokeShema = new Schema({
  id: String,
  text: String,
  author: String,
  categories: [String],
});

const Joke = models.Joke || model("Joke", jokeShema);

async function connectDatabase() {
  await mongoose.connect(URI);
}

async function getAllJokes() {
  await connectDatabase();
  const jokes = await Joke.find({}, { _id: false });
  return jokes;
}
export { getAllJokes };
