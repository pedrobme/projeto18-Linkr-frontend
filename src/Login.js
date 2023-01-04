import styled from 'styled-components';
import { useState, useContext } from "react";
import { Link} from "react-router-dom";
import axios from 'axios';
import { LoginContext } from "./auth";


export default function Login(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setToken} = useContext(LoginContext)




    function logar(event){
        event.preventDefault();
        const requisicao = axios.post("http://localhost:4000/signin",{
            email,
            password,
           
        })
        
        requisicao.then(response => {
            setToken(response.data);
            console.log(response.data);

            

        })
        requisicao.catch(error => {
            console.log(error);
        })
    }



    return (
        <>
        <Title>
            <Linkr>
                <p>linkr</p>
                <div>save, share and discover the best links on the web</div>
            </Linkr>
            <Signup onSubmit={logar}>
                <input type="text" placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)}></input>
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                <button type="submit">Log In</button>
                <Link to="/signup">
                    <Logar>First time? Create an account!</Logar>
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
`