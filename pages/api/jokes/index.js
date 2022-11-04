import db from "../../../db.json";
import { createJoke } from "../../../helpers/db";
//hier Endpoint
import { getAllJokes } from "../../../helpers/db";

export default async function handler(request, response) {
  console.log(request.method);
  if (request.method === "GET") {
    const jokes = await getAllJokes();
    response.status(200).json(jokes);
  } else if (request.method == "POST") {
    const joke = JSON.parse(request.body);
    console.log(joke);
    const createdJoke = await createJoke(joke);
    response.status(201).json(createdJoke);
  } else {
    response.status(405).setHeader("Allow", ["GET", "POST"]).send("");
  }
}
