import { useEffect, useState } from "react"
import axios from "axios";
import styled from "styled-components";

export default function FollowButton ({userId}) {

    const [followList, setFollowList] = useState([])
    const [follow, setFollow] = useState(false)

    const authToken = localStorage.getItem("authToken");

    useEffect(()=> {
        const promisse = axios.get(`https://linker-api-4331.onrender.com/followers/${userId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });

    promisse.then((res) => {
        console.log("mesma coisa")
        console.log(res.data)
        setFollowList(res.data)
        if(!res.data.length){
            setFollow(false)
            
            return
        }
        setFollow(true)
        
    });
    promisse.catch((err) => {
      console.log(err);
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    });
    }, [follow])

    function FollowUser () {



        const promisse = axios.post(`https://linker-api-4331.onrender.com/followers/${userId}`, [], {
            headers: { Authorization: `Bearer ${authToken}` },
          });

        promisse.then((res) => {
            setFollow(true)
            
        });
        promisse.catch((err) => {
        console.log(err);
        alert(
            "Error"
        );
        });

    }

    function UnfollowUser () {



        const promisse = axios.delete(`https://linker-api-4331.onrender.com/unfollow/${userId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });

        promisse.then((res) => {
            setFollow(false)
            
        });
        promisse.catch((err) => {
        console.log(err);
        alert(
            "Error"
        );
        });

    }

    

    return(
        <div >
            <Follow >{follow ? <div onClick={() => UnfollowUser()} className="true">Unfollow</div> : <div onClick={() => FollowUser()} className="false">Follow</div> }</Follow>
        </div>
        
    )
}

const Follow = styled.div`
    z-index: 100;

    cursor: pointer;

    .false {
        cursor: pointer;
        background: #1877F2;
        color: #FFFFFF;
        width: 112px;
        height: 31px;
        border-radius: 5px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        text-align: center;
        justify-content: center;
        align-items: center;
        display: flex;
    }

    .true {
        cursor: pointer;
        background: #FFFFFF;
        color: #1877F2;
        width: 112px;
        height: 31px;
        border-radius: 5px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        text-align: center;
        justify-content: center;
        align-items: center;
        display: flex;
    }
    
    
    
    
    
`