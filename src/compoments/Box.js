import React from 'react'
import caricon from "../files/caricon.png"
export default function Box({ob,handleSettingSerie,title , imgurl}) {
  return (
    <div className='box spacebetween'>
      <img src={imgurl} alt='' />
      <h4>{title}</h4>
      <div className='twobutns spacebetween'>
        <button className='full rad20' onClick={()=>handleSettingSerie(ob)}>ابدأ السلسلة</button>
    </div>
    </div>
  )
}
