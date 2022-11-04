import useSWR from "swr";

import JokeForm from "../../../../../components/JokeForm";
import { fetcher } from "../../../../index";

const { useRouter } = require("next/router");

function EditJokeDetailsPage() {
  const { query } = useRouter();
  const { id } = query;

  const { data, mutate } = useSWR(`/api//${id}`, fetcher);

  function handleSubmit(joke) {
    //hier kommt ein fetch `PATCH`
    fetch(`/api/jokes/${id}`, {
      method: "PATCH",
      body: JSON.stringify(joke),
    });
    mutate();
  }

  function handleDelete() {
    fetch(`/api/jokes/${id}`, {
      method: "DELETE",
    });
  }

  if (!data) return "loading...";
  return (
    <>
      <h1>{data?.name}</h1>
      <JokeForm onSubmit={handleSubmit} />
      <button onClick={handleDelete}>DELETE</button>
    </>
  );
}

export default EditJokeDetailsPage;
