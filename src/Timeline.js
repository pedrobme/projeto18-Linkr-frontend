import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import InfosPost from "./InfosPost";
import CreatePost from "./components/createPost";

export default function Timeline() {

    const [posts, setPosts] = useState([]);
    const [postNotifications, setPostNotifications] = useState(false)
    const [load, setLoad] = useState(true);


    useEffect(() => {
        const promisse = axios.get("http://localhost:5000/timeline");

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
    }, [postNotifications]);

    

    return (
        <Container>
            <CreatePost />
            <LoadingPost load={load}>
                <a>Loading...</a>
            </LoadingPost>
            <Posts>
                <Notification postNotifications={postNotifications}>
                    <a>There are no posts yet</a>
                </Notification>
                {posts.map((post) => <InfosPost
                    key={post.id} username={post.username} image={post.image}
                    url={post.url} message={post.text} titleUrl={post.titleUrl}
                    imageUrl={post.imageUrl} descriptionUrl={post.descriptionUrl} />)}
            </Posts>
        </Container>
    )

}

const Container = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;

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