import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const [list, setList]: any = useState([]);
  const [lines, setLines]: any = useState('Show 20 lines');
  const [navigation, setNavigation]: any = useState({
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    last: '...'
  });
  const [buttonStyle, setButtotnStyle] = useState({
    one: 'currentBtn',
    two: 'navigationBtn',
    three: 'navigationBtn',
    four: 'navigationBtn',
    five: 'navigationBtn',
    six: 'navigationBtn',
    last: 'navigationBtn'
  })
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
    console.log(e)

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

      if (offset.initial/offset.lines > 3 && offset.initial/offset.lines < (Math.floor(data.count/offset.lines)-3)) {
        setNavigation({
          one: 1,
          two: (offset.initial/offset.lines)-1,
          three: (offset.initial/offset.lines),
          four: (offset.initial/offset.lines)+1,
          five: (offset.initial/offset.lines)+2,
          six: (offset.initial/offset.lines)+3,
          last: (Math.floor(data.count/offset.lines))
        });
        setButtotnStyle({
          one: 'navigationBtn',
          two: 'navigationBtn',
          three: 'navigationBtn',
          four: 'currentBtn',
          five: 'navigationBtn',
          six: 'navigationBtn',
          last: 'navigationBtn'
        })
      } else if ((offset.initial/offset.lines) > (Math.floor(data.count/offset.lines)-4)) {
        setNavigation({
          one: 1,
          two: ((Math.floor(data.count/offset.lines)) - 5),
          three: ((Math.floor(data.count/offset.lines)) - 4),
          four: ((Math.floor(data.count/offset.lines)) - 3),
          five: ((Math.floor(data.count/offset.lines)) - 2),
          six: ((Math.floor(data.count/offset.lines)) - 1),
          last: (Math.floor(data.count/offset.lines))
        })
        setButtotnStyle({
          one: 'navigationBtn',
          two: 'navigationBtn',
          three: 'navigationBtn',
          four: 'navigationBtn',
          five: (offset.initial/offset.lines === (Math.floor(data.count/offset.lines) - 3)? 'currentBtn' : 'navigationBtn'),
          six: (offset.initial/offset.lines === (Math.floor(data.count/offset.lines) - 2)? 'currentBtn' : 'navigationBtn'),
          last: (offset.initial/offset.lines === (Math.floor(data.count/offset.lines) - 1)? 'currentBtn' : 'navigationBtn')
        })
      } else {
        setNavigation({
          one: 1,
          two: 2,
          three: 3,
          four: 4,
          five: 5,
          six: 6,
          last: (Math.floor(data.count/offset.lines))
        })
        setButtotnStyle({
          one: (offset.initial/offset.lines < 1? 'currentBtn' : 'navigationBtn'),
          two: (offset.initial/offset.lines === 1? 'currentBtn' : 'navigationBtn'),
          three: (offset.initial/offset.lines === 2? 'currentBtn' : 'navigationBtn'),
          four: (offset.initial/offset.lines === 3? 'currentBtn' : 'navigationBtn'),
          five: 'navigationBtn',
          six: 'navigationBtn',
          last: (offset.initial/offset.lines === (Math.floor(data.count/offset.lines))? 'currentBtn' : 'navigationBtn')
        })
      }
    });
  }, [offset]);


  return (
    <div className="App">

      <button onClick={handlePageLines}>{lines}</button>

      <div className='navWrapper'>
        <button className='prevNextBtn' onClick={handlePreviousPage} disabled={offset.initial===0} >Prev</button>
        <button className={buttonStyle.one} onClick={handlePageNumber}>{navigation.one}</button>
        <button className={buttonStyle.two} onClick={handlePageNumber}>{navigation.two}</button>
        <button className={buttonStyle.three} onClick={handlePageNumber}>{navigation.three}</button>
        <button className={buttonStyle.four} onClick={handlePageNumber}>{navigation.four}</button>
        <button className={buttonStyle.five} onClick={handlePageNumber}>{navigation.five}</button>
        <button className={buttonStyle.six} onClick={handlePageNumber}>{navigation.six}</button>
        <button className={buttonStyle.last} onClick={handlePageNumber}>{navigation.last}</button>
        <button className='prevNextBtn' onClick={handleNextPage} >Next</button>
      </div>

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
