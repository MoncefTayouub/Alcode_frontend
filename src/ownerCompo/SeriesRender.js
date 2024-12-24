import React , {useState , useEffect}from 'react'
import notSub from '../files/notSub.svg'
import axios  from 'axios'
import edit_blue from '../files/edit_blue.svg'
import trash_blue from '../files/trash_blue.svg'
import addIconerror from '../files/addIconerror.svg'
export default function SeriesRender({setreloading,backend_url,setSerie,SetnavSelect,setErrorMsg}) {
    const [hovering , sethovering ] = useState(-1)
    
    const [ data , setData ] = useState()
    let getData = async () => { 
        setreloading(true)
        let respons = await fetch (`${backend_url}owner/profiles/series`)
        let data = await respons.json()
        setData(data)
        setreloading(false)
    }    
    
    useEffect(()=> {
        getData() 
    },[])

    const boxClass = (index )=> {
            if (parseInt(index)%2 == 1) return 'contentBox center bgContent'
            return 'contentBox center'
    }

    const editSerie =(ob)=> {
        setSerie(ob)
        SetnavSelect(8)
    }

    const [del_serie, setdel_serie] = useState(-1)

    const deleteSerie = async (id)=> {

            const DataForm= new FormData();
            DataForm.append('id',id)
            var method = 'DELETE'
          
            // DataForm.append('quiz',quiz)
            
            await axios ({
              method : method , 
              url : `${backend_url}owner/serie` ,
              data :  DataForm,
          })
          .then((response)=>{
                // console.log(response.data) ;
                let data = response.data
                getData()
                setErrorMsg(5)
                setdel_serie(-1)
          }).catch(function (error) {
              console.log(error)
            });
          
    }
    const [searchContent, setsearchContent] = useState('')
    const search = async ()=> {

        const DataForm= new FormData();
        DataForm.append('type','serie')
        DataForm.append('content',searchContent)
        var method = 'POST'
      
        // DataForm.append('quiz',quiz)
        setreloading(true)
        await axios ({
          method : method , 
          url : `${backend_url}search` ,
          data :  DataForm,
      })
      .then((response)=>{
            // console.log(response.data) ; 
            let data = response.data
            setreloading(false)
            setData(data['content'])
            setdel_serie(-1)
            setsearchContent('')
      }).catch(function (error) {
          console.log(error)
        });
      
}
   const handleDownKey = (event )=> {
    if (event.key === 'Enter') {
        search()
    }
   }    
    
  return (
    <div className='General ownerPadding positionRelative center' onMouseLeave={()=>sethovering(-1)}>
       {
        del_serie != -1 ?  <div className='deleteConfirmMessage center' >
        <div className='boxer center'>
            <p>هل تؤكد حذف هذه السلسلة؟</p>
            <div className='center'>
                <button onClick={()=>deleteSerie(del_serie)}>نعم</button>
                <button onClick={()=>setdel_serie(-1)}>لا</button>
            </div>

        </div>
    </div> : ''  

       }
        {
            data ?
            <>
                    <div className='search spacebetween'>
                        <input onKeyDown={(e)=>handleDownKey(e)} onChange={(e)=>setsearchContent(e.target.value)} value={searchContent} placeholder='.......'  />  
                        <p>ابحث عن</p>
                    </div>

                    <div className='contentHeader contentBox center'>            
                        <div className='sec4 center'> <p> </p> </div>
                        <div className='sec4 center'> <p>عدد الأسئلة </p> </div>
                        <div className='sec4 center' >  <p>العنوان </p> </div>
                        <div className='sec4 center'>  <p>صورة</p></div>
                    </div>
            
       { data.map((ob,i)=>
                <div key={i} className= {boxClass(i) } onMouseEnter={()=>sethovering(i)} >
                    <div className='sec4 center'> {hovering == i ? <div className='iconsContainer center'> 
                            <img alt='' onClick={()=>editSerie(ob)} src={edit_blue} />
                            <img alt='' onClick={()=> setdel_serie(ob['id'])} src={trash_blue} />
                    </div>  : '' } 
                </div>
                    <div className='sec4 center'> <p>{ ob['childs'] }</p> </div>
                    <div className='sec4 center'> <p>{ ob['title'] }</p> </div>
                    <div className='sec4 center '> <div className='imgContainer center'><img alt='' src={backend_url+ob['icon']} /> </div>  </div>           
                </div>
            )  }
            </>    
            : <div className='noContent'>
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
