import styled from "styled-components";
import { BsFillTrashFill } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { ReactTagify } from "react-tagify";
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function InfosPost({
  postId,
  setHashtagReload,
  postNotifications,
  username,
  image,
  message,
  url,
  titleUrl,
  imageUrl,
  descriptionUrl,
}) {
  const tagStyle = {
    fontWeight: 900,
    cursor: "pointer",
  };

  const [likes, setLikes] = useState([]);
  const [userId, setUserId] = useState(undefined);
  const navigate = useNavigate();

  function redirectHash(m) {
    let newTag = "";

    for (let i = 1; i < m.length; i++) {
      newTag = newTag + m[i];
    }
    
    navigate(`/hashtag/${newTag}`)
    setHashtagReload(newTag)
  }

  const [site, setSite] = useState("");

  function redirection() {
    window.open(url, "_blank");
  }


  const [likeUser, setLikeUser] = useState(undefined);

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const promisse = axios.get(`http://localhost:5000/postlikes/${postId}`,
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
    );

    promisse.then((res) => {
      console.log(res.data)
      setLikes(res.data.data)
      setUserId(res.data.userId)
      for(let user of res.data.data){
        if( Object.values(user)[0] == res.data.userId){
          setLikeUser(true)
          console.log(Object.values(user)[1])
        }
      }
      
      
    });
    promisse.catch(() =>
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      )
    );
  }, [likeUser]);

  

  function liked (){

    const object = {
      postId: postId
    }

    if(!likeUser){
      
      const promisse = axios.post("http://localhost:5000/liked", object,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
        )
  
      promisse.then((res) => {
        console.log(res)
        setLikeUser(true)
      });
      promisse.catch(() =>
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        )
      );
      return
    }

    const promisse = axios.post("http://localhost:5000/desliked", object,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
        )
  
      promisse.then((res) => {
        console.log(res)
        setLikeUser(false)
      });
      promisse.catch(() =>
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        )
      );
  }

  function personLiked () {
      if(likeUser && (likes.length == 2)){
        let name
        for(let i = 0; i < likes.length ; i++){
            if(Object.values(likes[i])[0] !== userId){
              name = likes[i].name
              return `Você e ${name} curtiram`  
            }
        }
        
      }else if(likes.length == 0){
        return "Ninguém curtiu"
      }else if(likes.length == 1 && !likeUser){
        return `${likes[0].name} curtiu`
      }else if(!likeUser && likes.length == 2){
        return `${likes[0].name} e ${likes[1].name} curtiram`
      }else if(!likeUser && likes.length > 2){
        return `${likes[0].name}, ${likes[1].name} e outras ${likes.length -2} pessoas`
      }else if(likeUser && likes.length > 2){
        let name
        for(let i = 0; i < likes.length ; i++){
            if(Object.values(likes[i])[0] !== userId){
              name = likes[i].name
              return `Você, ${name} e outras ${likes.length-2} pessoas`  
            }
        }
      }else if(likeUser){
        return "Você curtiu"
      }
  }
    

  return (
    <>
      <PostBox username={username}>
        <LeftPannel>
          <UserPhoto>
            <img src={image}></img>
          </UserPhoto>
          <LikePost onClick={() => liked()}>
            {likeUser ? (
              <AiFillHeart size={25} color="red" />
            ) : (
              <AiOutlineHeart size={25} />
            )}

            <a>{likes.length} likes</a>
            <div className="hover">{personLiked()}</div>
          </LikePost>
        </LeftPannel>

        <PostContent>
          <PostHeader>
            <h1>{username}</h1>{" "}
            <Interactions>
              {" "}
              <FaPencilAlt /> <BsFillTrashFill />{" "}
            </Interactions>
          </PostHeader>
          <ReactTagify
            tagStyle={tagStyle}
            tagClicked={(tag) => redirectHash(tag)}
          >
            <Message>{message}</Message>
          </ReactTagify>
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
  min-height: 276px;
  width: 611px;
  border-radius: 16px;
  background-color: #171717;
  margin-bottom: 16px;
  display: flex;
`;

const LeftPannel = styled.div``;

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
  .hover {
    display: none;
  }

  font-family: "Lato", sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;

  a {
    margin-top: 9px;
    margin-left: -4px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 11px;
    line-height: 13px;
    align-items: center;
    justify-content: center;
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
  width: 500px;
  margin-top: 8px;
  margin-left: 5px;
  margin-bottom: 8px;
  border-radius: 16px;
  font-family: "Lato", sans-serif;
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;

  word-wrap: break-word;
  text-overflow: hidden;
`;

const UrlMetadata = styled.div`
  height: 155px;
  width: 503px;
  margin-left: 5px;
  margin-block: 10px;
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

border-top-right-radius:10px;
border-bottom-right-radius:10px;
}
`