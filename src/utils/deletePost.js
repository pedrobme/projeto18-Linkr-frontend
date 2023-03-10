import axios from "axios";

export default async function deletePost(postId) {
  console.log(postId);

  try {
    const response = await axios.delete(
      `https://linker-api-4331.onrender.com/timeline/${postId}`
    );

    console.log(response);

    window.location.reload(false);
  } catch (err) {
    console.log(err);
  }
}
