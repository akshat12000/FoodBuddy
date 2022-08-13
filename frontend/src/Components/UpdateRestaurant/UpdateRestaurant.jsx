import { Avatar } from '@mui/material';
import React,{useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import "./UpdateRestaurant.css"
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { createMenuItem, deleteMenuItem, getAMenuItem, getARestaurant, updateMenuItem, updateRestaurant } from '../../Actions/restaurantAction';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import EditMenuItemCard from '../MenuItemCard/EditMenuItemCard';

const UpdateRestaurant = () => {
  const history=useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();
  useEffect(()=>{
    dispatch(getARestaurant(id))
  },[dispatch,id])

  const {restaurant} = useSelector(state=>state.restaurant)
  const [avatar,setAvatar] = useState("")
  const [editAvatar,setEditAvatar] = useState(restaurant?.coverPhoto?.url)
  const [name,setName] = useState(restaurant?.name)
  const [address,setAddress] = useState(restaurant?.address)
  const [menu,setMenu] = useState(restaurant?.menu)
  const [addWindow,setAddWindow] = useState(false)
  const [menuAvatar,setMenuAvatar] = useState("")
  const [menuCategory,setMenuCategory] = useState("North Indian")
  const [menuName,setMenuName] = useState("")
  const [menuPrice,setMenuPrice] = useState("")
  const [editWindow,setEditWindow] = useState(false)
  const [menuAvatarEdit,setMenuAvatarEdit] = useState("")
  const [editIndex,setEditIndex] = useState(-1)
  const [editMenuAvatar,setEditMenuAvatar] = useState("")
  const [editMenuCategory,setEditMenuCategory] = useState("")
  const [editMenuName,setEditMenuName] = useState("")
  const [editMenuPrice,setEditMenuPrice] = useState("")
  const editSubmitHandler = async (e)=>{
    e.preventDefault();
    await dispatch(updateMenuItem(editIndex,editMenuName,editMenuPrice,editMenuAvatar,editMenuCategory));
    await dispatch(getAMenuItem(editIndex))
    let newMenu=[];
    for(let i=0;i<menu.length;i++){
      if(menu[i]._id===editIndex){
        newMenu.push({
          _id:editIndex,
          name:editMenuName,
          price:editMenuPrice,
          image:editMenuAvatar?{public_id:"someTHing",url:editMenuAvatar}:menu[i].image,
          category:editMenuCategory,
        })
      }else{
        newMenu.push(menu[i]);
      }
    }
    setMenu(newMenu);
    alert("Item Updated Successfully!");
    dispatch(getARestaurant(id))
    setEditWindow(!editWindow)
  }
 

  const handleEditMenuAvatarChange = (e)=>{
    const file= e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = ()=>{
        if(Reader.readyState===2){
            setEditMenuAvatar(Reader.result);
            setMenuAvatarEdit(Reader.result);
        }
    }
  }

  const deleteItemHandler = async (ind)=>{
      await dispatch(deleteMenuItem(ind));
      await dispatch(getARestaurant(id));
      alert("Item Deleted Successfully!");
      let newMenu=[];
      for(let i=0;i<menu.length;i++){
        if(menu[i]._id!==ind){
          newMenu.push(menu[i]);
        }
      }
      setMenu(newMenu);
  }


  const handleAvatarChange = (e)=>{
    const file= e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = ()=>{
        if(Reader.readyState===2){
            setAvatar(Reader.result);
            setEditAvatar(Reader.result);
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

  const addItemHandler = async(e)=>{
    e.preventDefault();
    await dispatch(createMenuItem(id,menuName,menuPrice,menuAvatar,menuCategory));
    await dispatch(getARestaurant(id));
    alert("Item Added Successfully!");
    setMenu([...menu,{image:{public_id:"someThing",url:menuAvatar},category:menuCategory,name:menuName,price:menuPrice}])
    setMenuAvatar("")
    setMenuCategory("")
    setMenuName("")
    setMenuPrice("")
    setAddWindow(!addWindow)
  } 

  const submitHandler = async (e)=>{
    e.preventDefault();
    await dispatch(updateRestaurant(id,name,address,avatar))
    alert("Restaurant Updated Successfully")
    history("/")
  }

  const openEditWindow = (index)=>{
    let ind=-1;
    for(let i=0;i<menu.length;i++){
      if(menu[i]._id===index){
        ind=i;
        break;
      }
    }
    setEditIndex(index)
    setMenuAvatarEdit(menu[ind].image.url)
    setEditMenuCategory(menu[ind].category)
    setEditMenuName(menu[ind].name)
    setEditMenuPrice(menu[ind].price)
    setEditWindow(!editWindow)
  }

  return (
    <div className='mainDiv'>
      <form onSubmit={submitHandler}>
          <Avatar src={editAvatar} alt="Cover Pic" style={{margin:"1rem auto"}} sx={{height:"10vmax",width:"10vmax"}}/>
          <input className="chooseFile" type="file" accept="image/*" onChange={handleAvatarChange}/>
          <input className='createRestaurantForm-Input' type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" name="name"/>
          <textarea rows={3} className='createRestaurantForm-Input' value={address} onChange={(e)=>setAddress(e.target.value)} type="text" placeholder="Address" name="address"/>
          <button type="submit" className="updateBtn">Update Restaurant!</button>
      </form>
          <div className='menuItems'>
            <button onClick={()=>setAddWindow(!addWindow)} className='createBtn'><AddIcon/><span>Add Menu Item</span></button>
            <div className='listMenuItems'>
                {menu&&menu.map((menuItem,ind)=>(
                  <EditMenuItemCard openEditWindow={openEditWindow} deleteItemHandler={deleteItemHandler} key={menuItem._id} item={menuItem} ind={menuItem._id} restaurantId={id}/>
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
                  <input className='updateRestaurantForm-Input' value={menuName} onChange={(e)=>setMenuName(e.target.value)} type="text" placeholder="Name" name="name"/>
                  <input className='updateRestaurantForm-Input' value={menuPrice} onChange={(e)=>setMenuPrice(e.target.value)} type="text" placeholder="Price" name="price"/>
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
                  <h2 style={{fontFamily:"Helvetica"}}>Edit an Item</h2>
                  <Avatar src={menuAvatarEdit} alt="Cover Pic" style={{margin:"1rem auto"}} sx={{height:"10vmax",width:"10vmax"}}/>
                  <input className="chooseFile" type="file" accept="image/*" onChange={handleEditMenuAvatarChange}/>
                  <input className='updateRestaurantForm-Input' value={editMenuName} onChange={(e)=>setEditMenuName(e.target.value)} type="text" placeholder="Name" name="name"/>
                  <input className='updateRestaurantForm-Input' value={editMenuPrice} onChange={(e)=>setEditMenuPrice(e.target.value)} type="text" placeholder="Price" name="price"/>
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

export default UpdateRestaurant