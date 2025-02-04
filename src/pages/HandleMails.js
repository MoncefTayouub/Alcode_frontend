import { useEffect , useState } from "react"
import React  from 'react'
import topWhite from '../files/topWhite.svg'
import buttonWhite from '../files/buttonWhite.svg'
import trash_blue from '../files/trash_blue.svg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function HandleMails({backend_url,setreloading}) {
    const [ data , setData ] = useState()
    const [hovering , sethovering ] = useState(-1)
    const [droppedMsg , setdroppedMsg] = useState(-1)
    const navigate = useNavigate();

  let getData = async () => {
  setreloading(true); // Start reloading process
  try {
    let respons = await fetch(`${backend_url}contactUs`);
    let data = await respons.json();
    setData(data); // Set the data after fetching
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setreloading(false); // Set reloading to true after everything is done
  }
};
  
  useEffect(()=> {
      getData() 
      
  },[])

  const boxClass = (index )=> {
    if (parseInt(index)%2 == 1) return 'contentBox center bgContent'
    return 'contentBox center'
}

const handleDeleteMail = async (id) => {
        setreloading(true)
        const DataForm= new FormData();
        DataForm.append('id',id)
        await axios ({
          method : 'DELETE' , 
          url : backend_url+'contactUs' ,
          data :  DataForm,
      })
      .then((response)=>{
        setreloading(false)
            let data =  response.data 
            // console.log(data)
            getData(data)
            
      }).catch(function (error) {
        navigate('/InernalError')
        });        
        
}

  return (
    <div className='General positionRelative center'>
        <div className='contentHeader contentBox center'>            
            <div className='sec4 center'>  <p></p></div>
            <div className='sec4 center' >  <p> تم التواصل معه </p> </div>
            <div className='sec4 center'> <p>المدة </p> </div>
            <div className='sec4 center'>  <p>الاسم الكامل</p></div>
        </div>
        {
            data ? data['notSeen'].map((ob,i)=>
                <div key={i} className= {boxClass(i) } onMouseEnter={()=>sethovering(i)} >
                    <div className='sec4 center'> {hovering == i ? <div className='iconsContainer center'> 
                                <img alt='' onClick={()=>i== droppedMsg ? setdroppedMsg(-1) : setdroppedMsg(i)}   src={droppedMsg == i ?  topWhite : buttonWhite} />
                        </div>  : '' } 
                    </div>
                    <div className='sec4 center'> <p>{ob['fullNames']}</p> </div>               
                    <div className='sec4 center'> <p>{ob['gmail']}</p> </div>               
                    <div className='sec4 center'> <p>{ob['subject']}</p> </div>    
                  {
                    droppedMsg == i ? 
                  <div className="messageContainer center"> 
                      <img alt='' onClick={()=>handleDeleteMail(ob.id)} className="trash_blue" src={trash_blue} />
                        <div className="boxOffice center"> 
                            <p>{ob['fullNames']}</p>
                            <p>الاسم الكامل</p>
                        </div>
                        <div className="boxOffice center"> 
                            <p>{ob['gmail']}</p>
                            <p>البريد الإلكتروني</p>
                        </div>
                        <div className="boxOffice center"> 
                            <p>{ob['subject']}</p>
                            <p> الموضوع</p>
                        </div>
                        {ob['message']}
                    </div> : ''           
                  }  
                </div>
            )
            :''
        }
    </div>
  )
}
