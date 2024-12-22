import React , {useState , useEffect}from 'react'
import notSub from '../files/notSub.svg'
import axios  from 'axios'
import edit_blue from '../files/edit_blue.svg'
import trash_blue from '../files/trash_blue.svg'
import blue_plus from '../files/blue_plus.svg'
import { useNavigate } from 'react-router-dom';


export default function Quizes({logged,setErrorMsg,serie,quiz,setquiz,setSerie,SetnavSelect,setquizList,quizList,backend_url}) {
    const [ data , setData ] = useState()
    const navigate = useNavigate();

    const [hovering , sethovering ] = useState(-1)
    const boxClass = (index )=> {
        if (parseInt(index)%2 == 1) return 'contentBox center bgContent'
        return 'contentBox center'
    }
    const editSerie =(ob)=> {
        setquiz(ob)
        SetnavSelect(10)
    }

    const addquiz = ()=> {
        SetnavSelect(10)
    }

    // useEffect(()=> {
    //     if (!logged) navigate('/login')
    // },[])

    const [del_serie , setdel_serie] = useState(-1) 
    const handleDelete = async ()=> {
        if (del_serie != -1 ) {
        const DataForm= new FormData();
        DataForm.append('id',del_serie)
        DataForm.append('serie',serie['id'])
        var method = 'DELETE'
      
        // DataForm.append('quiz',quiz)
        
        await axios ({
          method : method , 
          url : `${backend_url}owner/quiz` ,
          data :  DataForm,
      })
      .then((response)=>{
            // console.log(response.data) ;
            let data = response.data
            setquizList(data['quiz'])
            setdel_serie(-1)
            setErrorMsg(6)
            
      }).catch(function (error) {
          console.log(error)
        });
        }
}

    
    return (
    <div className='General positionRelative ownerPadding center'>
        {
        del_serie != -1 ?  <div className='deleteConfirmMessage center' >
        <div className='boxer center'>
            <p>هل تؤكد حذف هذه السلسلة؟</p>
            <div className='center'>
                <button onClick={()=>handleDelete()}>نعم</button>
                <button onClick={()=>setdel_serie(-1)}>لا</button>
            </div>

        </div>
    </div> : ''  

       }
        {/* <div className='search spacebetween'>
            <input placeholder='......'  />  

            <p>ابحث عن </p>
        </div> */}

        <div className='contentHeader contentBox center'>            
            <div className='sec center' > <img onClick={()=>addquiz()} src={blue_plus} alt='' /> </div>
            <div className='sec center'> <p>{quizList ? quizList.length +" سؤال " : ' لا سؤال '}</p> </div>
            <div className='sec center'>  <p>الاسئلة</p></div>
        </div>
        {
            quizList ? quizList.map((ob,i)=>
                <div key={i} className= {boxClass(i) } onMouseEnter={()=>sethovering(i)} >
                    <div className='sec center'> {hovering == i ? <div className='iconsContainer center'> 
                            <img alt='' onClick={()=>editSerie(ob['quizOB'])} src={edit_blue} />
                            <img alt='' onClick={()=>setdel_serie(ob['quizId'])} src={trash_blue} />
                         </div>  : '' } 
                </div>
                    <div className='sec center '>   </div>           
                    <div className='sec center'> <p>{ ob['question'] }</p> </div>
                </div>
            )  
            :''
        }

        
    </div>
  )
}
