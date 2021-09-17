import React, { useContext} from 'react';
import { GlobalState } from '../../GlobalState';
import {Line} from 'react-chartjs-2';
import './home.css'
const Home = () => {
    const state = useContext(GlobalState)
    const [users] = state.userAPI.users
    const [stats] = state.userAPI.stats

    const staticUser = {
        labels: stats.map(stat=>stat.name),
        datasets: [
            {
                label:'Số liệu người đăng kí',
                data: stats.map(stat=>stat.total),
                backgroundColor: 'rgb(136, 4, 136)',
                borderColor: 'rgba(136, 4, 136,0.2)',
            }
        ],
    }
    return (
        <div className="home">
            <div className="graph__users">
                <div className="graph__users-heading">Phân tích người dùng</div>
                <Line
                    data={staticUser}
                    width={80}
                    height={40}
                />
            </div>
            <div className="detail__users">
                <div className="detail__users-heading">Mới đăng kí</div>
                <table className="detail__user-table">
                    <thead>
                        <tr>
                            <th className="detail__user-heading"> STT</th>
                            <th className="detail__user-heading">Tên người dùng</th>
                            <th className="detail__user-heading">Địa chỉ email </th>
                            <th className="detail__user-heading">Ngày đăng kí</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => {
                                return (

                                    <tr key={index} className="user__info">
                                        <td className="user__desc">
                                            {index + 1}
                                        </td >
                                        <td className="user__desc user__avatar">
                                            <img src={user.profilePic || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"} alt="" />
                                            <div> {user.username} </div>

                                        </td>
                                        <td className="user__desc">
                                            {user.email}
                                        </td >
                                        <td className="user__desc">
                                            {user.createdAt}
                                        </td>
                                    </tr>

                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
