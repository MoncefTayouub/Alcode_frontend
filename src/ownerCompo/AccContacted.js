import React , {useState , useEffect}from 'react'
import notSub from '../files/notSub.svg'
import axios  from 'axios'
import addIconerror from '../files/addIconerror.svg'


export default function AccContacted({backend_url,setreloading}) {
    const [ data , setData ] = useState()
    let getData = async () => { 
            
        let respons = await fetch (`${backend_url}owner/profiles/BC`)
        let data = await respons.json()
        setData(data)
    
    }
    console.log(data) 
    const markConnected = async(ob)=> {
        const DataForm= new FormData();
        setreloading(true)
        DataForm.append('id',ob['id'])
        DataForm.append('state','setconnect')
        DataForm.append('inp',!ob['contacted'])
        await axios ({
            method : 'POST' , 
            url : `${backend_url}owner/profiles/BC` ,
            data :  DataForm,
           
        })
        .then((response)=>{
              // console.log(response.data) ;
              setreloading(false)
              let dataR = response.data
              console.log(dataR)
              getData() 
              // eslint-disable-next-line eqeqeq
            //   if (data['status'] == 1 ) {
                // SetnavSelect(8)
            //   }
            //   setErrorMsg(data['status'])
              
            
        }).catch(function (error) {
            console.log(error)
          });
    }
    useEffect(()=> {
        getData() 
    },[])
    console.log(data)
    const boxClass = (index )=> {
        if (parseInt(index)%2 == 1) return 'contentBox center bgContent'
        return 'contentBox center'
    }
    const handleCounterDays = (date,number_of_days )=> {
        var dd = new Date(date);
        dd.setDate(dd.getDate() + number_of_days);
        var currentDate = new Date(); 
        var differenceInMs = dd - currentDate;
        var differenceInDays = Math.floor(differenceInMs / (24 * 60 * 60 * 1000));
        if (differenceInDays < 0) {
          return  <p> <img src={notSub} alt='' /></p> 
          
        } else {
            return <p> {`ي ${differenceInDays}`}</p>; // Remaining duration in days
        }
      }
  return (
    <div className='General center'>
        {/* <div className='search spacebetween'>
            <input placeholder='سارة أحمد'  />  
            <p>ابحث عن مستخدم</p>
        </div> */}
        {
            data ? data.length ? <>
                <div className='contentHeader contentBox center'>            
                    <div className='sec center' >  <p> تم التواصل معه </p> </div>
                    <div className='sec center'> <p>المدة </p> </div>
                    <div className='sec center'>  <p>الاسم الكامل</p></div>
                </div>
                {data.map((ob,i)=>
                        <div key={i} className= {boxClass(i) }>
                            <div className='sec center'> <div onClick={()=>markConnected(ob)} className={ ob['contacted'] == false ? 'contated con00' : 'contated con01' }></div> </div>
                            <div className='sec center'> {handleCounterDays(ob['dur_start'],ob['duration'])}</div>
                            <div className='sec center'> <p>{ob['firstname'] } {ob['lastname']}</p> </div>           
                        </div>
                    )
                } </>:
                    <div className='noContent'>
                    <img alt='' src={addIconerror} />
                    <p>
                    لا يوجد محتوى متاح حاليًا.<br />
                    يرجى التحقق من الاتصال إذا كنت متأكدًا من وجود محتوى محمّل هنا.
                            </p>
                        </div>
                    :<div className='noContent'>
                    <img alt='' src={addIconerror} />
                    <p>
                        لا يوجد محتوى متاح حاليًا.<br />
                        يرجى التحقق من الاتصال إذا كنت متأكدًا من وجود محتوى محمّل هنا.
                                </p>
                            </div>
                    
                }
            
        

        
    </div>
  )
}
