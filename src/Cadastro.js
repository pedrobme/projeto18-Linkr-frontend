import styled from "styled-components";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cadastro() {
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const buttRef = useRef();

  const onButtClick = () => {
    console.log("clicked");
    buttRef.current.disabled = true;
    const wait = async () => {
      buttRef.current.disabled = false;
    };

    wait();
  };

  const navigate = useNavigate();

  function cadastrar(event) {
    event.preventDefault();
    const requisicao = axios.post(`https://linker-api-4331.onrender.com/signup`, {
      email,
      password,
      username,
      image,
    });

    if (username === "" || image === "" || email === "" || password === "") {
      alert("Favor, preencha todos os campos");
    }

    requisicao.then((response) => {
      navigate("/");
      console.log(response.data);
    });
    requisicao.catch((err) => {
      console.log(err);
      if (err.response.status === 409) {
        alert("Email já cadastrado");
      }
    });
  }

  return (
    <>
      <Title>
        <Linkr>
          <p>linkr</p>
          <div>save, share and discover the best links on the web</div>
        </Linkr>
        <Form>
          <Signup onSubmit={cadastrar} id="form">
            <input
              type="text"
              placeholder="e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="picture url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></input>
            <button type="submit" ref={buttRef} onClick={onButtClick}>
              Cadastrar
            </button>
            <Link to="/">
              <Logar>Switch back to log in</Logar>
            </Link>
          </Signup>
        </Form>
      </Title>
    </>
  );
}

const Title = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 375px) {
    display: flex;
    flex-direction: column;
  }
`;

const Linkr = styled.div`
  width: 905px;
  background: #151515;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  height: 1024px;
  p {
    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 106px;
    line-height: 117px;
    letter-spacing: 0.05em;
    color: #ffffff;
    margin-left: 140px;
    margin-top: 301px;
  }
  div {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
    width: 442px;
    height: 128px;
    margin-left: 144px;
  }
  @media (max-width: 375px) {
    height: 225px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      font-family: "Passion One";
      font-style: normal;
      font-weight: 700;
      font-size: 76px;
      line-height: 84px;
      letter-spacing: 0.05em;
      color: #ffffff;
      margin-top: 10px;
      padding-right: 102px;
    }
    div {
      font-size: 23px;
      font-family: "Oswald";
      font-style: normal;
      font-weight: 700;
      font-size: 40px;
      line-height: 34px;
      text-align: center;
      color: #ffffff;
      padding-right: 100px;
    }
  }
`;
const Form = styled.div`
  width: 535px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Signup = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;

  input:nth-child(1) {
    width: 429px;
    height: 65px;
    border: none;
    border-radius: 6px;
  }
  input:nth-child(2) {
    width: 429px;
    height: 65px;
    border-radius: 6px;
    border: none;
    margin-top: 13px;
  }
  input:nth-child(3) {
    width: 429px;
    height: 65px;
    border-radius: 6px;
    border: none;
    margin-top: 13px;
  }
  input:nth-child(4) {
    width: 429px;
    height: 65px;
    border-radius: 6px;
    border: none;
    margin-top: 13px;
  }
  button {
    font-family: "Oswald", sans-serif;
    color: #ffffff;
    background: #1877f2;
    border-radius: 6px;
    width: 429px;
    height: 65px;
    margin-top: 13px;
    font-size: 20px;
  }
  @media (max-width: 375px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 40px;
    margin-left: 400px;
    text-align: center;
    input {
      width: 375px;
      height: 55px;
      left: 23px;
      top: 215px;
      background: #ffffff;
      border-radius: 6px;
    }
  }
`;
const Logar = styled.p`
  font-family: "Lato", sans-serif;
  color: #ffffff;
  font-size: 15px;
  display: flex;
  justify-content: center;
  margin-top: 36px;
  text-decoration-line: underline;
`;
