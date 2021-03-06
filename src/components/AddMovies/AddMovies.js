import { Grid } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import storage from '../../Firebase';
import { GlobalState } from '../../GlobalState';
import Loading from '../utils/Loading/Loading';
import UtilModal from '../utils/Modal/Modal';
import './addMovies.css'
const initialState= {
    img: '',
    imgTitle: '',
    imgSm: '',
    title:'',
    trailer:'',
    desc:'',
    year:'',
    limit: 0,
    isSeries: false,
    video: '',
    genre: '',
    duration: 0,
}
const AddMovies = () => {
    const state= useContext(GlobalState)
    const [token] = state.token
    const [movie,setMovie] = useState(initialState)
    const [img,setImg] = useState(null)
    const [imgTitle,setImgTitle] = useState(null)
    const [imgSm,setImgSm] = useState(null)
    const [trailer,setTrailer] = useState(null)
    const [video,setVideo] = useState(null)
    const [uploaded,setUploaded] = useState(0)
    const [onEdit,setOnEdit] = useState(false)
    const params= useParams()
    const [progressUpload,setProgressUpload] = useState(0)
    const [movies] = state.moviesAPI.movies
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

 
    useEffect (() =>{
        if(params.id){
            setOnEdit(true)
            movies.forEach(movie=>{
                if (movie._id === params.id){
                    setMovie(movie) 
                }
            })
        }
        else{
            setOnEdit(false)
        }
        
    },[params.id,movies])
    const handleChange = (e)=>{
        const value = e.target.value
        setMovie({...movie,[e.target.name]: value})
    }
    const upload = (items)=>{
        items.forEach((item) => {
            const fileName = new Date().getTime() + item.label + item.file.name;
            const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log("Upload is " + progress + "% done"); 
                setProgressUpload(progress)
              },
              (error) => {
                console.log(error);
              },
              () => {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                  setMovie((prev) => {
                    return { ...prev, [item.label]: url };
                  });
                  setUploaded((prev) => prev + 1);
                });
              }
            );
          });
    }
    
    const handleUpload = async(e)=>{
        e.preventDefault()
        await upload([
            {file: img, label:"img"},
            {file: imgTitle, label:"imgTitle"},
            {file: imgSm, label:"imgSm"},
            {file: trailer, label:"trailer"},
            {file: video, label:"video"},
        ])
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if (onEdit){
            try {
                await axios.put(`/movies/${movie._id}`,movie,{
                    headers:{
                        token: `Bearer ${token}` 
                    }
                })
                await setModal(true)
                await setTextModal('C???p nh???t th??nh c??ng')
                await setTypeModal(true)
                window.location.reload()
                window.location.href="/movies"
            } catch (error) {
                alert(error)
            }
        }
        else{
            try {
                await axios.post('/movies',movie,{
                    headers:{
                        token: `Bearer ${token}` 
                    }
                })
                await setModal(true)
                await setTextModal('Th??m th??nh c??ng')
                await setTypeModal(true)
                window.location.reload()
                window.location.href="/movies"
            } catch (error) {
                alert(error)
            }
        }
    }
    
    if ( progressUpload<100 && progressUpload >0 && uploaded <5 && uploaded > 0) return <Loading text={progressUpload}/>
    return (
        <div className="admin__add-movies">
            <div className="add__movies-heading">Th??m phim m???i</div>
            <Grid container spacing={1}>
                <Grid item sm={4}>
                    <div className="movie__heading">???nh</div>
                    <input type="file" className="input-img" name="img"  onChange={e=>setImg(e.target.files[0])} />
                </Grid>
                <Grid item sm={4}>
                    <div className="movie__heading">???nh ti??u ?????</div>
                    <input type="file" className="input-img" name="imgTitle"  onChange={e=>setImgTitle(e.target.files[0])} />
                </Grid>
                <Grid item sm={4}>
                    <div className="movie__heading">???nh nh???</div>
                    <input type="file" className="input-img" name="imgSm"  onChange={e=>setImgSm(e.target.files[0])}/>
                </Grid>

            </Grid>
            <br/>
            <br />
            <br />
            <Grid container spacing={1}>
                <Grid item sm={4}>
                    <div className="movie__heading">Ti??u ?????</div>
                    <input type="text" className="input-text" placeholder="Ti??u ?????" value={movie.title} name="title" onChange={handleChange} />
                </Grid>
                <Grid item sm={4}>
                    <div className="movie__heading">M?? t???</div>
                    <input type="text" className="input-text" placeholder="M?? t???"  value={movie.desc} name="desc" onChange={handleChange} />
                </Grid>
                <Grid item sm={4}>
                    <div className="movie__heading">N??m</div>
                    <input type="text" className="input-text" placeholder="N??m s???n xu???t"  value={movie.year} name="year" onChange={handleChange} />
                </Grid>
            </Grid>
            <br/>
            <br />
            <br />
            <Grid container spacing={1}>
                <Grid item sm={4}>
                    <div className="movie__heading">Th??? lo???i</div>
                    <input type="text" className="input-text" placeholder="Th??? lo???i"  value={movie.genre} name="genre" onChange={handleChange} />
                </Grid>
                <Grid item sm={4}>
                    <div className="movie__heading">Th???i gian</div>
                    <input type="text" className="input-text" placeholder="Th???i l?????ng phim"  value={movie.duration} name="duration" onChange={handleChange} />
                </Grid>
                <Grid item sm={4}>
                    <div className="movie__heading">????? tu???i</div>
                    <input type="text" className="input-text" placeholder="????? tu???i t???" name="limit" value={movie.limit} onChange={handleChange} />
                </Grid>
            </Grid>
            <br/>
            <br />
            <br />
            <Grid container spacing={1}>
                <Grid item sm={4}>
                    <div className="movie__heading">Truy???n h??nh?</div>
                    <select className="input-select" name="isSeries" onChange={handleChange} value={movie.isSeries} >
                        <option value={true}>Truy???n h??nh</option>
                        <option value={false}>Chi???u r???p</option>
                    </select>
                </Grid>
                <Grid item sm={4}>
                    <div className="movie__heading">Trailer</div>
                    <input type="file" className="input-video" name="trailer" onChange={e=>setTrailer(e.target.files[0])}/>
                </Grid>
                <Grid item sm={4}>
                    <div className="movie__heading">Video</div>
                    <input type="file" className="input-video" name="video" onChange={e=>setVideo(e.target.files[0])} />
                </Grid>
            </Grid>
            <br/>
            <br />
            {
                uploaded ===5 ? 
                <button className="upload-movie" onClick={handleSubmit}>{onEdit?'C???p nh???t':'T???o'}</button>
                :
                <button className="upload-movie" onClick={handleUpload}>{onEdit?'Editing' :'Upload'} </button>

            }
            {
                ModalNofity(textModal,typeModal)
            }
        </div>
    );
}

export default AddMovies;
