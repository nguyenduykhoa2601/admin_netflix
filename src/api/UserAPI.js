import axios from "axios";
import { useEffect, useState, useMemo } from 'react';


const UserAPI = (token) => {
    const [isLogged, setIsLogged] = useState(false)
    const [users, setUsers] = useState([])
    const [stats, setStats] = useState([])
    
    const MONTHS = useMemo(() => [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ], [])
    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/users?new=true', {
                        headers: { token: `Bearer ${token}` }
                    })
                    setIsLogged(true)
                    setUsers(res.data)
                } catch (error) {

                }
            }

            const getStats = async () => {
                try {
                    const res = await axios.get('/users/stats', {
                        headers: { token: `Bearer ${token}` }
                    })
                    const statsList= res.data.sort(function(stat_a,stat_b){
                        return stat_a._id-stat_b._id
                    })
                    statsList.map(stat => setStats(prev => [...prev, { name: MONTHS[stat._id - 1], "total": stat.total }]))
                } catch (error) {

                }
            }
            getUser()
            getStats()
        }

    }, [token,MONTHS])
    return {
        isLogged: [isLogged, setIsLogged],
        users: [users, setUsers],
        stats: [stats, setStats]
    }
}

export default UserAPI;
