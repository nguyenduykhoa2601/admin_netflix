import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import UtilModal from '../utils/Modal/Modal';

import './movies.css';
const Movies = () => {
    const state = useContext(GlobalState)
    const [movies] = state.moviesAPI.movies
    const [modal, setModal] = useState(false)
    const [textModal, setTextModal] = useState('')
    const [typeModal, setTypeModal] = useState()

    const ModalNofity = (text, type) => {

        if (modal) {
            setTimeout(() => {
                setModal(!modal)
            }, 500)
            return <UtilModal state={modal} text={text} type={type} />
        }
    }
    const handleDetele = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa phim này?')) {
            try {
                await axios.delete(`/movies/${id}`, {
                    headers: { token: `Bearer ${localStorage.getItem('admin')}` }
                })
                await setModal(true)
                await setTextModal('Xóa thành công')
                await setTypeModal(false)
                window.location.reload()
                window.location.href = "/movies"

            } catch (error) {
                alert(error)
            }
        }

    }
    return (
        <div className="admin__movies">
            <div className="admin__movies-heading">Danh sách phim</div>
            <table className="admin__movies-detail">
                <thead>
                    <tr className="table__title">
                        <th>STT</th>
                        <th>ID</th>
                        <th>Tên phim</th>
                        <th>Thể loại</th>
                        <th>Năm sản xuất</th>
                        <th>Độ tuổi</th>
                        <th>Series</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        movies.map((movie, index) => {
                            return (
                                <tr className="detail__movie" key={index}>
                                    <td className="movie__index">{index + 1}</td>
                                    <td className="movie__id">{movie._id}</td>
                                    <td className="movie__name">
                                        <div>
                                            <img src={movie.imgSm} alt="" />
                                            <span>{movie.title}</span>
                                        </div>

                                    </td>
                                    <td className="movie__genre">{movie.genre} </td>
                                    <td className="movie__year">{movie.year}</td>
                                    <td className="movie__limit">{movie.limit}</td>
                                    <td className="movie__series">{movie.isSeries === true ? 'Có' : 'Không'}</td>
                                    <td className="movie__action">
                                        <Link to={`/edit_movie/${movie._id}`}>
                                            <button className="movie__action-fix" >Chỉnh sửa</button>
                                        </Link>
                                        <i className="fas fa-trash" onClick={() => handleDetele(movie._id)}></i>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {ModalNofity(textModal,typeModal)}



                </tbody>
            </table>
        </div>
    );
}

export default Movies;
