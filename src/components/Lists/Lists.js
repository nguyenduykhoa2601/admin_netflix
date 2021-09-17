import { Link } from 'react-router-dom';
import React, { useContext,useState } from 'react';
import { GlobalState } from '../../GlobalState';
import UtilModal from '../utils/Modal/Modal';
import './lists.css'
import axios from 'axios';
const Lists = () => {
    const state = useContext(GlobalState)
    const [lists] = state.listsAPI.lists
    const [modal,setModal] = useState(false)
    const [textModal,setTextModal] = useState('')
    const [typeModal,setTypeModal] = useState()

    const ModalNofity = (text,type)=>{
        
        if(modal){
            setTimeout(()=>{
                setModal(!modal)
            },500)
            return <UtilModal state={modal} text={text} type={type} />
        }
    }

    const handleDelete = async(id)=>{
        if (window.confirm('Bạn có chắc muốn xóa danh mục này?')){
            try {
                await axios.delete(`/lists/${id}`,{
                    headers:{token: `Bearer ${localStorage.getItem('admin')}`}
                })
                await setModal(true)
                await setTextModal('Xóa thành công')
                await setTypeModal(false)
                window.location.reload()
               
            } catch (error) {
                alert(error)
            }
        }
    }
    return (
        <div className="admin__lists">
            <div className="admin__lists-heading">Thể loại phim</div>
            <table className="table__lists">
                <thead>
                    <tr className="table__lists-heading">
                        <th>STT</th>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Thể loại</th>
                        <th>Loại</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lists.map((list, index) => {
                            return (
                                <tr className="detail__list" key={index}>
                                    <td className="list__index">{index + 1}</td>
                                    <td className="list__id">{list._id}</td>
                                    <td className="list__title">{list.title}</td>
                                    <td className="list__gerne">{list.genre}</td>
                                    <td className="list__type">{list.type}</td>
                                    <td className="list__action">
                                        <Link to={`/edit_list/${list._id}`}>
                                            <button className="list__action-fix">Chỉnh sửa</button>
                                        </Link>

                                        <i className="fas fa-trash" onClick={()=>handleDelete(list._id)}></i>
                                        {ModalNofity(textModal,typeModal)}
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>

        </div>
    );
}

export default Lists;
