import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import icons from '../util/icon'
import moment from 'moment'


const Comment = (data) => {
  const {token, newUser} = useSelector(state => state.user)
  const [dataComment, setDataComment] = useState(data?.data)
  const [like, setLike] = useState(dataComment?.likes?.includes(newUser?._id))

  // console.log(like)
  // console.log('data comment: ', dataComment)

  const {AiFillDislike, AiFillLike, AiOutlineLike} = icons

  const handleLikeComment = async () => {
    await fetch(`http://localhost:8080/binh-luan/thich-binh-luan/${dataComment?._id}`,
    {headers: {"authorization" : `Bearer ${token}`},
    method: 'PUT'
    }
    )

    setDataComment(data => ({...data, likes: like ? [...data?.likes]?.filter(id => id !== newUser?._id) : 
      [...data?.likes, newUser?._id]
    }))

    setLike(like => !like)

  }

  return (
    <div className='my-3'>
      <div className='flex items-center'>
        <div><img
        className='w-[30px]' 
        src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png" alt="" /></div>
        <div className='ml-2'>
          <div className='text-[15px] font-semibold'>{dataComment?.user?.username}</div>
          <div className='text-[11px] font-medium text-gray-600'>{moment(`${dataComment?.createdAt}`).format('YYYY-MM-DD HH:mm')}</div>
        </div>
      </div>
      <div>{dataComment?.textComment}</div>
      <div className='flex items-center'>
        {like ? (<div onClick={handleLikeComment}><AiFillLike></AiFillLike></div>) : (<div onClick={handleLikeComment}><AiOutlineLike></AiOutlineLike></div>) }
        <span className='ml-2'>{dataComment?.likes?.length} lượt thích</span>
      </div>
    </div>
  )
}

export default Comment