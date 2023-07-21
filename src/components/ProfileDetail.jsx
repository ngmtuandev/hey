import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import { follow } from '../redux/authSlice'
import {Post, Upload} from './index'
const ProfileDetail = () => {

  const dispatch = useDispatch()

  const { token, newUser } = useSelector(state => state.user)
  const [profileUser, setProfileUser] = useState([])
  const [postUser, setPostUser] = useState()
  const [stateFollow, setStateFollow] = useState(true)
  const {id} = useParams()

  // console.log(id)

  useEffect( () => {
    const getDataApiUser = async () => {
      const getData = await fetch(`http://localhost:8080/nguoidung/${id}`, {
        headers: { "authorization": `Bearer ${token}` },
        method: 'GET',
      })
      const dataUser = await getData.json()
      // console.log(dataUser)
      
      setProfileUser(dataUser?.data)
      
      if (newUser?._id !== dataUser?.data?._id) {
        setStateFollow(newUser?.following?.includes(dataUser?.data?._id))
      }

    }
    getDataApiUser()

  }, [])
  // console.log(profileUser)
  // console.log(stateFollow)

  const handleFollow = async () => {
    await fetch(`http://localhost:8080/nguoidung/theo-doi/${id}`, {
      headers: {"authorization" : `Bearer ${token}`},
      method: 'PUT'
    })
    dispatch(follow(id))
    setProfileUser((state) => {
      return {
        ...state, 
        follower: stateFollow ? [...state?.follower].filter(idF=>idF !== newUser?._id) 
        : [...state?.follower, newUser?._id]
      }
    })
    setStateFollow(state => !state)
  }

  useEffect(() => {
    const getDataApiPost = async () => {
      const dataPost = await fetch(`http://localhost:8080/bai-dang/nguoi-dang-bai/${id}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
      })
      const data = await dataPost.json()
      // console.log('dataaaaaaa : ', data?.data)
      setPostUser(data?.data)
    }
    getDataApiPost()
  }, [])
  // console.log('id', id)?.profileimg
  // console.log(newUser?._id)
  // console.log('check user',id === newUser?._id)

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center mt-8 mb-5'>
        <div>
          <img className='w-[70px]'
          src={ profileUser?.profileimg ? `http://localhost:8080/images/${profileUser?.profileimg}` 
          : 'https://www.shareicon.net/data/512x512/2016/09/01/822711_user_512x512.png'} alt=''></img>
        </div>
        <div className='flex flex-col items-center'>
          <div className='font-semibold text-[21px] mt-2'><span>{profileUser?.username}</span></div>
          <div className='text-gray-700 text-[14px] font-medium'><span>@{profileUser?.email}</span></div>
          <div><span className='text-gray-700'
          >{profileUser?.info ? profileUser?.info : 'Thông tin người dùng đang cập nhập'}</span></div>
          <div className='flex'>
            <span className='mx-3'>{profileUser?.follower?.length} người theo dõi</span>
            <span className='mx-3'>{profileUser?.following?.length} đang theo dõi</span>
          </div>
          <div>
            {
              stateFollow ? <span className='cursor-pointer' onClick={handleFollow}>Bỏ Theo Dõi</span> 
              : <span className='cursor-pointer' onClick={handleFollow}>Theo Dõi</span>
            }
          </div>
        </div>
      </div>
      {
        id === newUser?._id &&
          (
            <div>
              <Upload></Upload>
            </div>
          )
      }
      <div className='w-[600px] '>
        {
          postUser?.length > 0 && postUser?.map((post, index) => (
            <div className='flex justify-center mb-14' key={index}><Post post={post}></Post></div>
          ))
        }
      </div>
    </div>
  )
}

export default ProfileDetail