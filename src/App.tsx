import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const [list, setList]: any = useState([]);
  const [lines, setLines]: any = useState('Show 20 lines');
  const [currentPage, setCurrentPage]: any = useState({
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    last: '...'
  });
  const [offset, setOffSet]: any = useState({
    initial: 0,
    lines: 10
  });

  //previous page function
  const handlePreviousPage = () => {
    if (Number.isInteger(offset.initial / offset.lines)) {
      setOffSet({
        initial: offset.initial - offset.lines,
        lines:  offset.lines
      });
    } else {
      setOffSet({
        initial: Math.ceil(offset.initial),
        lines:  offset.lines
      });
      console.log(offset.initial)
    }
  }

  //next page function
  const handleNextPage = () => {
    
    if (Number.isInteger(offset.initial / offset.lines)) {
      setOffSet({
        initial: (offset.initial) + offset.lines,
        lines:  offset.lines
      });
    } else {
      setOffSet({
        initial: offset.initial + offset.lines,
        lines:  offset.lines
      });
      console.log(offset)
    }
  }

  //toggle exhibition between 10 and 20 lines
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

  //navigation through page number button function
  const handlePageNumber = (e: any) => {
    console.log(e.target.innerHTML)

    setOffSet({
      initial: ((e.target.innerHTML -1) * offset.lines),
      lines: offset.lines
    });
  }


  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset.initial}&limit=${offset.lines}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      setList(data.results);

      if (offset.initial/offset.lines > 3 && offset.initial/offset.lines < 125) {
        setCurrentPage({
          one: 1,
          two: (offset.initial/offset.lines)-2,
          three: (offset.initial/offset.lines)-1,
          four: (offset.initial/offset.lines),
          five: (offset.initial/offset.lines)+1,
          six: (offset.initial/offset.lines)+2,
          last: (Math.floor(data.count/offset.lines))
        })
      } else if ((offset.initial/offset.lines) > 110) {
        setCurrentPage({
          one: 1,
          two: (currentPage.last - 5),
          three: (currentPage.last - 4),
          four: (currentPage.last - 3),
          five: (currentPage.last - 2),
          six: (currentPage.last - 1),
          last: (Math.floor(data.count/offset.lines))
        })
      } else {
        setCurrentPage({
          one: 1,
          two: 2,
          three: 3,
          four: 4,
          five: 5,
          six: 6,
          last: (Math.floor(data.count/offset.lines))
        })
      }
    });
  }, [offset]);


  return (
    <div className="App">

      <button onClick={handlePageLines}>{lines}</button>


      <button onClick={handlePreviousPage} disabled={offset.initial===0} >Previous</button>

      <button onClick={handlePageNumber}>{currentPage.one}</button>
      <button onClick={handlePageNumber}>{currentPage.two}</button>
      <button onClick={handlePageNumber}>{currentPage.three}</button>
      <button onClick={handlePageNumber}>{currentPage.four}</button>
      <button onClick={handlePageNumber}>{currentPage.five}</button>
      <button onClick={handlePageNumber}>{currentPage.six}</button>
      <button onClick={handlePageNumber}>{currentPage.last}</button>
      <button onClick={handleNextPage} >Next</button>

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
