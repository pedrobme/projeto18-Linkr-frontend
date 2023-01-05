import styled from 'styled-components';
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from 'axios';



export default function Cadastro() {
    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function cadastrar(event){
        event.preventDefault();
        const requisicao = axios.post("http://localhost:4000/signup",{
            email,
            password,
            username,
            image
        })
        
        requisicao.then(response => {

            navigate('/');
            console.log(response.data)
        })
        requisicao.catch(err => {
            console.log(err);
        })
    }



    return (
        <>
        <Title>
            <Linkr>
                <p>linkr</p>
                <div>save, share and discover the best links on the web</div>
            </Linkr>
            <Signup onSubmit={cadastrar}>
                <input type="text" placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)}></input>
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}></input>
                <input type="text" placeholder="picture url" value={image} onChange={e => setImage(e.target.value)}></input>
                <button type="submit">Cadastrar</button>
                <Link to="/">
                    <Logar>Switch back to log in</Logar>
                </Link>
            </Signup>
        </Title>
       
        </>
    )
}
const Signup = styled.form`
    display:flex;
    flex-direction:column;
    margin-top:274px;
    margin-left:652px;
    input:nth-child(1){
        width: 429px;
        height: 65px;  
        border:none;
        border-radius: 6px;

    }
    input:nth-child(2){
        width: 429px;
        height: 65px; 
        border-radius: 6px;
        border:none;
        margin-top:13px;
    }
    input:nth-child(3){
        width: 429px;
        height: 65px;  
        border-radius: 6px;
        border:none;
        margin-top:13px;
    }
    input:nth-child(4){
        width: 429px;
        height: 65px; 
        border-radius: 6px;
        border:none;
        margin-top:13px;
    }
    button{
        font-family: 'Oswald', sans-serif;
        color:#FFFFFF;
        background: #1877F2;
        border-radius: 6px;
        width: 429px;
        height: 65px;
        margin-top:13px;
        font-size: 20px;
    }
    @media (max-width: 375px) {
        display:flex;
        justify-content:center;
        flex-direction:column;
       margin-top:140px;
       margin-left:300px;
        
    }
   
   
`
const Logar = styled.p`
    font-family: 'Lato', sans-serif;
    color: #FFFFFF;
    font-size: 15px;
    display:flex;
    justify-content:center;
    margin-top: 36px;
    text-decoration-line: underline;
`

const Title = styled.div`
    display:flex;
    background-color:#151515;
    height:1024px;
    width:1200px;
    @media (max-width: 375px) {
            width:1200px;
            height: 350px;
            flex-direction:column;
        }
    }
`
const Linkr = styled.div`
    margin-left:144px;
    margin-top:301px;
    p{
        font-weight: 700;
        line-height: 117px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
        font-family: 'Passion One', cursive;

    }
    p:nth-child(1){
        font-size:106px;
    }
    div{
        font-family: 'Oswald', sans-serif;
        font-size:43px;
        font-weight: 700;
        line-height: 64px;
        color: #FFFFFF;
        width:500px;
    }
    @media (max-width: 375px) {
        display:flex;
        justify-content:center;
        flex-direction:column;
        margin-top:10px;
        p{
            margin-left:190.50px;
            font-size:76px;
            
        }
        div{
            margin-left:100px;
            display:flex;
            justify-content:center;
            
        }
        
        
    }

`
