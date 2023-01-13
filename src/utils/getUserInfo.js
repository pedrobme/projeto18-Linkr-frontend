import axios from "axios";

export const getUserInfo = async () => {
  try {
    const response = await axios.get("https://linker-api-4331.onrender.com/timeline/me", {
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
