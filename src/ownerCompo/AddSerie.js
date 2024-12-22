import React , {useEffect, useRef , useState} from 'react'
import questionIcon from '../files/questionIcon.svg'
import axios from 'axios'
// import { submitData } from './PutOut'

export default function AddSerie({setGoBack,setreloading, handleFileName,setquizList,quizList,setquiz,serieP,backend_url , SetnavSelect ,navSelect, setSerieP ,errorMsg,setErrorMsg}) {
  const [file , setFile ] = useState(null)
  const [title , setTitle ] = useState('')     
  const [desc , setDesc ] = useState('')
  const [imgContent , setimgContent ] = useState('')
  const [category , setCategory ] = useState(-1)
  
  
  
  const fileInputRef = useRef(null);
  const handleTextClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file)
      console.log("Selected file:", file.name);
    }
  };

  const checkInput =()=> {
    var prim = title =='' || desc == '' || category == -1
    if (serieP != null) 
      if (prim) {
        setErrorMsg(3)
        return 0 
      }else return 1 
    if ( file == null || prim){
      if (file == null) setErrorMsg(2)
        else setErrorMsg(3)  
      return 0
    }
    return 1 
  }


    const setSerie = async ()=> {  
      console.log("checkInput(),setSerie",checkInput(),category)
      if (checkInput()){
        setreloading(true)
        const DataForm= new FormData();
        var method = 'POST'   
        DataForm.append('title',title )
        DataForm.append('icon',file )
        DataForm.append('desc',desc )
        DataForm.append('category', category )
        if (serieP != null) {
          DataForm.append('id',serieP['id'] )
          method = 'PUT'
        } 
        
        let data = null 
        await axios ({
          method : method , 
          url : `${backend_url}owner/serie` ,
          data :  DataForm
      })
      .then((response)=>{
            // console.log(response.data) ;
            setreloading(false)
            data = response.data
            // eslint-disable-next-line eqeqeq
            if (method = 'POST') setquiz(null)
            if (data['status'] == 1 && serieP == null ) {
              SetnavSelect(10)
              setSerieP(data['serie'])
              
            }
            if (data['status'] == 1 && serieP != null ) {
              setquizList(data['quiz'])
              SetnavSelect(7)
            }
            setErrorMsg(8)
            setDesc('')
            setFile(null)
            setTitle('')
            setimgContent('')

          
      }).catch(function (error) {
          // console.log(error)
        });
      }
  }

useEffect(()=> {
  if (serieP != null) {
    setDesc(serieP['desc'])
    setTitle(serieP['title'])
    setimgContent(serieP['icon'])
    if (serieP['category'] != null)
      setCategory(serieP['category'])
  }
  // setTitle(serieP)
},[serieP])

const condleImagContent = ()=> {
  if (file == null) {
    if (imgContent == '') return  <p onClick={handleTextClick} >اختر صورة </p>
    else return  <p onClick={handleTextClick} > {handleFileName(imgContent)}</p>
  }else {
    return  <p onClick={handleTextClick} > {handleFileName(file.name)}</p>
  }
}
const CircleBox = ({ text, colorClass , tpe , setGoBack }) => {  
  return (
    <div className="circle-box">
      <div onClick={()=>setGoBack(tpe)} className={`circle ${colorClass}`}></div>
      <p onClick={()=>setGoBack(tpe)} className="circle-text">{text}</p>
    </div>
  );
};



  return (
    <div className='AddSerie ownerPadding center'>
         <div className="frame">
        <CircleBox tpe={0} setGoBack={setGoBack} text="سلسلة" colorClass="yellow" />
        <CircleBox tpe={1} setGoBack={setGoBack}  text="اختبار" colorClass="blue" />
        <CircleBox tpe={2} setGoBack={setGoBack}  text="أسئلة" colorClass="blue" />
      </div>
        <div className='addHeader center'>
        { condleImagContent()} 
        <input type='file' ref={fileInputRef} onChange={((e)=>handleFileChange(e))} style={{width : 0 , height :0 , display : 0 }} />
        <div  className='questionIcon center'>
            <img src={questionIcon} alt='' />
        </div>
        </div>
              {/* <input className='bigInput' onChange={(e)=>setFullName(e.target.value)} value={fullName} placeholder='الاسم الكامل' /> */}
              <input className='bigInput' onChange={(e)=> {setTitle(e.target.value)}}  value={title}  placeholder='الاسم الكامل' />
              <textarea className='bigInput' onChange={(e)=> {setDesc(e.target.value)}} value={desc} placeholder='تفاصيل' />
              
            <div className='boxesCategory spacebetween'> 
              <div onClick={()=>setCategory(0)} className={category == 0 ? 'catBox-selected catBox center' : 'catBox center'}>A</div>
              <div onClick={()=>setCategory(1)} className={category == 1 ? 'catBox-selected catBox center' : 'catBox center'}>B</div>
              <div onClick={()=>setCategory(2)} className={category == 2 ? 'catBox-selected catBox center' : 'catBox center'}>C</div>
              <div onClick={()=>setCategory(3)} className={category == 3 ? 'catBox-selected catBox center' : 'catBox center'}>CE</div>
              <div onClick={()=>setCategory(4)} className={category == 4 ? 'catBox-selected catBox center' : 'catBox center'}>D</div>
            </div>           
              <div className='twobutns  center padding'>
        <button  className='full rad20' onClick={()=>setSerie() }>التالي</button>
    </div> 
    </div>
  )
}
