import React, { useContext, useState } from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import { assets } from '../../assets/assets/frontend_assets/assets'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({setShowLogin}) => {

    const [menu, setMenu]=useState("menu")
    const {getTotalCartAmout} = useContext(StoreContext)

  return (
    <div className='navbar'>
       {/* <img src={assets.logo} alt="" className="logo" /> */}
       <Link to='/'><h3>Chayhana №1 Sultan</h3></Link>
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
            <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</li>
            <li onClick={()=>setMenu("services")} className={menu==="services"?"active":""}>services</li>
            <li onClick={()=>setMenu("contact us")} className={menu==="contact us"?"active":""}>contact us</li>
        </ul> 
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                 <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmout()===0?"":"dot"}></div>
            </div>
            <button onClick={()=>{setShowLogin(true)}}>Sign in</button>
        </div>
    </div>
  )
}

export default Navbar