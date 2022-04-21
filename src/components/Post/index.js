import React,{useState, useEffect} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import api from '../../utils/api'

export const Post = () => {
    const [item, setItem] = useState(null)
    const params = useParams()
    const navigate=useNavigate()
    const handleClick=()=>{
        api.deletePost(params.itemID)
        .then(data=>
            console.log(data),
            navigate('/'))
        .catch(err=>alert(err))
    }

    useEffect(() => {
        api.getPost(params.itemID)
            .then((data) => setItem(data))
            .catch((err) => alert(err))
    }, [])


  return (
    <div>
        <button onClick={handleClick}>Удалить пост</button>
        <pre>{JSON.stringify(item, null, 4)}</pre>
    </div>
  )
}
