import axios from 'axios';
import { useState,useEffect } from 'react';

const MoviesAPI = (token) => {
    const [movies,setMovies] = useState([])

    useEffect(()=>{
        if (token){
            const getMovies = async()=>{
                try {
                    const res = await axios.get('/movies',{
                        headers: {token : `Bearer ${token}`}
                    })
                    setMovies(res.data)
                } catch (error) {
                    alert(error)
                }
            } 
            getMovies()
        }
        
    },[token])
    return {
        movies: [movies,setMovies]
    }
    
}

export default MoviesAPI;
