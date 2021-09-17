import axios from 'axios';
import React, { useState } from 'react';
import './login.css'
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/auth/login', { email, password })
            if (res.data.isAdmin === true) {
                localStorage.setItem('admin', res.data.accessToken)
                localStorage.setItem('adName',res.data.username)
                window.location.href = "/"
            }
        } catch (error) {

        }
    }
    return (

        <div className="login">
            <div className="login__heading">
                <img src="https://assets.brand.microsites.netflix.io/assets/493f5bba-81a4-11e9-bf79-066b49664af6_cm_1440w.png?v=30" alt="" />
                <button className="btn__login">Đăng nhập</button>
            </div>

            <div className="form" >
                <div className="form__heading">Đăng nhập AD</div>
                <input type="text" name="email" onChange={e => setEmail(e.target.value)} />
                <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
                <div className="policy__term">Nếu bạn đồng ý với 
                <span> Điều khoản dịch vụ</span> & <span>Chính sách</span> của Netflix hãy đăng nhập
                </div>
                <button onClick={onSubmit} className="btn__submit">Đăng nhập</button>
            </div>

        </div>

    );
}

export default Login;
