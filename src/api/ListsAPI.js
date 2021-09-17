import {useEffect,useState} from 'react';
import axios from 'axios';
const ListsAPI = (token) => {
    const [lists,setLists] = useState([])

    useEffect(()=>{
        if (token){
            const getMovies = async()=>{
                try {
                    const res = await axios.get('/lists',{
                        headers: {token : `Bearer ${token}`}
                    })
                    setLists(res.data)
                } catch (error) {
                    alert(error)
                }
            } 
            getMovies()
        }
        
    },[token])
    return {
        lists: [lists,setLists]
    }
}

export default ListsAPI;
