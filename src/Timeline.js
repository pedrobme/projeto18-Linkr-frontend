import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import InfosPost from "./InfosPost";
import CreatePost from "./components/createPost";
import TableTrending from "./components/TableTrending";

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
            
            <Box1>
                <CreatePost/>
                <Posts>
                    {posts.map((post) => <InfosPost key={post.id} username={post.username}
                        image={post.image} url={post.url} message={post.text} />)}
                </Posts>
            </Box1>
            <Box2>
                <TableTrending/>
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