import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Comment} from './index'
import { Link } from 'react-router-dom'
import icons from '../util/icon'
import moment from 'moment'
const Post = (post) => {
  console.log('post dataaaa: ', post)

  const {BiDotsVerticalRounded, AiFillHeart, AiOutlineHeart, BiComment} = icons
  const {token, newUser} = useSelector(state => state.user)
  const [displayComment, setDisPlayComment] = useState(false)
  const [modelOption, setModelOption] = useState(false)
  const [likePost, setLikePost] = useState(post?.post?.likes.includes(newUser?._id))
  const [commentPost, setCommentPost] = useState()
  const [textComment, setTextComment] = useState('')

  // console.log('test image data avatar', newUser?.profileimg)
  // console.log('test img post', post?.post?.photo)
  // console.log(likePost)

  // console.log(token)

  useEffect(() => {

    const dataApiComment = async () => {
      const dataComment = await fetch(`http://localhost:8080/binh-luan/tat-ca-binh-luan/${post?.post?._id}`,
      {method: 'GET'}
      )

      const data = await dataComment.json()

      setCommentPost(data?.data)

      // console.log('data commnet : ', data)

    }
    dataApiComment()


  }, [])

  // console.log('commentPost',commentPost)

  const handleDeletePost = async () => {
      await fetch(`http://localhost:8080/bai-dang/xoa-bai-viet/${post?.post?._id}`,
      {
        headers: {'authorization' : `Bearer ${token}`},
        method: 'DELETE',
      })
      window.location.reload()
  }

  const handleLikePost = async () => {
    await fetch(`http://localhost:8080/bai-dang/thich-bai-viet/${post?.post?._id}`,
    {
        headers: {'authorization' : `Bearer ${token}`},
        method: 'PUT',
    })
    window.location.reload()
  }

  const handleAddComment = async () => {

    if (textComment === '') 
    {
      alert('Bình luận bạn không được để trống')
    }
    else {
    const dataApiComment = await fetch('http://localhost:8080/binh-luan/',
    {headers: {"Content-Type": 'application/json',
                "authorization": `Bearer ${token}`
    },
    method: 'POST',
    body: JSON.stringify({
      "post": post?.post?._id,
      "textComment": textComment
    })
    }
    )

    const dataComment = await dataApiComment.json()

    // console.log(dataComment)
// [...data?.data, dataComment?.newPost]
    setCommentPost(data => [...data, dataComment?.newComment])
    // console.log(commentPost)
    setDisPlayComment(state => !state)
    setTextComment('')
    
  }

  }

  return (
    <div>
      <div>
        <div className='my-5 flex justify-between'>
          <Link  className='flex items-center' to={`/profile-detail/${post?.post?.user?._id}`}>
            <img className='w-[60px] mr-4 rounded-full' 
            src={post?.post?.user.profileimg ? `http://localhost:8080/images/${post?.post?.user?.profileimg}`
            : 'https://www.shareicon.net/data/512x512/2016/09/01/822711_user_512x512.png'} alt=''></img>
            <div className='flex flex-col'>
              <span className='font-semibold'>{post?.post?.user?.username}</span>
              <span>{moment(`${post?.post?.createdAt}`).format('YYYY-MM-DD HH:mm')}</span>
            </div>
          </Link>
          {
            newUser?._id === post?.post?.user?._id ? (<div className='relative' onClick={() => setModelOption(state => !state)}>
            <BiDotsVerticalRounded></BiDotsVerticalRounded>

            {
            modelOption && (
              <div className='absolute w-[200px] right-[-10px]'>
                <div><p>Bạn muốn xóa bài viết này</p></div>
                <div className=''>
                  <button className='mr-5' onClick={handleDeletePost}>Xóa</button>
                  <button className='w-[40px]' onClick={() => setModelOption(state => !state)}>Hủy</button>
                </div>
              </div>
              )
            }

          </div>) : ''
          }
          
        </div>
        
        <div>
          <div>
            <div><p>{post?.post?.content}</p></div>
            <Link to={`/post-detail/${post?.post?._id}`}>
              <div><img src={`http://localhost:8080/images/${post?.post?.photo}`} alt="" /></div>
              <div><p>{post?.post?.title}</p></div>
            </Link>
            <div className='flex items-center justify-between my-3'>
              <div className=' flex'>
                {
                  likePost ? <div className='cursor-pointer mr-3' onClick={handleLikePost}><AiFillHeart size={23}></AiFillHeart></div> : 
                  <div className='cursor-pointer mr-3' onClick={handleLikePost}><AiOutlineHeart size={23}></AiOutlineHeart></div>
                }
                {
                  <div className='cursor-pointer '
                   onClick={() => setDisPlayComment(state => !state)}><BiComment size={23}></BiComment></div>
                }
              </div>
              <div className='flex'>
                <div className=' text-gray-600'><p>{post?.post?.likes?.length} lượt thích</p></div>
                <div onClick={() => setDisPlayComment(state => !state)} 
                className='ml-2 text-gray-600 cursor-pointer'><p>{commentPost?.length} bình luận</p></div>
              </div>
            </div>
          </div>
          
          {
            displayComment ? (
          <div>
            <div><p>Bình luận bài viết</p></div>
            <div>
              {
                commentPost?.length > 0 ? (<div>
                {
                  commentPost?.map((itemComment, index) => (
                    <div key={index}>
                      <Comment data = {itemComment}></Comment>
                    </div>
                  ))
                }
                </div>) : <p>Bài viết này chưa có bình luận nào</p>
              }
            </div>
          </div>
            ) : ''
          }
          <div className='flex flex-col'>
            <input className='outline-none'
             type='text' placeholder='Nhập bình luận của bạn' 
            value={textComment} onChange={(e) => setTextComment(e.target.value)}
            ></input>
            <div className='flex justify-between mt-2'>
              {displayComment && <button className='cursor-pointer' 
              onClick={() => setDisPlayComment(state => !state)}>Ẩn bình luận</button>}
              <button className='cursor-pointer'
              onClick={handleAddComment}>Bình luận</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Post