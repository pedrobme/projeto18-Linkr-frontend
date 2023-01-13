import styled from "styled-components";
import { BsFillTrashFill } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ReactTagify } from "react-tagify";
import axios from "axios";
import deletePost from "./utils/deletePost";
import { CiLocationArrow1 } from "react-icons/ci";
import FollowComment from "./components/FollowComent";

export default function InfosPost({
  posterId,
  posterUsername,
  postId,
  setHashtagReload,
  repostId,
  repostedPostId,
  postNotifications,
  image,
  message,
  url,
  titleUrl,
  imageUrl,
  descriptionUrl,
  usersId,
}) {
  const tagStyle = {
    fontWeight: 900,
    cursor: "pointer",
  };

  const [likes, setLikes] = useState([]);
  const [userId, setUserId] = useState(undefined);
  const [editingPost, setEditingPost] = useState(false);
  const [comment, setComment] = useState(false);
  const [count, setCount] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [commentUser, setCommentUser] = useState("");

  const [postDelete, setPostDelete] = useState(false);
  const [isRepost, setIsRepost] = useState(false);

  const [commentSent, setCommentSent] = useState(false);
  /* console.log(commentSent); */

  const [editingPostText, setEditingPostText] = useState("");

  const navigate = useNavigate();

  function sendComments() {
    const request = axios.post(`https://linker-api-4331.onrender.com/comment`, {
      comment: commentUser,
      userId: count.id,
      postId: postId,
    });

    setCommentSent(!commentSent);

    request.then((response) => {
      console.log(response.data);
    });
    request.catch((error) => {
      console.log(error);
    });
  }

  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  let newPostId = postId;
  if (newPostId === null) {
    newPostId = repostedPostId;
  }

  function redirectHash(m) {
    let newTag = "";

    for (let i = 1; i < m.length; i++) {
      newTag = newTag + m[i];
    }

    navigate(`/hashtag/${newTag}`);
    setHashtagReload(newTag);
  }

  const [site, setSite] = useState("");

  function redirection() {
    window.open(url, "_blank");
  }

  const [likeUser, setLikeUser] = useState(undefined);

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (repostedPostId != null) {
      setIsRepost(true);
    }

    const promisse = axios.get(`https://linker-api-4331.onrender.com/postlikes/${newPostId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    promisse.then((res) => {
      /* console.log(res.data); */
      setLikes(res.data.data);
      setUserId(res.data.userId);

      for (let user of res.data.data) {
        if (Object.values(user)[0] == res.data.userId) {
          setLikeUser(true);
          console.log(Object.values(user)[1]);
        }
      }
    });
    promisse.catch((err) => {
      console.log(err);
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    });
  }, [likeUser]);

  useEffect(() => {
    const promis = axios.get(`https://linker-api-4331.onrender.com/comment/${postId}`);

    promis.then((res) => {
      setCount(res.data);
      setComment(res.data.rows);
      /* console.log(res.data); */
    });
  }, [commentSent]);

  function liked() {
    const object = {
      postId: newPostId,
    };

    if (!likeUser) {
      const promisse = axios.post(`https://linker-api-4331.onrender.com/liked`, object, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      promisse.then((res) => {
        console.log(res);
        setLikeUser(true);
      });

      promisse.catch((err) => {
        console.log(err);
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
      return;
    }

    const promisse = axios.post(`https://linker-api-4331.onrender.com/desliked`, object, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    promisse.then((res) => {
      console.log(res);
      setLikeUser(false);
    });
    promisse.catch(() =>
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      )
    );
  }

  function personLiked() {
    if (likeUser && likes.length == 2) {
      let name;
      for (let i = 0; i < likes.length; i++) {
        if (Object.values(likes[i])[0] !== userId) {
          name = likes[i].name;
          return `Você e ${name} curtiram`;
        }
      }
    } else if (likes.length == 0) {
      return "Ninguém curtiu";
    } else if (likes.length == 1 && !likeUser) {
      return `${likes[0].name} curtiu`;
    } else if (!likeUser && likes.length == 2) {
      return `${likes[0].name} e ${likes[1].name} curtiram`;
    } else if (!likeUser && likes.length > 2) {
      return `${likes[0].name}, ${likes[1].name} e outras ${
        likes.length - 2
      } pessoas`;
    } else if (likeUser && likes.length > 2) {
      let name;
      for (let i = 0; i < likes.length; i++) {
        if (Object.values(likes[i])[0] !== userId) {
          name = likes[i].name;
          return `Você, ${name} e outras ${likes.length - 2} pessoas`;
        }
      }
    } else if (likeUser) {
      return "Você curtiu";
    }
  }

  function editPost(event, postId, setEditingPost) {
    event.preventDeafault();
  }

  function openAsk() {
    setPostDelete(true);
  }

  function noDeletePost() {
    setPostDelete(false);
  }

  function repostPost(postId) {
    try {
      // LUCAS ADICIONAR TELA DE CONFIRMAÇÃO ANTES DE PASSAR POR ESSE POST //

      axios.post(`https://linker-api-4331.onrender.com/repost/${postId}`, [], {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      window.location.reload();
    } catch (err) {
      console.log("repostPost err", err);
    }
  }

  return (
    <>
      <PostBox isRepost={isRepost} username={posterUsername}>
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
          <ViewComments>
            <AiOutlineComment onClick={handleClick} />
            <ViewComment>
              <p key={postId}>{count.rowCount}</p>
              <p>comments</p>
            </ViewComment>
          </ViewComments>
          <RepostDiv onClick={() => repostPost(newPostId)}>
            <BiRepost />
            <p>10 re-posts</p>
          </RepostDiv>
        </LeftPannel>

        <PostContent>
          <PostHeader>
            <Link to={`/user/${posterId}`}>
              <h1>{posterUsername}</h1>{" "}
            </Link>
            <Interactions>
              {" "}
              <FaPencilAlt
                onClick={() => {
                  editingPost
                    ? alert("you must end your current editing post first")
                    : setEditingPost(true);
                }}
              />{" "}
              <BsFillTrashFill
                onClick={() => {
                  openAsk();
                }}
              />{" "}
              <ScreeDelete postDelete={postDelete}></ScreeDelete>
              <AskDelete postDelete={postDelete}>
                <a>Are you sure you want to delete this post?</a>
                <OptionYN>
                  <NoDelete
                    onClick={() => {
                      noDeletePost();
                    }}
                  >
                    No, go back
                  </NoDelete>
                  <YesDelete
                    onClick={() => {
                      deletePost(postId);
                    }}
                  >
                    Yes, delete it
                  </YesDelete>
                </OptionYN>
              </AskDelete>
            </Interactions>
          </PostHeader>
          {editingPost ? (
            <EditingPostForm onSubmit={(event) => editPost(event)}>
              <input
                onChange={(event) => setEditingPostText(event.target.value)}
                placeholder="Type details about your post (optional)"
              ></input>
              <ButtonPhantom></ButtonPhantom>
              <button type="submit">Salvar</button>
            </EditingPostForm>
          ) : (
            <ReactTagify
              tagStyle={tagStyle}
              tagClicked={(tag) => redirectHash(tag)}
            >
              <Message>{message}</Message>
            </ReactTagify>
          )}
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
      {isShown && (
        <>
          <AllComents>
            {comment.map((comm) => (
              <>
                <AllComentsPostId>
                  <ImageComment src={comm.userImage} />
                  <UserComments key={postId}>
                    <div>
                      <p>{comm.userName}</p>
                      <p>
                        {comm.userName === posterUsername
                          ? "• post’s author"
                          : ""}
                      </p>
                      <FollowComment userId={comm.userId}></FollowComment>
                    </div>
                    <p>{comm.commentText}</p>
                  </UserComments>
                </AllComentsPostId>
              </>
            ))}
            <SendComment>
              <ImageUser src={count.imageMain} alt="imageUser" />
              <input
                type="text"
                placeholder="Write a comment"
                value={commentUser}
                onChange={(e) => setCommentUser(e.target.value)}
              ></input>
              <CiLocationArrow1
                size={40}
                color="white"
                onClick={() => sendComments()}
              />
            </SendComment>
          </AllComents>
          
        </>
      )}
    </>
  );
}

const ImageUser = styled.img`
  width: 39px;
  height: 39px;
  border-radius: 26.5px;
`;
const SendComment = styled.div`
  display: flex;
  input {
    width: 514px;
    height: 39px;
    margin-left: 14px;
    background: #252525;
    border-radius: 8px;
    padding-left: 14px;
    border: none;
  }
  input::placeholder {
    font-family: "Lato";
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.05em;
    color: #575757;
  }

  svg {
    cursor: pointer;
  }

  padding-top: 40px;
  padding-left: 25px;
  padding-bottom: 25px;
`;
const AllComents = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #1e1e1e;
  border-radius: 16px;
  margin-top: -40px;
  margin-bottom: 44px;
  padding-bottom: 25px;
`;
const ImageComment = styled.img`
  width: 39px;
  height: 39px;
  border-radius: 26.5px;
  margin-top: 4px;
`;
const AllComentsPostId = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  padding-top: 20px;
  padding-left: 25px;
`;
const UserComments = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 18px;
  div {
    display: flex;
    flex-direction: column;
    color: #f3f3f3;
    font-size: 14px;
    flex-direction: row;
  }
  div p:nth-child(1) {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #f3f3f3;
  }
  div p:nth-child(2) {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #565656;
    margin-left: 4px;
    margin-top: 1px;
  }
  p {
    color: #acacac;
    margin-top: 3px;
    font-size: 14px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
  }
`;
const ViewComments = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: column;

  align-items: center;
`;

const ViewComment = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 11px;
    line-height: 13px;
    align-items: center;
    justify-content: center;
  }
  p:nth-child(2) {
    margin-left: 5px;
  }
`;

const RepostDiv = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 11px;
    line-height: 13px;

    text-align: center;
  }
`;

const PostBox = styled.form`
  color: #ffffff;

  height: 280px;
  width: 100%;

  border-radius: 16px;
  background-color: ${(props) => (props.isRepost ? "#ffffff" : "#171717")};
  margin-bottom: 16px;

  display: flex;

  justify-content: center;
  align-items: center;

  z-index: 2;
`;

const LeftPannel = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  justify-content: space-around;

  height: 90%;

  width: 8%;

  svg {
    font-size: 25px;
  }
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
  cursor: pointer;
  .hover {
    display: none;
  }

  :hover {
    .hover {
      display: flex;
      position: absolute;
      width: 169px;
      height: 24px;
      margin-top: 55px;
      margin-left: -72px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 3px;
      color: #505050;

      font-family: "Lato";
      font-style: normal;
      font-weight: 700;
      font-size: 11px;
      line-height: 13px;
      align-items: center;
      justify-content: center;
    }
  }

  height: 50px;

  display: flex;

  flex-direction: column;
  .hover {
    display: none;
  }

  font-family: "Lato", sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: 13px;

  a {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 11px;
  }
`;

const PostContent = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const PostHeader = styled.div`
  width: 85%;
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

const EditingPostForm = styled.form`
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

const Interactions = styled.div`
  width: 55px;
  height: 23px;
  display: flex;
  justify-content: space-between;
`;

const Message = styled.div`
  width: 100%;

  margin-top: 8px;
  margin-left: 5px;
  margin-bottom: 8px;
  border-radius: 16px;
  font-family: "Lato", sans-serif;
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;

  word-break: break-all;
`;

const UrlMetadata = styled.div`
  width: 85%;
  height: 155px;
  margin-left: 5px;
  margin-block: 10px;
  border-radius: 11px;
  border: 1px solid #ffffff;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  justify-content: space-between;
  cursor: pointer;
`;
const TextInfosUrl = styled.div`
  width: 50%;
  height: 108px;
  margin-left: 19.31px;
  margin-top: 24px;

  overflow: hidden;
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
  width: 30%;
  img {
    width: 100%;

    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const ScreeDelete = styled.div`
  display: ${(prop) => (prop.postDelete ? "initial" : "none")};
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffffff;

  z-index: 100;
  opacity: 0.7;
`;

const AskDelete = styled.div`
  height: 262px;
  width: 597px;
  opacity: 1;
  border-radius: 50px;
  position: fixed;
  left: 353px;
  top: 169px;
  background-color: #333333;
  z-index: 101;
  text-align: center;
  display: ${(prop) => (prop.postDelete ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-around;
  a {
    font-family: "Lato", sans-serif;
    font-size: 34px;
    font-weight: 700;
    line-height: 41px;
    letter-spacing: 0em;
  }
`;
const NoDelete = styled.div`
  height: 37px;
  width: 134px;
  border-radius: 5px;
  background-color: #ffffff;
  color: #1877f2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const YesDelete = styled.div`
  height: 37px;
  width: 134px;
  border-radius: 5px;
  background-color: #1877f2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer; ;
`;

const OptionYN = styled.div`
  width: 300px;
  height: 45px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 159px;
`;
