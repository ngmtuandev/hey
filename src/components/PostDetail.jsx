import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import icons from '../util/icon'
import {Comment} from './index'
import {useSelector} from 'react-redux'
import moment from 'moment'

const PostDetail = () => {

  const {MdLocationPin} = icons

  const {token} = useSelector(state => state.user)

  const {id} = useParams()
  const [itemPost, setItemPost] = useState([])
  const [commentPost, setCommentPost] = useState([])
  const [showComment, setShowComment] = useState(false)
  const [textComment, setTextComment] = useState('')

  useEffect(() => {
    const getApiOnePost = async () => {
      const dataApi = await fetch(`http://localhost:8080/bai-dang//bai-viet/${id}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
      })
      const dataPost = await dataApi.json()
      setItemPost(dataPost?.findPostID)
    }
    getApiOnePost()
  }, [])

  // console.log(itemPost)

  useEffect(() => {
    const getApiDataCommentPost = async () => {
      const dataComment = await fetch(`http://localhost:8080/binh-luan/tat-ca-binh-luan/${id}`, {
        headers: { 'Content-Type': 'application/json'},
        method: 'GET',
      })
      const dataJson = await dataComment.json()
      setCommentPost(dataJson?.data) 
    }
    getApiDataCommentPost()
  }, [])


  const handelAddComment = () => {
    const getApiDataComment = async () => {
      const dataApiComment = await fetch(`http://localhost:8080/binh-luan/`,{
        headers: {'Content-Type': 'application/json',
        "authorization": `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify({
          "post": id,
          "textComment": textComment
        })
      })
      const dataComment = await dataApiComment.json()
      // console.log(dataComment?.newComment)
      setCommentPost(data => [...data, dataComment?.newComment])
    }
    getApiDataComment()
    setTextComment('')
    setShowComment(state => !state)
  }

  console.log('itemposst', itemPost?.user?.profileimg)

  return (
    <div className='bg-gray-800 h-[100%] px-5 py-16 bg-opacity-20'>
      <div className=' flex'>
        <div className='w-[65%]'><img className='w-[80%]'
        src={itemPost?.photo && `http://localhost:8080/images/${itemPost?.photo}`} alt="" /></div>
        <div className='w-[35%]'>
          <Link className='flex items-center'
          to={`/profile-detail/${itemPost?.user?._id}`}>
            <img className='w-[8%] mr-3'
            src={itemPost?.user?.profileimg ? `http://localhost:8080/images/${itemPost?.user?.profileimg}` 
            : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt=''></img>
            <div className='flex flex-col'>
              <span>{itemPost?.user?.username}</span>
              <span>{moment(`${itemPost?.createdAt}`).format('YYYY-MM-DD HH:mm')}</span>
            </div>
          </Link>
          <div className='mt-3'><span className='text-[14px] font-normal flex items-center'><span><MdLocationPin size={22}></MdLocationPin></span>
            {itemPost?.location ? itemPost?.location : 'Đang cập nhập'}
          </span></div>
          <div className='flex flex-col border-b-2 border-gray-600 pb-4 mt-3 mb-6'>
            <span className='font-medium text-gray-600'>{itemPost?.title}</span>
            <span>{itemPost?.content}</span>
          </div>
          <div>
            { 
              showComment ? (<div>
                
                  {
                  commentPost?.length > 0 ? ( <div>
                  {
                    commentPost?.map((data, index) => (
                      <div key={index}>
                        <Comment data = {data}></Comment>
                      </div>
                  )) 
                }
              </div> ) : (<div>Bài viết này chưa có bình luận</div>)
            }
                
              </div>) : (<div></div>)
            }
          <button onClick={() => setShowComment(state => !state)}>{showComment ? 'Ẩn bình luận' : 'Xem bình luận'}</button>
          <div>
            <div><input type="text" value={textComment} onChange={(e) => setTextComment(e.target.value)} /></div>
            <button onClick={handelAddComment}>Bình luận</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail