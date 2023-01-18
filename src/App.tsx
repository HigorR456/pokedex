import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const [list, setList]: any = useState([]);
  const [lines, setLines]: any = useState('Show 20 lines');
  const [offset, setOffSet]: any = useState({
    initial: 0,
    lines: 10
  });

  const handlePreviousPage = () => {
    setOffSet({
      initial: offset.initial - offset.lines,
      lines:  offset.lines
    });
  }

  const handleNextPage = () => {
    setOffSet({
      initial: offset.initial + offset.lines,
      lines:  offset.lines
    });
  }

  const handlePageLines = () => {
    if (offset.lines === 20) {
      setLines('Show 20 lines');
      setOffSet({
        initial: offset.initial,
        lines:  10
      });
    } else {
      setLines('Show 10 lines');
      setOffSet({
        initial: offset.initial,
        lines:  20
      });
    }
  }

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset.initial}&limit=${offset.lines}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      setList(data.results);
    });
  }, [offset]);


  return (
    <div className="App">

      <button onClick={handlePageLines}>{lines}</button>


      <button onClick={handlePreviousPage} disabled={offset.initial===0} >Previous Page</button>
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
        <p className='experience'>&nbsp;EXP&nbsp;{info.base_experience}&nbsp;</p>
      </div>
      
    </div>
  )
}

export default App
