import axios from "axios";

export const getUserInfo = async () => {
  try {
    const response = await axios.get("http://localhost:5001/timeline/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    console.log(response.data[0]);

    return response.data[0];
  } catch (err) {
    console.log(err);
  }
};
