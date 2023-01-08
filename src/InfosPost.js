import styled from "styled-components";
import { BsFillTrashFill } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function InfosPost({
  postNotifications,
  username,
  image,
  message,
  url,
  titleUrl,
  imageUrl,
  descriptionUrl,
}) {
  /* console.log(username, image, message, url, titleUrl, imageUrl, descriptionUrl); */
  const [site, setSite] = useState("");

  function redirection() {
    window.open(url, "_blank");
  }

  return (
    <>
      <PostBox username={username}>
        <UserPhoto>
          <img src={image}></img>
        </UserPhoto>
        <LikePost>
          <AiOutlineHeart size={25} />

          <a>13 likes</a>
        </LikePost>

        <PostContent>
          <PostHeader>
            <h1>{username}</h1>{" "}
            <Interactions>
              {" "}
              <FaPencilAlt /> <BsFillTrashFill />{" "}
            </Interactions>
          </PostHeader>
          <Message>{message}</Message>
          <UrlMetadata onClick={redirection}>
            <TextInfosUrl>
              <TitleUrl>{titleUrl}</TitleUrl>
              <DescriptionUrl>{descriptionUrl}</DescriptionUrl>
              <UrlLink>{url}</UrlLink>
            </TextInfosUrl>
            <ImageUrl>
              <img src={imageUrl}></img>
            </ImageUrl>
          </UrlMetadata>
        </PostContent>
      </PostBox>
    </>
  );
}

const PostBox = styled.form`
  color: #ffffff;
  height: 276px;
  width: 611px;
  border-radius: 16px;
  background-color: #171717;
  margin-bottom: 16px;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const UserPhoto = styled.div`
  img {
    height: 50px;
    width: 50px;
    border-radius: 26.5px;

    margin-left: 18px;
    margin-top: 17px;
  }
`;
const LikePost = styled.div`
  width: 50px;
  height: 80px;
  margin-top: 19px;
  margin-left: 33px;
  margin-bottom: 4.01px;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  font-family: "Lato", sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;

  a {
    margin-top: 9px;
    margin-left: -4px;
  }
`;

const PostContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 19px;
`;

const PostHeader = styled.div`
  width: 502px;
  height: 23px;
  margin-left: 5px;
  font-family: "Lato", sans-serif;
  font-size: 19px;
  font-weight: 400;
  line-height: 23px;
  text-align: left;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Interactions = styled.div`
  width: 55px;
  height: 23px;
  display: flex;
  justify-content: space-between;
`;

const Message = styled.div`
  height: 45px;
  width: 611px;
  margin-top: 8px;
  margin-left: 5px;

  border-radius: 16px;
  font-family: "Lato", sans-serif;
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
`;

const UrlMetadata = styled.div`
  height: 155px;
  width: 503px;
  margin-left: 5px;
  border-radius: 11px;

  border: 1px solid #ffffff;

  display: flex;
  flex-wrap: wrap;

  cursor: pointer;
`;
const TextInfosUrl = styled.div`
  width: 249.98px;
  height: 108px;
  margin-left: 19.31px;
  margin-top: 24px;
`;

const TitleUrl = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  margin-bottom: 5px;
  text-align: left;
`;

const DescriptionUrl = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 13px;
`;

const UrlLink = styled.div`
  width: 263.19px;
  font-family: "Lato", sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: left;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
const ImageUrl = styled.div`
  margin-left: 78px;

  img {
    height: 153px;
    width: 153.44039916992188px;

    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;
