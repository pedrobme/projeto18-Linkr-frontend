import styled from "styled-components";
import { BsFillTrashFill } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";;
export default function InfosPost({username, image, message, url}){

    console.log(username, image, message, url);

   return(
    <>
    <PostBox>
        <UserPhoto><img src={image}></img></UserPhoto>
        <PostContent>
            <PostHeader>
                <h1>{username}</h1> <Interactions> <FaPencilAlt/> <BsFillTrashFill/> </Interactions>
            </PostHeader>
            <Message>{message}</Message>

        </PostContent>

    </PostBox>
    </>
   )

}

const PostBox = styled.form`
color: #ffffff;
height: 276px;
width: 611px;
border-radius: 16px;
background-color: #171717;
margin-bottom:16px;

display: flex;
flex-wrap: wrap;
flex-direction: column;

`

const UserPhoto = styled.div`
height: 50px;
width: 50px;
border-radius: 26.5px;

margin-left: 18px;
margin-top: 17px;

`
const PostContent = styled.div`
display: flex;
flex-wrap: wrap;
margin-top: 19px;

`

const PostHeader = styled.div`
    width: 502px;
    height: 23px;
    font-family: 'Lato', sans-serif;
    font-size: 19px;
    font-weight: 400;
    line-height: 23px;
    text-align: left;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

`

const Interactions = styled.div`
width: 55px;
height: 23px;
display: flex;
justify-content: space-between;
`

const Message = styled.div`
height: 276px;
width: 611px;
margin-top: 8px;

border-radius: 16px;
font-family: Lato;
font-size: 17px;
font-weight: 400;
line-height: 20px;
text-align: left;

`