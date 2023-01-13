import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import InfosPost from "./InfosPost";
import TableTrending from "./components/TableTrending";
import TopBar from "./components/TopBar";

export default function HashtagPage() {
  let { hashtag } = useParams();

  const [posts, setPosts] = useState([]);
  const [postNotifications, setPostNotifications] = useState(false);
  const [load, setLoad] = useState(true);
  const [hashtagReload, setHashtagReload] = useState("");

  useEffect(() => {
    const promisse = axios.get(`http://localhost:5001/hashtag/${hashtag}`);

    promisse.then((res) => {
      /* console.log(res.data); */
      setPosts(res.data);
      setLoad(false);
      console.log(posts);

      if (posts.length === 0) {
        setPostNotifications(false);
      }
    });
    promisse.catch((err) => {
      console.log(err);
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    });
  }, [hashtagReload]);

  return (
    <>
      <Container>
        <TopBar></TopBar>
        <TimelineTitle>#{hashtag}</TimelineTitle>
        <TimelineMainContent>
          <Box1>
            <LoadingPost load={load}>
              <a>Loading...</a>
            </LoadingPost>
            <Posts>
              <Notification postNotifications={postNotifications}>
                <a>There are no posts yet</a>
              </Notification>
              {posts.map((post) => (
                <InfosPost
                  postId={post.id}
                  setHashtagReload={setHashtagReload}
                  key={post.id}
                  posterUsername={post["post-creator-name"]}
                  image={post.image}
                  url={post.url}
                  message={post.text}
                  titleUrl={post.titleUrl}
                  imageUrl={post.imageUrl}
                  descriptionUrl={post.descriptionUrl}
                />
              ))}
            </Posts>
          </Box1>
          <Box2>
            <TableTrending
              hashtagReload={hashtagReload}
              setHashtagReload={setHashtagReload}
            />
          </Box2>
        </TimelineMainContent>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`;

const Box2 = styled.div`
  margin-left: 25px;
  margin-top: 26px;
  width: 30vw;
`;

const Box1 = styled.div`
  display: flex;
  flex-direction: column;

  width: 50vw;
`;

const TimelineMainContent = styled.div`
  display: flex;

  width: 80vw;
`;

const TimelineTitle = styled.h3`
  font-weight: 700;
  font-size: 43px;

  margin-top: 130px;
  margin-bottom: 40px;

  width: 80vw;

  color: #ffffff;
`;

const Posts = styled.div`
  margin-top: 29px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
const Notification = styled.div`
  display: ${(prop) => (prop.postNotifications ? "initial" : "none")};

  margin-left: 80px;
  color: #ffffff;
  font-family: "Lato", sans-serif;
  font-size: 40px;
  margin-top: 70px;
`;

const LoadingPost = styled.div`
  color: #ffffff;
  font-family: "Lato", sans-serif;
  font-size: 40px;
  margin-top: 70px;

  display: ${(prop) => (!prop.load ? "none" : "initial")};
`;
