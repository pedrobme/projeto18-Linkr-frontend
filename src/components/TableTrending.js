import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function TableTrending({ hashtagReload, setHashtagReload }) {
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    const promisse = axios.get(`http://localhost:5000/trending`);

    promisse.then((res) => {
      console.log(res.data);
      setHashtags(res.data);
    });
    promisse.catch(() => console.log("Falha na requisição, tente novamente"));
  }, [hashtagReload]);

  return (
    <Affs>
      <h1>trending</h1>
      <div className="line"></div>
      <div className="hashtags">
        {hashtags.map((m, key) => (
          <div key={key} onClick={() => setHashtagReload(m.Hashtag)}>
            <Link to={`/hashtag/${m.Hashtag}`}># {m.Hashtag}</Link>
          </div>
        ))}
      </div>
    </Affs>
  );
}

const Affs = styled.div`
  height: 406px;
  width: 301px;
  background-color: #171717;
  border-radius: 16px;
  padding-left: 16px;
  padding-top: 10px;

  a {
    text-decoration: none;
  }

  a:visited {
    color: #ffffff;
  }

  h1 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #ffffff;
  }

  .line {
    height: 1px;
    width: 100%;
    background-color: #484848;
    margin-left: -15px;
    margin-top: 12px;
  }

  .hashtags {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: 0.05em;

    color: #ffffff;
    margin-top: 18px;

    div {
      margin-bottom: 7px;
    }
  }
`;
