import React, { useEffect, useState } from 'react'
import truck_section from '../files/truck_section.svg'
import car_section from '../files/car_section.svg'
import motocycle_section from '../files/motocycle_section.svg'
import bigTruck_section from '../files/bigTruck_section.svg'
import bus_section from '../files/bus_section.svg'
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function BySection({data,setselectType}) {
  const navigate = useNavigate();

  const [selection , setselection] = useState([0,0,0,0,0]) 

  useEffect(()=> {
    if (data ) {
        setselection(data['categoryies'])
    }
  },[data])

  
  const navi = (type)=> {
    setselectType(type)
    navigate('/serie')
  }
  return (
    <div className='BySection padding center'>
       <div className="bigTtielSections center" >
            <h1>دورات رخصة السياقة</h1>
            <p>
                تعلم القيادة يمكن أن يكون مغامرة مثيرة! من قيادة الدراجات النارية إلى الشاحنات العملاقة، دوراتنا تساعدك
                لتكون سائقًا ماهرًا وواثقًا احصل على مهارات القيادة الممتعة وكن جاهزًا للانطلاق على الطرق بثقة!
            </p>
    </div>
    <div className='seciontion center'>
        <div className='course-card center' >
            <div className='imgBox center '>
               <img src={motocycle_section} alt={''} className="course-image" />

            </div>
            <div className='descBox center'>
                    <div className='detials center'>
                        <h2 className="course-title">دورة رخصة السياقة فئة A</h2>
                        <p className="course-description">تعلم قيادة الدراجات النارية بجميع أنواعها، مع التركيز على مهارات التحكم والقيادة الآمنة على الطرق</p>
                    </div>
                    {
                        selection[0] ? 
                        <button onClick={()=> navi("A")} className="start-button">ابد الآن </button>
                        : 
                        <button className="notavailable">الدورات قيد الإعداد، ترقبونا قريبًا </button>

                    }
            </div>
        </div>
        <div className='course-card center'>
            <div className='imgBox center '>
               <img src={car_section} alt={''} className="course-image" />

            </div>
            <div className='descBox center'>
                    <div className='detials center'>
                        <h2 className="course-title">دورة رخصة السياقة فئة B</h2>
                        <p className="course-description">تعلم قيادة السيارات الخفيفة والمركبات الصغيرة، مع التدريب على أساسيات القيادة وقوانين المرور</p>
                    </div>
                    {
                        selection[1] ? 
                        <button  onClick={()=> navi("B")} className="start-button">ابد الآن </button>
                        : 
                        <button className="notavailable">الدورات قيد الإعداد، ترقبونا قريبًا </button>

                    }            </div>
        </div>
        {/* <div className='course-card center' onClick={()=> navi("CE")}> */}
        <div className='course-card center' >
            <div className='imgBox center '>
               <img src={bigTruck_section} alt={''} className="course-image" />

            </div>
            <div className='descBox center'>
                    <div className='detials center'>   
                        <h2 className="course-title"> دورة رخصة السياقة فئة EC</h2>
                        <p className="course-description">  تعلم قيادة الشاحنات الكبيرة مع المقطورات الثقيلة، بما في ذلك كيفية التحرك بأمان في الطرق السريعة والمناطق الضيقة. </p>
                    </div>
                    {
                        selection[3] ? 
                        <button  onClick={()=> navi("CE")} className="start-button">ابد الآن </button>
                        : 
                        <button className="notavailable">الدورات قيد الإعداد، ترقبونا قريبًا </button>

                    }            </div>
        </div>
        {/* <div className='course-card center' onClick={()=> navi("C")}> */}
        <div className='course-card center' >
            <div className='imgBox center '>
               <img src={truck_section} alt={''} className="course-image" />

            </div>
            <div className='descBox center'>
                    <div className='detials center'>
                        <h2 className="course-title">دورة رخصة السياقة فئة C</h2>
                        <p className="course-description">تدريب شامل لقيادة الشاحنات الكبيرة التي يزيد وزنها عن 3500 كغ، مع التركيز على مهارات المناورة ونقل البضائع بأمان</p>
                    </div>
                    {
                        selection[2] ? 
                        <button onClick={()=> navi("C")} className="start-button">ابد الآن </button>
                        : 
                        <button className="notavailable">الدورات قيد الإعداد، ترقبونا قريبًا </button>

                    }            </div>
        </div>
        {/* <div className='course-card center'  */}
        <div className='course-card center' >
            <div className='imgBox center '>
               <img src={bus_section} alt={''} className="course-image" />

            </div>
            <div className='descBox center'>
                    <div className='detials center'>
                        <h2 className="course-title">دورة رخصة السياقة فئة D</h2>
                        <p className="course-description">تدريب احترافي على قيادة الحافلات والمركبات الخاصة بنقل الركاب، مع التركيز على القيادة الآمنة وخدمة الركاب</p>
                    </div>
                    {
                        selection[4] ? 
                        <button onClick={()=> navi("D")}  className="start-button">ابد الآن </button>
                        : 
                        <button className="notavailable">الدورات قيد الإعداد، ترقبونا قريبًا </button>

                    }            </div>
        </div>
    </div>

    </div>
  )
}
