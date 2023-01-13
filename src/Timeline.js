import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InfosPost from "./InfosPost";
import CreatePost from "./components/createPost";
import TableTrending from "./components/TableTrending";
import TopBar from "./components/TopBar";

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const [postNotifications, setPostNotifications] = useState(false);
  const [load, setLoad] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [logoutVisibility, setLogoutVisibility] = useState(false);

  // console.log(logoutVisibility);

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const promisse = axios.get(`http://localhost:5001/timeline`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    promisse.then((res) => {
      /* console.log(res.data); */
      setPosts(res.data);
      setLoad(false);
      console.log(res.data);

      if (res.data.length === 0) {
        setPostNotifications(true);
      }
    });
    promisse.catch((err) => {
      console.log(err);
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    });
  }, []);

  return (
    <Container
      onClick={() => {
        if (logoutVisibility === true) {
          setLogoutVisibility(false);
        }
      }}
    >
      <TopBar></TopBar>
      <TimelineTitle>Timeline</TimelineTitle>
      <TimelineMainContent>
        <Box1>
          <CreatePost userInfo={userInfo} />
          <LoadingPost load={load}>
            <a>Loading...</a>
          </LoadingPost>
          <Posts>
            <Notification postNotifications={postNotifications}>
              <a>There are no posts yet</a>
            </Notification>
            {posts.map((post) => (
              <InfosPost
                key={post.date}
                posterId={post["user-id"]}
                posterUsername={post["post-creator-name"]}
                postId={post["post-id"]}
                repostId={post["repost-id"]}
                repostedPostId={post["reposted-post-id"]}
                image={post.image}
                url={post.url}
                message={post.text}
                titleUrl={post.titleUrl}
                imageUrl={post.imageUrl}
                descriptionUrl={post.descriptionUrl}
                usersId={post.usersId}
              />
            ))}
          </Posts>
        </Box1>
        <Box2>
          <TableTrending />
        </Box2>
      </TimelineMainContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box2 = styled.div`
  margin-left: 25px;
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
  display: ${(prop) => (!prop.load ? "none" : "initial")}; ;
`;
