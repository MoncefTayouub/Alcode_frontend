import React ,{useEffect, useState}from "react";
import logo from "../files/logo.png"
import { useNavigate } from 'react-router-dom';

const   Navbar = ({typeR,logged,logOut})=> {
    const navigate = useNavigate()

    

    const log = ()=> {
        navigate('/login')
    }



    const content = (typeR == true) ? <div></div> 
    : <div className="NavBar spacebetween">
         <a href="/"> <img src={logo} alt=""></img></a>
            {
                logged != 1 ? 
                    <div className="center"> 
                        {/* <p className="center">اشتراك</p> */}
                        <button onClick={()=>log()}>التسجيل</button>
                    </div> 
                : <p className="center" onClick={()=>logOut()}>تسجيل الخروج</p>
            }
    </div>   
    return (
        <>

            {content}
        </>
        
    )
}
export default Navbar