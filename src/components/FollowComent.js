import { useEffect, useState } from "react";
import axios from "axios";

export default function FollowComment({userId}){
    const authToken = localStorage.getItem("authToken");
    const [followList2, setFollowList2] = useState([])
    

    useEffect(()=> {
        const promisse = axios.get(`http://localhost:5000/followers/${userId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });

        promisse.then((res) => {
        console.log("comentario")
        console.log(res.data)
        setFollowList2(res.data)
        if(!res.data.length){
            return
        }
        
        
    });
    promisse.catch((err) => {
      console.log(err);
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    });
    }, [])

    return( 
        <div>{followList2.length > 0 ? 'following' : ''}</div>
    )
} 