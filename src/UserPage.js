import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserTableTrending from "./components/UserTableTrending";
import TopBar from "./components/TopBar";
import InfosPost from "./InfosPost";
import FollowButton from "./components/FollowButton";

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const [postNotifications, setPostNotifications] = useState(false);
  const [load, setLoad] = useState(true);
  const { id } = useParams();
  console.log("deu refresh");

  useEffect(() => {
    const promisse = axios.get(`https://linker-api-4331.onrender.com/user/${id}`);

    promisse.then((res) => {
      console.log("resUserPage: ", res.data);

      setPosts(res.data);
      setLoad(false);

      if (posts.length === 0) {
        setPostNotifications(false);
      }
    });

    promisse.catch(() =>
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      )
    );
  }, [postNotifications, id]);

  // console.log("dados vindo do back =>", id, Posts);

  return (
    <Container>
      <TopBar> </TopBar>

      <ContainerTimeLine>
        <TimelineMainContent>
          <TopUserInfo>
            <div className="box1">
              <Img src={posts.length > 0 ? posts[0].image : ""} />
              <TimelineTitle>
                {posts.length > 0 ? posts[0].username : ""}
              </TimelineTitle>
            </div>

            <FollowButton userId={id} />
          </TopUserInfo>
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
                  key={post.date}
                  posterId={post["user-id"]}
                  postId={post["post-id"]}
                  repostId={post["repost-id"]}
                  repostedPostId={post["reposted-post-id"]}
                  posterUsername={post["post-creator-name"]}
                  image={post.image}
                  url={post.url}
                  message={post.text}
                  titleUrl={post.titleUrl}
                  imageUrl={post.imageUrl}
                  descriptionUrl={post.descriptionUrl}
                  usersId={post.userId}
                />
              ))}
            </Posts>
          </Box1>
        </TimelineMainContent>
        <Box2>
          <UserTableTrending />
        </Box2>
      </ContainerTimeLine>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContainerTimeLine = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
`;

const Box1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
`;

const Box2 = styled.div`
  margin-top: 220px;
`;

const Posts = styled.div`
  width: 611px;
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

const TimelineMainContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 635px;
  justify-content: center;
`;

const TopUserInfo = styled.div`
  margin-top: 100px;
  max-height: 70px;
  width: 930px;
  padding-bottom: 41px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .box1 {
    display: flex;
  }
`;

const Img = styled.img`
  height: 53px;
  width: 53px;
  border-radius: 304px;
`;

const TimelineTitle = styled.h3`
  font-family: Oswald;
  padding-bottom: 7px;
  padding-left: 18px;
  font-size: 43px;
  font-weight: 700;
  color: #ffffff;
`;
