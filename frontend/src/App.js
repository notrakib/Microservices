function App() {
  const GetPosts = async () => {
    const response = await fetch("http://posts.com/posts");
    const data = await response.json();
    console.log(data);
  };

  const SendPosts = async () => {
    await fetch("http://posts.com/send-posts", {
      method: "POST",
      body: JSON.stringify({ title: "First Post" }),
    });
  };

  const GetComments = async () => {
    const response = await fetch("http://posts.com/posts/id/comments");
    console.log(response);
    const data = await response.json();
    console.log(data);
  };

  const SendComments = async () => {
    await fetch("http://posts.com/send-posts/id/comments", {
      method: "POST",
      body: JSON.stringify({ comment: "First Comment" }),
    });
  };

  return (
    <>
      <h1>Posts</h1>
      <button onClick={GetPosts}>Get Posts</button>
      <button onClick={SendPosts}>Send Posts</button>
      <button onClick={GetComments}>Get Comments</button>
      <button onClick={SendComments}>Send Comments</button>
    </>
  );
}

export default App;
