import styled from "styled-components";
import { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "./auth";



console.log('teste aqui =>',5000)

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const buttRef = useRef();

  const onButtClick = () => {
    console.log("clicked");
    buttRef.current.disabled = true;
    const wait = async () => {
      buttRef.current.disabled = false;
    };

    wait();
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/timeline");
    }
  }, []);

  function logar(event) {
    event.preventDefault();

    const requisicao = axios.post(`http://localhost:5000/signin`, {
      email,
      password,
    });

    requisicao.then((response) => {
      localStorage.setItem("authToken", response.data);
      console.log(response.data);

      navigate("/timeline");
    });
    requisicao.catch((error) => {
      console.log(error);
      if (error.response.status === 422) {
        alert("Favor, preencha todos os campos");
      } else if (error.response.status === 401) {
        alert("Email ou senha incorretos");
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
          <Signup onSubmit={logar}>
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
            <button type="submit" ref={buttRef} onClick={onButtClick}>
              Log In
            </button>
            <Link to="/signup">
              <Logar>First time? Create an account!</Logar>
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
