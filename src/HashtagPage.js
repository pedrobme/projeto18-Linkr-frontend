import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import InfosPost from "./InfosPost";
import TableTrending from "./components/TableTrending";

export default function HashtagPage() {

    let {hashtag} = useParams()

    const [posts, setPosts] = useState([]);
    const [postNotifications, setPostNotifications] = useState(false)
    const [load, setLoad] = useState(true);
    const [hashtagReload, setHashtagReload] = useState('')


    useEffect(() => {
        const promisse = axios.get(`http://localhost:5000/hashtag/${hashtag}`);

        promisse.then((res) => {
            /* console.log(res.data); */
            setPosts(res.data);
            setLoad(false);
            console.log(posts);
            

            if (posts.length === 0) {
                setPostNotifications(false);
            }

            
        });
        promisse.catch(() => alert('An error occured while trying to fetch the posts, please refresh the page'));
    }, [hashtagReload]);

    

    return (
        <Container>
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
                        setHashtagReload={setHashtagReload}
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
                <TableTrending hashtagReload={hashtagReload} setHashtagReload={setHashtagReload}/>
            </Box2>
        </Container>
    )

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

`
const Notification = styled.div`

display:  ${(prop) => (prop.postNotifications ? 'initial' : 'none')};

margin-left: 80px;
color: #ffffff;
font-family: 'Lato', sans-serif;
font-size: 40px;
margin-top: 70px;


`

const LoadingPost = styled.div`

color: #ffffff;
font-family: 'Lato', sans-serif;
font-size: 40px;
margin-top: 70px;

display:  ${(prop) => (!prop.load ? 'none' : 'initial')};;

`