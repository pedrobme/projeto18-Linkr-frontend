import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import { LoginContext } from "../auth";
import env from "react-dotenv";

const CreatePost = () => {
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const authToken = localStorage.getItem("authToken");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const publishPostObject = {
      text: text,
      url: link,
    };

    console.log(authToken);

    console.log(publishPostObject);

    try {
      const response = await axios.post(
        `http://localhost:${env.PORT}/publish`,
        publishPostObject,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      window.location.reload(false);

      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <CreatePostBackground>
      <LeftPannel>
        <img src="https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-732x549-thumbnail-732x549.jpg" />
      </LeftPannel>
      <MainContentForm onSubmit={handleSubmit}>
        <h3>What are you going o share today?</h3>
        <input
          onChange={(event) => setLink(event.target.value)}
          placeholder="Link: http://..."
        ></input>
        <input
          onChange={(event) => setText(event.target.value)}
          placeholder="Type details about your post (optional)"
        ></input>
        <ButtonPhantom></ButtonPhantom>
        <button type="submit">Publicar</button>
      </MainContentForm>
    </CreatePostBackground>
  );
};

// Styled components

const CreatePostBackground = styled.div`
  margin-top: 50px;
  width: 611px;
  height: 209px;

  background-color: white;
  border-radius: 16px;

  display: flex;
  justify-content: space-around;

  padding-inline: 18px;
  padding-block: 16px;
`;

const MainContentForm = styled.form`
  width: 500px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;

  h3 {
    font-size: 20px;
    color: #707070;

    line-height: 24px;

    margin-block: 8px;
  }

  input {
    font-size: 15px;
    height: 30px;

    background: #efefef;
    border-radius: 5px;
    border: none;

    ::placeholder {
      font-size: 15px;
      font-weight: 300;
    }

    :nth-child(3) {
      height: 66px;
    }
  }

  button {
    width: 112px;
    height: 31px;

    background-color: #1877f2;

    border-radius: 5px;

    color: #ffffff;

    border: none;

    position: absolute;
    bottom: 0;
    right: 0;

    cursor: pointer;
  }
`;

const ButtonPhantom = styled.div`
  height: 31px;
  background-color: #ffffff;
`;

const LeftPannel = styled.div`
  width: 70px;

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

export default CreatePost;
