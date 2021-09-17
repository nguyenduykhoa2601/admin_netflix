
import { Link } from 'react-router-dom'
import './menu.css';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Menu = () => {
    const location = useLocation()
    return (
        <div className="menu">

            <ul className="menu__list">
                <li className="menu__list-heading">
                    Quản lí nội dung phim
                </li>
                <Link to="/" className="menu__item-link">
                    <li className={location.pathname === '/' ? 'menu__item menu__item--active' : 'menu__item'}>
                        <i className="fas fa-home"></i>Trang chủ
                    </li>
                </Link>
                <Link to="/movies" className="menu__item-link">
                    <li className={location.pathname === '/movies' ? 'menu__item menu__item--active' : 'menu__item'}>
                        <i className="far fa-play-circle"></i> Danh sách phim
                    </li>
                </Link>
                <Link to="/lists" className="menu__item-link">
                    <li className={location.pathname === '/lists' ? 'menu__item menu__item--active' : 'menu__item'}>
                        <i className="fas fa-bars"></i> Danh sách loại phim
                    </li>
                </Link>
                <Link to="/addmovies" className="menu__item-link">
                    <li className={location.pathname === '/addmovies' ? 'menu__item menu__item--active' : 'menu__item'}>
                        <i className="fas fa-tv"></i>Thêm phim
                    </li>
                </Link>
                <Link to="/addlists" className="menu__item-link">
                    <li className={location.pathname === '/addlists' ? 'menu__item menu__item--active' : 'menu__item'}>
                        <i className="fas fa-id-badge"></i>Thêm loại phim
                    </li>
                </Link>

            </ul>

        </div>
    );
}

export default Menu;
