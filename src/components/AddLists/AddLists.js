import { Grid } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { GlobalState } from '../../GlobalState';
import UtilModal from '../utils/Modal/Modal';
import './addLists.css';
const initTialState = {
    title: '',
    genre: '',
    type: '',
    content: []
}
const AddLists = () => {
    const state = useContext(GlobalState)
    const [movies] = state.moviesAPI.movies
    const [lists] = state.listsAPI.lists
    const [list, setList] = useState(initTialState)
    const params = useParams()
    const [onEdit, setOnEdit] = useState(false)
    const [modal, setModal] = useState(false)
    const [textModal, setTextModal] = useState('')
    const [typeModal, setTypeModal] = useState()

    useEffect(() => {
        if (params.id) {
            setOnEdit(true)
            lists.forEach(listItem => {
                if (params.id === listItem._id) {
                    setList(listItem)

                }
            })
        }
        else {
            setOnEdit(false)
        }
    }, [lists, params.id])

    const ModalNofity = (text, type) => {

        if (modal) {
            setTimeout(() => {
                setModal(!modal)
            }, 500)
            return <UtilModal state={modal} text={text} type={type} />
        }
    }
    const addToList = async (movie) => {
        if(list.content.length < 20){
            list.content.push(movie)
            await setList({...list})
        }
        else{
            alert('Mỗi danh sách chỉ được tối đa 20 phim')
        }
        
    }

    const deleteToList = async (movie) => {
        var newList=list.content.filter(item => item._id !== movie._id)
        await setList({...list,content:newList})
    }


    const handleChange = (e) => {
        const value = e.target.value
        setList({ ...list, [e.target.name]: value })
    }
    const handleSumit = async (e) => {
        e.preventDefault()
        if (onEdit) {
            try {
                await axios.put(`/lists/${list._id}`, list, {
                    headers: { token: `Bearer ${localStorage.getItem('admin')}` }
                })
                await setModal(true)
                await setTextModal('Cập nhật thành công')
                await setTypeModal(true)
                window.location.reload();
                window.location.href = "/lists"
            } catch (error) {
                alert(error)
            }
        }
        else {
            try {
                await axios.post('/lists', list, {
                    headers: { token: `Bearer ${localStorage.getItem('admin')}` }
                })
                await setModal(true)
                await setTextModal('Thêm thành công')
                await setTypeModal(true)
                window.location.reload();
                window.location.href = "/lists"
            } catch (error) {
                alert(error)
            }
        }

    }
    return (
        <div className="admin__new-list">
            <div className="new__list-heading">Thêm danh sách phim</div>
            <Grid container spacing={1}>
                <Grid item sm={5}>
                    <div className="title__list">
                        <div className="title__list-heading">Tiêu đề</div>
                        <input type="text" placeholder="Phim Hàn" name="title" value={list.title} onChange={handleChange} />
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="title__list">
                        <div className="title__list-heading">Thể loại</div>
                        <input type="text" placeholder="Hành động" name="genre" value={list.genre} onChange={handleChange} />
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="title__list">
                        <div className="title__list-heading">Loại</div>
                        <select name="type" onChange={handleChange} value={list.type}>
                            <option value="horror">Kinh dị</option>
                            <option value="fiction">Viễn tưởng</option>
                            <option value="anime">Hoạt hình</option>
                            <option value="entertain">Chương trình giải trí</option>
                            <option value="action">Hành động</option>
                            <option value="trailer">Phim sắp ra mắt</option>
                        </select>
                    </div>

                </Grid>
                <Grid item sm={5}>
                    <div className="title__list-heading">Nội dung</div>
                    <div className="list-content">
                        {
                            list.content.map((item, index) => {
                                return (
                                    <div key={index} className="list__item-movie">
                                        <span className="list__item-title">{item.title}</span>
                                        <i className="list__item-icon fas fa-trash" onClick={() => deleteToList(item)}></i>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Grid>
                <Grid item sm={2}>
                    <button className="list-create" onClick={handleSumit} >{onEdit ? 'Update' : 'Tạo'}</button>
                    {ModalNofity(textModal, typeModal)}
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <table className="addlist__movies" >
                    <thead>
                        <tr>
                            <th className="addlist__movie-index">STT</th>
                            <th className="addlist__movie-name">Tên phim</th>
                            <th className="addlist__movie-year">Năm sản xuất</th>
                            <th className="addlist__movie-limit">Độ tuổi</th>
                            <th className="addlist__movie-series">IsSeries</th>
                            <th className="addlist__movie-action">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movies.map((movie, index) => {
                                return (
                                    <tr className="addlist__movie-item" key={index}>
                                        <td>{index + 1}</td>
                                        <td>{movie.title}</td>
                                        <td>{movie.year}</td>
                                        <td>{movie.limit}</td>
                                        <td>{movie.isSeries ? 'Có' : 'Không'}</td>
                                        <td >
                                            <button className="addlist__movie-add" onClick={() => addToList(movie)}>Add List</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </Grid>
        </div>
    );
}

export default AddLists;
