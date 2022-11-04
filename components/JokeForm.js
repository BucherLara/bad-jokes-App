export default function JokeForm({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    //formData.append('categories', {"data.categories"})

    formData.getAll("categories");

    onSubmit(data);
    event.target.reset();
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Text:</label>
      <input id="text-input" type="text" name="text" />
      <label htmlFor="author-input">Author:</label>
      <input id="author-input" type="text" name="author" />
      <label htmlFor="categories-input">Categories:</label>
      <input type="text" name="categories" id="categorie-input" />
      <button type="submit">Submit</button>
    </form>
  );
}

//"categories": ["Animals"]
