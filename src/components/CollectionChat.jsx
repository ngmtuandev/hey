import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
const CollectionChat = ({chat, userCurrent}) => {
  
    // console.log(chat)
    // console.log('userCurrent', userCurrent)

    const {token} = useSelector(state => state.user)
    
    const [dataUserChat, setDataUserChat] = useState(null)

    const userChat = chat?.members?.find((id => id!==userCurrent))
    // console.log('user chat with user current', userChat)

    useEffect(() => {
        const getDataUserApi = async (req, res) => {
            const dataApi = await fetch(`http://localhost:8080/nguoidung/${userChat}`, {
                headers: {"authorization" : `Bearer ${token}`},
                method: 'GET'
            })
            const data = await dataApi.json()
            setDataUserChat(data?.data)
        }
        getDataUserApi()
    }, [])

    // console.log('user chat with user current', dataUserChat)


    return (
    <div className='mb-5'>
        <div className='flex items-center'>
            <img className=' rounded-full mr-3 w-[50px]'
             src={ dataUserChat?.profileimg ? `http://localhost:8080/images/${dataUserChat?.profileimg}` 
            : 'https://www.shareicon.net/data/512x512/2016/09/01/822711_user_512x512.png'} alt=''></img>
            <div className='flex flex-col'>
                <span>{dataUserChat?.username}</span>
                <span className='text-gray-500'>Online</span>
            </div>
        </div>
    </div>
  )
}

export default CollectionChat