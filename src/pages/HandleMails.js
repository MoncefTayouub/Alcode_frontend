import { useEffect , useState } from "react"
import React  from 'react'
import topWhite from '../files/topWhite.svg'
import buttonWhite from '../files/buttonWhite.svg'
export default function HandleMails({backend_url}) {
    const [ data , setData ] = useState()
    const [hovering , sethovering ] = useState(-1)
    const [droppedMsg , setdroppedMsg] = useState(-1)

  let getData = async () => { 
          
      let respons = await fetch (`${backend_url}contactUs`)
      let data = await respons.json()
      setData(data)
  
  }
  
  useEffect(()=> {
      getData() 
      
  },[])

  const boxClass = (index )=> {
    if (parseInt(index)%2 == 1) return 'contentBox center bgContent'
    return 'contentBox center'
}

  console.log(data)
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
                        <div className="boxOffice center"> 
                            <p>{ob['fullNames']}</p>
                            <p>الاسم الكامل</p>
                        </div>
                        <div className="boxOffice center"> 
                            <p>{ob['gmail']}</p>
                            <p>البريد الإلكتروني</p>
                        </div>
                        <div className="boxOffice center"> 
                            <p> الموضوع</p>
                            <p>{ob['subject']}</p>
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
