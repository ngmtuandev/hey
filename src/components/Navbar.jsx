import React, { useState } from 'react'
import icons from '../util/icon'
import {Link, useNavigate} from 'react-router-dom'
import path from '../util/path'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../redux/authSlice'
const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {HiSearch, AiOutlineLogout, AiOutlineUser}  = icons
  const [showModelProfile, setShowModelProfile] = useState(false)

  const {newUser} = useSelector(state => state?.user)

  const handleLogout =() => {
    dispatch(logout())
    navigate('/login')
  }


  return (
    <div className='flex justify-center items-center h-[70px] bg-[rgb(59,224,203)] px-5'>
      <div className='w-[30%]'><span className='text-[27px]'><Link to='/'>Hey Media</Link></span></div>
      <div className='w-[40%]'>
        <div className='relative'>
          <input className='w-[350px] rounded-full px-3 h-8 outline-none' type="text" />
          <div className='absolute ml-[315px] top-[5px] text-gray-600 cursor-pointer'><HiSearch size={22}></HiSearch></div>
        </div>
      </div>
      <div className='w-[30%] flex items-center justify-end'>
        <div className=''>
          <Link to={path.UPLOAD}>Cập nhập</Link>
        </div>
        <div className='ml-8'>
          <Link to={path.CHAT}>Tin Nhắn</Link>
        </div>
        <div className='flex'>
        <Link to={`/profile-detail/${newUser?._id}`}>
            <div className='ml-8 cursor-pointer'><AiOutlineUser size={22}></AiOutlineUser></div>
          </Link>
          <div onClick={handleLogout} 
          className='ml-8 cursor-pointer'><AiOutlineLogout size={22}></AiOutlineLogout></div>
        </div>
        <div onClick={() => setShowModelProfile(state => !state)}
        ><img className='w-10 rounded-full ml-8 cursor-pointer' 
          src={ newUser?.profileimg ? `http://localhost:8080/images/${newUser?.profileimg}` 
         : 'https://www.shareicon.net/data/512x512/2016/09/01/822711_user_512x512.png'} alt='avatar'></img></div>
        {
          showModelProfile && (
          <div className='absolute mt-48'>
            <ul>
              <li><Link to={`/profile-detail/${newUser?._id}`}>Trang cá nhân</Link></li>
              <li><Link to={`/upload-user/${newUser?._id}`}>Chỉnh sửa thông tin</Link></li>
              <li>Phản hồi ý kiến</li>
              <li>Cài đặt & Quyền riêng tư</li>
              <li onClick={handleLogout}><Link >Đăng xuất</Link></li>
            </ul>
          </div>
          )
        }
      </div>
    </div>
  )
}

export default Navbar