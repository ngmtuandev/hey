import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {register} from '../redux/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
 

  const dispath = useDispatch()
  const navigate = useNavigate()

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (userName === '' || userEmail === '' || password === '') {
      alert("Bạn không được bỏ trống thông tin")
    }
    else {
      const responseApi = await fetch('http://localhost:8080/dangky', {
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

      const data = await responseApi?.json()

      dispath(register(data))

      if (data.token !== undefined) {
        navigate('/')
      }

    }
  }

  return (
    <div>
      <div className='flex flex-col justify-center items-center mt-[140px]'>
        <h2 className='mb-5'>Đăng kí tài khoản Hey</h2>
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
          <button type='submit'>Đăng Ký</button>
          <p>Bạn đã có tài khoản <Link to='/login'>Đăng nhập</Link> ngay </p>
        </form>
      </div>
    </div>
  )
}

export default Signup