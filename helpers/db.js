import mongoose, { Schema, model, models } from "mongoose";
import crypto from "crypto";

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
  const jokes = await Joke.find({}, { _id: false, __v: false });
  return jokes;
}

async function getJokeById(id) {
  await connectDatabase();

  const joke = await Joke.findOne({ id }, { _id: false, __v: false });
  return joke;
}

async function deleteJokeById(id) {
  await connectDatabase();

  const joke = await getJokeById(id);
  await Joke.deleteOne({ id });
  return joke;
}
async function updateJokeById(id, joke) {
  await connectDatabase();

  await Joke.updateOne({ id }, joke);
  const updatedJoke = await getProductById(id);
  return updatedJoke;
}

async function createJoke(joke) {
  await connectDatabase();

  const createdJoke = await Joke.create({ ...joke, id: crypto.randomUUID() });

  return {
    ...createdJoke.toObject(),
    _id: undefined,
    __v: undefined,
  };
}

export { getAllJokes, createJoke, getJokeById, deleteJokeById, updateJokeById };
