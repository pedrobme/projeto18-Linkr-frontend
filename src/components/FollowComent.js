import { useEffect, useState } from "react";
import axios from "axios";

export default function FollowComment({userId}){
    const authToken = localStorage.getItem("authToken");
    const [followList, setFollowList] = useState([])
    const [follow, setFollow] = useState(false)

    useEffect(()=> {
        const promisse = axios.get(`http://localhost:5001/followers/${userId}`, {
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

    return( 
        <div>{userId === followList.followedId ? 'following' : ''}</div>
    )
} 