import React from 'react'
import "./MenuItemCard.css"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const MenuItemCard = ({item,ind,editMenuHandler,deleteMenuHandler}) => {
  return (
    <div className='menuCardDiv'>
        <div className='optionsDiv'><EditIcon onClick={()=>editMenuHandler(ind)} style={{backgroundColor:"#5794f7",color:"white",boxShadow: "0px 0px 5px rgb(213, 212, 212)",cursor:"pointer"}}/>&nbsp;<DeleteIcon onClick={()=>deleteMenuHandler(ind)} style={{backgroundColor:"#fc475c",color:"white",boxShadow: "0px 0px 5px rgb(213, 212, 212)",cursor:"pointer"}}/></div>
        <img src={item.image} alt={item.name}/>
        <h3>{item.name}</h3>
        <p>₹ {item.price}</p>
        <p className='tag'>#{item.category}</p>
    </div>
  )
}

export default MenuItemCard