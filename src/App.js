import './App.css';
import {Route, Routes} from 'react-router-dom'
import {Navbar, Footer, Login, PostDetail, ProfileDetail, Signup, Upload, Home, UploadProfile, Conversation} from '../src/components/index'
import {useSelector} from 'react-redux'
import path from './util/path';
function App() {
  const {token, newUser} = useSelector(state => state.user)
  return (
    <div>
      {token ? <Navbar></Navbar> : ''}
      <Routes>
        <Route path={path.HOME} element={token ? <Home></Home> : <Signup></Signup>}></Route>
        <Route path={path.LOGIN} element={<Login></Login>}></Route>
        <Route path={path.SIGNUP} element={<Signup></Signup>}></Route>
        <Route path={path.UPLOAD} element={<Upload></Upload>}></Route>
        <Route path={path.POSTDETAIL__ID} element={<PostDetail></PostDetail>}></Route>
        <Route path={path.PROFILEDETAIL__ID} element={<ProfileDetail></ProfileDetail>}></Route>
        <Route path={path.UPLOADUSER__ID} element={<UploadProfile></UploadProfile>}></Route>
        <Route path={path.CHAT} element={<Conversation></Conversation>}></Route>
      </Routes>
      </div>
  );
}

export default App;
