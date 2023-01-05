import { useState } from "react";
import styled from "styled-components";

const CreatePost = () => {
  const [link, setLink] = useState("");
  const [text, setText] = useState("");

  return (
    <Container>
      <CreatePostBackground>
        <LeftPannel>
          <img src="https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-732x549-thumbnail-732x549.jpg" />
        </LeftPannel>
        <MainContentContainer>
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
          <button>Publicar</button>
        </MainContentContainer>
      </CreatePostBackground>
    </Container>
  );
};

// Styled components

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CreatePostBackground = styled.div`
  width: 611px;
  height: 209px;
  background-color: white;
  border-radius: 16px;

  display: flex;
  justify-content: space-between;

  padding-inline: 18px;
  padding-block: 16px;
`;

const MainContentContainer = styled.div`
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
