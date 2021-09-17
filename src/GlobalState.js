import React,{createContext,useState,useEffect} from "react";
import { Users } from "./initData";
import UserAPI from "./api/UserAPI";
import MoviesAPI from "./api/MoviesAPI";
import ListsAPI from "./api/ListsAPI";
export const GlobalState = createContext()
export const DataProvider = ({children}) =>{
    const [token,setToken] = useState('')
    const [users,setUsers] = useState([]) 
    
    
        useEffect(()=>{
        const firstLogin = localStorage.getItem('admin')
        
        setToken(firstLogin)
        
        setUsers(Users)
        setTimeout(() => {
            localStorage.removeItem('admin')
            localStorage.removeItem('adName')
        }, 1000*60*60*24*10);
    },[users,token])
    const state = {
        users: [users,setUsers],
        userAPI: UserAPI(token),
        token: [token,setToken],
        moviesAPI: MoviesAPI(token),
        listsAPI: ListsAPI(token)

    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}