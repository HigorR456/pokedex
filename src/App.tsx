import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [list, setList] = useState([]);
  const [pageSetter, setPageSetter] = useState(0);


  const handleNextPage = () => {
    setPageSetter(30);
  }

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${pageSetter}&limit=${pageSetter}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      setList(data.results);
    })
  }, [pageSetter]);


  return (
    <div className="App">

      <button onClick={handleNextPage} >Next Page</button>

      {list.map((item: any) => {
        const result = <Pokemon key={item.name} obj={item} />;
        return result;
      })}
      
    </div>
  )
}

const Pokemon = ({ obj }: any) => {
  obj = obj.name

  const [info, setInfo]: any = useState(null);

  const [num, setNum] = useState(1);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${obj}`)
    .then((res) => res.json())
    .then((data) => {

      setInfo(data);
    })}, []);

  if (info === null) {
    return <div className='divWrapper'>-</div>
  };

  return (
    <div className='listWrapper'>
      
      <div className='divWrapper'>
        <span><img className='image' src={info.sprites.front_default}></img></span>
        <p className='name'>{info.name}</p>
        <p className='experience'>&nbsp;{info.base_experience}&nbsp;</p>
      </div>
      
    </div>
  )
}

export default App
