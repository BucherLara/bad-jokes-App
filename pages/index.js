import useSWR from "swr";
import styled from "styled-components";
import Link from "next/link";

export default function Home() {
  const { data, error } = useSWR("/api/jokes", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  console.log(data);

  return (
    <div>
      <h1>Here are the bad Jokes</h1>
      {data.map((joke) => {
        return (
          <StyledSection>
            <h3>{joke.text}</h3> <p>author: {joke.author}</p>{" "}
            <p>category: {joke.categories}</p>
          </StyledSection>
        );
      })}
      <Link href={"/newJoke"}>Create funny new Jokes</Link>
    </div>
  );

  function fetcher(url) {
    return fetch(url).then((response) => response.json());
  }
}

const StyledSection = styled.section`
  padding: 10px;
  margin: 10px;
  background-color: skyblue;
  border-radius: 10px;
`;

const StyledP = styled.p`
  background-color: skyblue;
`;
