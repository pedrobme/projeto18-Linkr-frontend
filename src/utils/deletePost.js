import axios from "axios";
import env from "react-dotenv";

export default async function deletePost(postId) {
  console.log(postId);

  try {
    const response = await axios.delete(
      `http://localhost:${env.PORT}/timeline/${postId}`
    );

    console.log(response);

    window.location.reload(false);
  } catch (err) {
    console.log(err);
  }
}
