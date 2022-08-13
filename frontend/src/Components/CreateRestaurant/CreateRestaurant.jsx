import { Avatar } from '@mui/material';
import React,{useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import "./CreateRestaurant.css"
import AddIcon from '@mui/icons-material/Add';
import MenuItemCard from '../MenuItemCard/MenuItemCard';
import { useDispatch } from 'react-redux';
import { createARestaurant } from '../../Actions/restaurantAction';
import { useNavigate } from 'react-router-dom';

const CreateRestaurant = () => {
  const [avatar,setAvatar] = useState("")
  const [name,setName] = useState("")
  const [address,setAddress] = useState("")
  const [menu,setMenu] = useState([])
  const [addWindow,setAddWindow] = useState(false)
  const [editWindow,setEditWindow] = useState(false)
  const [menuAvatar,setMenuAvatar] = useState("")
  const [menuCategory,setMenuCategory] = useState("")
  const [menuName,setMenuName] = useState("")
  const [menuPrice,setMenuPrice] = useState("")
  const [editMenuAvatar,setEditMenuAvatar] = useState("")
  const [editMenuCategory,setEditMenuCategory] = useState("")
  const [editMenuName,setEditMenuName] = useState("")
  const [editMenuPrice,setEditMenuPrice] = useState("")
  const [editIndex,setEditIndex] = useState(-1)
  const history=useNavigate();
  const dispatch = useDispatch();
  const handleAvatarChange = (e)=>{
    const file= e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = ()=>{
        if(Reader.readyState===2){
            setAvatar(Reader.result);
        }
    }
  }
  const handleMenuAvatarChange = (e)=>{
    const file= e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = ()=>{
        if(Reader.readyState===2){
            setMenuAvatar(Reader.result);
        }
    }
  }
  const handleEditMenuAvatarChange = (e)=>{
    const file= e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = ()=>{
        if(Reader.readyState===2){
            setEditMenuAvatar(Reader.result);
        }
    }
  }

  const addItemHandler = (e)=>{
    e.preventDefault();
    setMenu([...menu,{image:menuAvatar,category:menuCategory,name:menuName,price:menuPrice}])
    setMenuAvatar("")
    setMenuCategory("")
    setMenuName("")
    setMenuPrice("")
    setAddWindow(!addWindow)
  } 

  const submitHandler = async (e)=>{
    e.preventDefault();
    await dispatch(createARestaurant(name,address,avatar,menu))
    alert("Restaurant Created Successfully")
    history("/")
  }

  const editMenuHandler = (ind)=>{
    setEditWindow(!editWindow)
    setEditMenuAvatar(menu[ind].image)
    setEditMenuCategory(menu[ind].category)
    setEditMenuName(menu[ind].name)
    setEditMenuPrice(menu[ind].price)
    setEditIndex(ind)
  }
  const editSubmitHandler = (e)=>{
    e.preventDefault();
    menu[editIndex].image=editMenuAvatar
    menu[editIndex].category=editMenuCategory
    menu[editIndex].name=editMenuName
    menu[editIndex].price=editMenuPrice
    setMenu([...menu])
    setEditWindow(!editWindow)
  }

  const deleteMenuHandler = (ind)=>{
    menu.splice(ind,1)
    setMenu([...menu])
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
          <Avatar src={avatar} alt="Cover Pic" style={{margin:"1rem auto"}} sx={{height:"10vmax",width:"10vmax"}}/>
          <input className="chooseFile" type="file" accept="image/*" onChange={handleAvatarChange}/>
          <input className='createRestaurantForm-Input' type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" name="name"/>
          <textarea rows={3} className='createRestaurantForm-Input' value={address} onChange={(e)=>setAddress(e.target.value)} type="text" placeholder="Address" name="address"/>
          <button type="submit" className="updateBtn">Open Restaurant!</button>
      </form>
          <div className='menuItems'>
            <button onClick={()=>setAddWindow(!addWindow)} className='createBtn'><AddIcon/><span>Add Menu Item</span></button>
            <div className='listMenuItems'>
                {menu&&menu.map((item,ind)=>(
                  <MenuItemCard key={ind} className={`card-${ind}`} item={item} editMenuHandler={editMenuHandler} deleteMenuHandler={deleteMenuHandler} ind={ind}/>
                ))}
            </div>
          </div>
          {
            !editWindow&&addWindow&&<div className='overlayDiv'>
                <form className='registerForm'>
                  <CloseIcon className='crossBtn' onClick={()=>setAddWindow(!addWindow)}/>
                  <h2 style={{fontFamily:"Helvetica"}}>Add an Item</h2>
                  <Avatar src={menuAvatar} alt="Cover Pic" style={{margin:"1rem auto"}} sx={{height:"10vmax",width:"10vmax"}}/>
                  <input className="chooseFile" type="file" accept="image/*" onChange={handleMenuAvatarChange}/>
                  <input className='createRestaurantForm-Input' value={menuName} onChange={(e)=>setMenuName(e.target.value)} type="text" placeholder="Name" name="name"/>
                  <input className='createRestaurantForm-Input' value={menuPrice} onChange={(e)=>setMenuPrice(e.target.value)} type="text" placeholder="Price" name="price"/>
                  <label htmlFor='category'>Category&nbsp;</label>
                  <select name="type" value={menuCategory} onChange={(e)=>setMenuCategory(e.target.value)} id="category">
                    <option value="North Indian">North Indian</option>
                    <option value="South Indian">South Indian</option>
                    <option value="Italian">Italian</option>
                    <option value="Chaats">Chaats</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Fast Food">Fast Food</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                  <button onClick={addItemHandler} className="updateBtn">Add Item</button>
                </form>
              </div>
          }
          {
            !addWindow&&editWindow&&<div className='overlayDiv'>
                <form className='registerForm'>
                  <CloseIcon className='crossBtn' onClick={()=>setEditWindow(!editWindow)}/>
                  <h2 style={{fontFamily:"Helvetica"}}>Update an Item</h2>
                  <Avatar src={editMenuAvatar} alt="Cover Pic" style={{margin:"1rem auto"}} sx={{height:"10vmax",width:"10vmax"}}/>
                  <input className="chooseFile" type="file" accept="image/*" onChange={handleEditMenuAvatarChange}/>
                  <input className='createRestaurantForm-Input' value={editMenuName} onChange={(e)=>setEditMenuName(e.target.value)} type="text" placeholder="Name" name="name"/>
                  <input className='createRestaurantForm-Input' value={editMenuPrice} onChange={(e)=>setEditMenuPrice(e.target.value)} type="text" placeholder="Price" name="price"/>
                  <label htmlFor='category'>Category&nbsp;</label>
                  <select name="type" value={editMenuCategory} onChange={(e)=>setEditMenuCategory(e.target.value)} id="category">
                    <option value="North Indian">North Indian</option>
                    <option value="South Indian">South Indian</option>
                    <option value="Italian">Italian</option>
                    <option value="Chaats">Chaats</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Fast Food">Fast Food</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                  <button onClick={editSubmitHandler} className="updateBtn">Edit Item</button>
                </form>
              </div>
          }
    </div>
  )
}

export default CreateRestaurant