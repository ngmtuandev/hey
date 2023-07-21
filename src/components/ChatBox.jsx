import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

const ChatBox = ({chat, userCurrent}) => {

    const {token} = useSelector(state => state.user)
    
    const [dataUserChat, setDataUserChat] = useState(null)

    // console.log('----Chat : ', chat)
    // console.log('userCurrent', userCurrent)

    const userChat = chat?.members?.find((id => id!==userCurrent))
    console.log('user chat with user current', userChat)

    useEffect(() => {
        const getDataUserApi = async (req, res) => {
            const dataApi = await fetch(`http://localhost:8080/nguoidung/${userChat}`, {
                headers: {"authorization" : `Bearer ${token}`},
                method: 'GET'
            })
            const data = await dataApi.json()
            // console.log('-------',data?.data)
            setDataUserChat(data?.data)
        }
        getDataUserApi()
    }, [chat, userCurrent])

    console.log('dataUserChat', dataUserChat)


  return (
    <div>
        <div>
            {
                dataUserChat ? (
                <div className='flex items-center'>
                    <img className=' rounded-full mr-3 w-[50px]'
                    src={ dataUserChat?.profileimg ? `http://localhost:8080/images/${dataUserChat?.profileimg}` 
                    : 'https://www.shareicon.net/data/512x512/2016/09/01/822711_user_512x512.png'} alt=''>
                    </img>
                    <div className='flex flex-col'>
                        <span>{dataUserChat?.username}</span>
                        <span className='text-gray-600 text-[13px]'>Người nhận</span>
                    </div>
                </div>
                ) : <div><span>Chưa có cuộc trò chuyện nào</span></div>
            }
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default ChatBox