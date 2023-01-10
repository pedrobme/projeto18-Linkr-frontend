import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import InfosPost from "./InfosPost";
import CreatePost from "./components/createPost";
import TableTrending from "./components/TableTrending";

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const [postNotifications, setPostNotifications] = useState(false);
  const [load, setLoad] = useState(true);
  const {id} = useParams();
  console.log( 'to no info',id)

  useEffect(() => {
    const promisse = axios.get(`http://localhost:5001/user/${id}`);

    promisse.then((res) => {
      /* console.log(res.data); */
      setPosts(res.data);
      setLoad(false);
      console.log(posts);

      if (posts.length === 0) {
        setPostNotifications(false);
      }
    });
    promisse.catch(() =>
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      )
    );
  }, [postNotifications]);

  console.log('teste', posts)

  return (
    <Container>
      <Box1>
      <Img src={posts[0].image} ></Img>  
      <TitleUsers>{posts[0].username}</TitleUsers>
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
            key={post.id}
            username={post.username}
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
        <TableTrending/>
      </Box2>
    </Container>
  );
}

const Box2 =styled.div`
    margin-left: 25px;
`

const Box1 = styled.div`
    display: flex;
    flex-direction: column;
`

const Container = styled.div`
width: 100%;
display: flex;
justify-content: center;
`

const Posts = styled.div`
  width: 611px;
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

const TitleUsers = styled.h1`
    font-family: Oswald;
    font-size: 43px;
    font-weight: 700;
    line-height: 64px;
    letter-spacing: 0em;
    text-align: left;
    color: #FFFFFF;

`
const Img = styled.img`
    
`