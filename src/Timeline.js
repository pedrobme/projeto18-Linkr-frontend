import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import InfosPost from "./InfosPost";
import CreatePost from "./components/createPost";
import {DebounceInput} from 'react-debounce-input';

export default function Timeline() {

    const [posts, setPosts] = useState([]);
    const [querys, setQuerys] = useState({})
    const [searchUsers, setSearcheUsers] = useState([])
    
    console.log(querys.length);

    useEffect(() => {
        const promisse = axios.get("http://localhost:5001/timeline");

        promisse.then((res) => {
            setPosts(res.data);

        });
        promisse.catch(() => console.log('Falha na requisição, tente novamente'));
    }, []);


    function handleForm(e){
       if(querys.length >= 3){

        setSearcheUsers([])

        console.log('a seguir user =>',searchUsers)

        e.preventDefault()
       }
        // console.log(e.target.name, e.target.value )
        setQuerys( e.target.value)
        }

    useEffect(() => {     
    async function sendForm(e) {
    
        const body = {querys}

        try{
            const response = await axios.post("http://localhost:5001/search", body)

            console.log('deu bom', response);
            
            setSearcheUsers(response.data)

        }catch({response}){
            alert(response.data.message);
        }}
        sendForm();
    },[querys])

    console.log('a seguir querys =>', querys)

    function ResutUsers(){
        return searchUsers.map(user =>{
           return (<UserFound>
                     <UserFoundImg src={user.image}/>
                     <UserFoundName>{user.username}</UserFoundName>
                   </UserFound>)
        })
    }

    return (
        <Container>
        <Search>
        <DebounceInput
            minLength={3}
            debounceTimeout={300}
            placeholder = "Search for people" 
            id='forName'
            onChange={handleForm}
            type='text'
            name='search'
            value={querys.value}
            required/>
               
            <Result>
              <Value querysValue={querys}>
                <ResutUsers/>
              </Value>
            </Result>
            
        </Search>

        <CreatePost/>
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

const Search = styled.div`
      box-sizing: border-box;
      display: flex;
      flex-direction:column;
      position: relative;
      
      input{
        margin-top: 13px;
        height: 45px;
        width: 563px;
        left: 437px;
        top: 13px;
        border: none;
        border-radius: 8px;
        z-index: 2;

        ::placeholder{
            font-family: Lato;
            font-size: 19px;
            font-weight: 400;
            line-height: 23px;
            letter-spacing: 0em;
            text-align: left;
        }
    }
    
`

const Result = styled.div`
        min-height: 20px;
        width: 567px;
        background: #E7E7E7;
        border-radius: 5px;
        position: absolute;
        z-index: 1;
        top: 12px;
`

const Value = styled.div`
    margin-top: 25px;
    padding-top: 30px;
    margin-bottom:-10px;
    padding-bottom: 5px;
    padding-left: 3px;
    display:${({querysValue}) => querysValue.length < 3 ? 'none':'inherit'};
`

const UserFound = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 12px;
`
const UserFoundName = styled.h1`
    padding-left: 15px;
    font-family: Lato;
    font-size: 19px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
`
const UserFoundImg = styled.img`
    height: 39px;
    width: 39px;
    left: 454px;
    top: 72px;
    border-radius: 304px;
`
