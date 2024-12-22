import React , {useState , useEffect}from 'react'
import notSub from '../files/notSub.svg'
import axios  from 'axios'
import edit_blue from '../files/edit_blue.svg'
import trash_blue from '../files/trash_blue.svg'
import addIconerror from '../files/addIconerror.svg'

export default function General({backend_url,seteditUser,SetnavSelect,setreloading}) {
    const [ data , setData ] = useState()
    let getData = async () => { 
            
        let respons = await fetch (`${backend_url}owner/profiles/GEN`)
        let data = await respons.json()
        setData(data)
    
    }

    const [searchContent, setsearchContent] = useState('')
    const search = async ()=> {

        const DataForm= new FormData();
        DataForm.append('type','user')
        DataForm.append('content',searchContent)
        var method = 'POST'
        setreloading(true)
        // DataForm.append('quiz',quiz)
        
        await axios ({
          method : method , 
          url : `${backend_url}search` ,
          data :  DataForm,
      })
      .then((response)=>{
            let data = response.data
            setData(data['content'])
            setsearchContent('')
            setreloading(false)
      }).catch(function (error) {
          console.log(error)
        });
      
}

    const markConnected = async(ob)=> {
        console.log('marked')
        const DataForm= new FormData();
        DataForm.append('id',ob['id'])
        DataForm.append('state','setconnect')
        DataForm.append('inp',!ob['contacted'])
        await axios ({
            method : 'POST' , 
            url : `${backend_url}owner/profiles/GEN` ,
            data :  DataForm,
           
        })
        .then((response)=>{
              // console.log(response.data) ;
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

    const [hovering , sethovering ] = useState(-1)
    const boxClass = (index )=> {
        if (parseInt(index)%2 == 1) return 'contentBox center bgContent'
        return 'contentBox center'
    }

    const editUser = (user)=> {
        seteditUser(user) 
        SetnavSelect(2)
    } 

    const handleDownKey = (event )=> {
        if (event.key === 'Enter') {
            search()
        }
       }    

    const [delUser , setdelUser] = useState(-1) 

    const handleDelete = async()=> {
            if (delUser != -1 ) {
                const DataForm= new FormData();
                DataForm.append('id',delUser)
                await axios ({
                    method : 'DELETE' , 
                    url : `${backend_url}owner/user` ,
                    data :  DataForm,
                  
                })
                .then((response)=>{
                      let dataR = response.data
                      console.log('dataR',dataR)
                      getData()    
                      if (dataR['status'] == 1 ) {
                        setdelUser(-1)
                      }                   

                }).catch(function (error) {
                    console.log(error)
                  });
            }
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
    <div className='General positionRelative center'>
         {
        delUser != -1 ?  <div className='deleteConfirmMessage center' >
        <div className='boxer center'>
            <p>هل تؤكد حذف هذه السلسلة؟</p>
            <div className='center'>
                <button onClick={()=>handleDelete()}>نعم</button>
                <button onClick={()=>setdelUser(-1)}>لا</button>
            </div>
        </div>
    </div> : ''  

       }
        <div className='search spacebetween'>
            <input onChange={(e)=>setsearchContent(e.target.value)} onKeyDown={(e)=>handleDownKey(e)} value={searchContent} placeholder='سارة أحمد'  />  
            <p>ابحث عن مستخدم</p>
        </div>

       

        <div className='contentHeader contentBox center'>            
            <div className='sec4 center'>  <p></p></div>
            <div className='sec4 center' >  <p> تم التواصل معه </p> </div>
            <div className='sec4 center'> <p>المدة </p> </div>
            <div className='sec4 center'>  <p>الاسم الكامل</p></div>
        </div>
        {
            data ? data.length ? data.map((ob,i)=>
                <div key={i} className= {boxClass(i) } onMouseEnter={()=>sethovering(i)} >
                    <div className='sec4 center'> {hovering == i ? <div className='iconsContainer center'> 
                                <img alt='' onClick={()=>editUser(ob)}   src={edit_blue} />
                                <img alt='' onClick={()=>setdelUser(ob['id'])}  src={trash_blue} />
                        </div>  : '' } 
                    </div>

                    <div className='sec4 center'> <div onClick={()=>markConnected(ob)} className={ ob['contacted'] == false ? 'contated con00' : 'contated con01' }></div> </div>
                    <div className='sec4 center'> {handleCounterDays(ob['dur_start'],ob['duration'])}</div>
                    <div className='sec4 center'> <p>{ob['firstname'] } {ob['lastname']}</p> </div>               

                        
                                  
                </div>
            ) : 
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
