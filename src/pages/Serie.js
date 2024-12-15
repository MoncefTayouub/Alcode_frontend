import React , {useEffect , useState} from 'react' 
import Box from '../compoments/Box'
import motocycleIcon from '../files/motocycleIcon.png'
import { useNavigate } from 'react-router-dom';


export default function Serie({selectedSerie,backend_url,setselectedSerie}) {
    const [title , setTitle ] = useState('')
    const [desc , setdesc ] = useState('')
    const [img , setimg ] = useState('')    

    
    useEffect (()=> {
        if (selectedSerie != null) {
            setdesc(selectedSerie['desc'])
            setTitle(selectedSerie['title'])
            setimg(backend_url+selectedSerie['icon'])
        }
    },[selectedSerie])

    const [ data , setData ] = useState()
    const navigate = useNavigate();
    let getData = async () => { 
            
        let respons = await fetch (`${backend_url}owner/profiles/HOME`)
        let data = await respons.json()
        setData(data)
        window.scrollTo(0, 0);
    }
    useEffect(()=> {
        getData()
        window.scrollTo(0, 0);
    },[])

    const handleSettingSerie = (ob)=> {
        setselectedSerie(ob)
        window.scrollTo(0, 0);
        navigate('/serie')
      }

      const startTest = ()=> {
        navigate('/quiz')
      }

  return (
    <div className='Serie padding'>
        <div className='HeaderSerie  center'>
            
            <div className='descpt center'>
                <h3>{title} </h3>
                <p>{desc}</p>
                <div className='twobutns spacebetween'>
                    <button onClick={()=>startTest()} className='full rad20'>ابدأ السلسلة</button>
                </div>
            </div>
            <div className='image center'>
                <div className='containerImage center'>

                <img src={img} alt='' />
                </div>
            </div>
        </div>
        <div className='center gap'>
        {    
        data ? data['content'].map((ob,i)=> 
            <Box key={i} title={ob['title']} ob={ob} imgurl={backend_url+ob['icon']} handleSettingSerie={handleSettingSerie} />
        ) : ''
      }
     </div>
     <div className='twobutns seeMore center padding'>
        <button className='full rad20'>عرض المزيد</button>
    </div>
    </div>
  )
}
