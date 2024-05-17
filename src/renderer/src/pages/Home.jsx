import { useEffect, useState, useCallback } from "react";
import API from "../utils/api";

function Home() {
    const [users, setUsers] = useState([])

    const getUsers = useCallback(async ( )=> {
        const { data } = await API.get('/users', {headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}` 
        }})

        if(data){
            setUsers(data)
        }


    }, [])
    
    useEffect(()=>{
        getUsers()
    },[getUsers])

    return <>
    {users.map((user) => <div>{user.email}</div>)}
    </>
}

export default Home;