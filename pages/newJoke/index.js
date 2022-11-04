import { REACT_LOADABLE_MANIFEST } from "next/dist/shared/lib/constants";
import { useState } from "react";
import JokeForm from "../../components/JokeForm";

function NewJokePage() {
  const [error, setError] = useState(false);

  async function sendJoke(joke) {
    const response = await fetch("/api/jokes", {
      method: "POST",
      body: JSON.stringify(joke),
    });
    if (response.status !== 201) {
      setError(true);
    }
  }
  return (
    <>
      <h1>Add new Jokes</h1>
      {error && <h2>OH NO, ERROR</h2>}
      <JokeForm onSubmit={sendJoke}></JokeForm>
    </>
  );
}

export default NewJokePage;
