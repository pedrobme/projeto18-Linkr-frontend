import axios from "axios";

export default async function deletePost(postId) {
  console.log(postId);

  try {
    const response = await axios.delete(
      `http://localhost:4000/timeline/${postId}`
    );

    console.log(response);

    window.location.reload(false);
  } catch (err) {
    console.log(err);
  }
}
