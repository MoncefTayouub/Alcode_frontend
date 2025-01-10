import React ,{useEffect, useState}from "react";
import logo from "../files/logo.png"
import { useNavigate , useLocation } from 'react-router-dom';

const   Navbar = ({logged,logOut})=> {
    const [typeR,settypeR]= useState(false)
    const navigate = useNavigate()
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState("");

    useEffect(() => {
      setCurrentPath(location.pathname);
      settypeR(location.pathname=="/login" || location.pathname=="/owner" || location.pathname=="/Bypass" || location.pathname=="/quiz"  || location.pathname=="/InernalError"|| location.pathname=="/InernalError"|| location.pathname=="/quiz"|| location.pathname=="/QuizRes" )
    }, [location]);

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