import { useState, useEffect } from 'react'
import './styles/App.scss'
import './styles/Pokemon.scss'
import Buy from './components/Buy'
import Pokemon from './components/Pokemon'

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
    console.log(Math.ceil(63.1))
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
        initial: ((Number.isInteger(offset.initial/20)? offset.initial : offset.initial-10)),
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

      //navigation buttons state and style
      if (offset.initial/offset.lines > 3 && offset.initial/offset.lines < (Math.ceil(data.count/offset.lines)-3)) {
        setNavigation({
          one: 1,
          two: (Math.ceil(offset.initial/offset.lines)-1),
          three: (Math.ceil(offset.initial/offset.lines)),
          four: (Math.ceil(offset.initial/offset.lines)+1),
          five: (Math.ceil(offset.initial/offset.lines)+2),
          six: (Math.ceil(offset.initial/offset.lines)+3),
          last: (Math.ceil(data.count/offset.lines))
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
      } else if ((offset.initial/offset.lines) > (Math.ceil(data.count/offset.lines)-4)) {
        setNavigation({
          one: 1,
          two: ((Math.ceil(data.count/offset.lines)) - 5),
          three: ((Math.ceil(data.count/offset.lines)) - 4),
          four: ((Math.ceil(data.count/offset.lines)) - 3),
          five: ((Math.ceil(data.count/offset.lines)) - 2),
          six: ((Math.ceil(data.count/offset.lines)) - 1),
          last: (Math.ceil(data.count/offset.lines))
        })
        setButtotnStyle({
          one: 'navigationBtn',
          two: 'navigationBtn',
          three: 'navigationBtn',
          four: 'navigationBtn',
          five: (offset.initial/offset.lines === (Math.ceil(data.count/offset.lines) - 3)? 'currentBtn' : 'navigationBtn'),
          six: (offset.initial/offset.lines === (Math.ceil(data.count/offset.lines) - 2)? 'currentBtn' : 'navigationBtn'),
          last: (offset.initial/offset.lines === (Math.ceil(data.count/offset.lines) - 1)? 'currentBtn' : 'navigationBtn')
        })
      } else {
        setNavigation({
          one: 1,
          two: 2,
          three: 3,
          four: 4,
          five: 5,
          six: 6,
          last: (Math.ceil(data.count/offset.lines))
        })
        setButtotnStyle({
          one: (offset.initial/offset.lines < 1? 'currentBtn' : 'navigationBtn'),
          two: (offset.initial/offset.lines === 1? 'currentBtn' : 'navigationBtn'),
          three: (offset.initial/offset.lines === 2? 'currentBtn' : 'navigationBtn'),
          four: (offset.initial/offset.lines === 3? 'currentBtn' : 'navigationBtn'),
          five: 'navigationBtn',
          six: 'navigationBtn',
          last: (offset.initial/offset.lines === (Math.ceil(data.count/offset.lines))? 'currentBtn' : 'navigationBtn')
        })
      }
    });
    console.log(offset.initial/offset.lines)
  }, [offset]);


  if (false) {
    return (
      <div>

      </div>
    )
  } return (
    <div className="App">

      <button onClick={handlePageLines}>{lines}</button>

      <Buy />

      <div className='navWrapper'>
        <button className='prevNextBtn' onClick={handlePreviousPage} disabled={offset.initial===0} >Prev</button>
        <button className={buttonStyle.one} onClick={handlePageNumber}>{navigation.one}</button>
        <button className={buttonStyle.two} onClick={handlePageNumber}>{navigation.two}</button>
        <button className={buttonStyle.three} onClick={handlePageNumber}>{navigation.three}</button>
        <button className={buttonStyle.four} onClick={handlePageNumber}>{navigation.four}</button>
        <button className={buttonStyle.five} onClick={handlePageNumber}>{navigation.five}</button>
        <button className={buttonStyle.six} onClick={handlePageNumber}>{navigation.six}</button>
        <button className={buttonStyle.last} onClick={handlePageNumber}>{navigation.last}</button>
        <button className='prevNextBtn' onClick={handleNextPage} disabled={(offset.initial/offset.lines) === (navigation.last - 1)} >Next</button>
      </div>

      {list.map((item: any) => {
        const result = <Pokemon key={item.name} obj={item} hey/>;
        return result;
      })}

      
    </div>
  )
}

export default App
