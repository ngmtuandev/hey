import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {login} from '../redux/authSlice'

const Login = () => {

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (userName === '' || userEmail === '' || password === '') {
      alert("Bạn không được bỏ trống thông tin")
    }
    else {
      const responseApi = await fetch('http://localhost:8080/dangnhap', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          email:userEmail,
          username:userName,
          password:password
        })
      })
      const data = await responseApi.json()
      console.log('data login', data)
      dispatch(login(data))
      if (data.token !== undefined) {
        navigate('/')
      }
    }
  }
  return (
    <div>
      <div className='flex flex-col justify-center items-center mt-[140px]'>
        <h2 className='mb-5'>Đăng nhập với Hey</h2>
        <form onSubmit={handleSubmit} className='flex flex-col w-[290px]'>
          <input className='mb-5 outline-none' type='text' placeholder='Tên'
          onChange={(e) => setUserName(e.target.value)}
          ></input>
          <input className='mb-5 outline-none' type='text' placeholder='Email'
          onChange={(e) => setUserEmail(e.target.value)}
          ></input>
          <input className='mb-5 outline-none' type='password' placeholder='Mật khẩu'
          onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type='submit'>Đăng Nhập</button>
          <p>Bạn chưa có tài khoản <Link to='/signup'>Đăng kí</Link> ngay </p>
        </form>
      </div>
    </div>
  )
}

export default Login