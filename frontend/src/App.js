import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { loadUser } from './Actions/userActions';
import './App.css';
import CreateRestaurant from './Components/CreateRestaurant/CreateRestaurant';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Register from './Components/Register/Register';
import RestaurantDetails from './Components/RestaurantDetails/RestaurantDetails';
import UpdateRestaurant from './Components/UpdateRestaurant/UpdateRestaurant';
import UserProfile from './Components/UserProfile/UserProfile';

function App() {

  const {isAuthenticated} = useSelector((state)=>state.user)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadUser());
  },[dispatch])

  return (
    <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/' element={isAuthenticated?<Home/>:<Login/>} />
          <Route path='/register' element={isAuthenticated?<Home/>:<Register/>} />
          <Route path='/profile' element={isAuthenticated?<UserProfile/>:<Login/>} />
          <Route path='/restaurant/create' element={isAuthenticated?<CreateRestaurant/>:<Login/>} />
          <Route path='/restaurant/update/:id' element={isAuthenticated?<UpdateRestaurant/>:<Login/>} />
          <Route path='/restaurant/:id' element={isAuthenticated?<RestaurantDetails/>:<Login/>} />
        </Routes>
    </div>
  );
}

export default App;
