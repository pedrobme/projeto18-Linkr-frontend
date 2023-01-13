import styled from "styled-components"
import { AiOutlineRedo } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";


export default function AtualizationFeed({posts}) {
    console.log(posts)

    const [button, setButton] = useState(0);
    const authToken = localStorage.getItem("authToken");
    

    setInterval(() => {


        const promisse = axios.get(`http://localhost:5000/timeline`, {
      headers: { Authorization: `Bearer ${authToken}` },
    }).then((res) => {
                const oldPost = posts.length;
                const newPosts = res.data.length;
                
                const sub = newPosts - oldPost;
                
                console.log(oldPost, newPosts);

                if (oldPost === null){
                    return
                }
                
                if (newPosts > oldPost) {
                    console.log("oi");
                    setButton(sub);
                }
            }).catch((err) => {
                console.log(err);
            })

    }, 15000);

    function pullPublications() {
       
        window.location.reload();

    }

    return (
        <Atualization button={button} onClick={pullPublications}>
            <a> {button} new posts, load more!</a>
            <AiOutlineRedo color="#ffffff" />
        </Atualization>
    )
}

const Atualization = styled.div`
height: 61px;
width: 100%;
left: 241px;
top: 481px;
border-radius: 16px;
background-color: #1877F2;
display: ${(prop) => (prop.button === 0 ? "none" : "flex")};
justify-content: center;
align-items: center;
margin-bottom: 17px;
cursor: pointer;

a{
    font-family: Lato;
font-size: 16px;
font-weight: 400;
line-height: 19px;
letter-spacing: 0em;
text-align: left;
color:#ffffff;
}

`