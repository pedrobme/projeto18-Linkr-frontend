import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import InfosPost from "./InfosPost";

export default function Timeline() {

    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const promisse = axios.get("http://localhost:5000/timeline");

        promisse.then((res) => {
            /* console.log(res.data); */
            setPosts(res.data);

        });
        promisse.catch(() => console.log('Falha na requisição, tente novamente'));
    }, []);

    return (
        <Container>
        <Posts>
            {posts.map((post) => <InfosPost key={post.id} username={post.username}
                image={post.image} url={post.url} message={post.text} />)}
        </Posts>
        </Container>
    )

}

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