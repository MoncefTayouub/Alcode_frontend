import React, { useEffect, useState } from 'react'

export default function RenderProfiles() {
    const [ data , setData ] = useState()
    let getData = async () => { 
            
        let respons = await fetch (`${"backend_url"}`)
        let data = await respons.json()
        setData(data)
    
    }
    useEffect(()=> {
        getData() 
    })
    console.log(data)
  return (
    <div className='General center'>
        <div className='search spacebetween'>
            <input placeholder='سارة أحمد'  />  
            <p>ابحث عن مستخدم</p>
        </div>

        <div className='contentHeader contentBox center'>            
            <div className='sec center'>  <p> تم التواصل معه </p> </div>
            <div className='sec center'> <p>المدة </p> </div>
            <div className='sec center'>  <p>الاسم الكامل</p></div>
        </div>
        <div className='contentBox center bgContent'>
            <div className='sec center'> <div className='contated'></div> </div>
            <div className='sec center'> <p> 2 ي , 2 س </p> </div>
            <div className='sec center'> <p>سارة أحمد</p> </div>           
        </div>
      
    </div>
  )
}
