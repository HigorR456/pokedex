import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  

  return (
    <div className="App">
      <Pokemon />
    </div>
  )
}

const Pokemon = () => {
  const [info, setInfo] = useState([]);
  const [num, setNum] = useState(1);
  const [listNum, setListNum] = useState(20);


  const handleListNum = () => {
    setListNum(listNum+10);
    setNum(num+1);
  }



  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.name);
      setInfo(data.name);
      
      if (num<listNum) {
        setNum(num+1);
      } else {
        console.log('ok')
      }

      document.querySelector('.listWrapper')?.insertAdjacentHTML('beforeend', 
      `<div class='divWrapper'>
      <span><img class='image' src=${data.sprites.front_default}></img></span>
      <p class='name'>${data.name}</p>
      <p>&nbsp;- EXP&nbsp;</p>
      <p class='experience'>${data.base_experience}</p>
      </div>
      `);

    })}, [num])

  return (
    <div className='listWrapper'>
      <button onClick={handleListNum} >Show +10</button>
      
    </div>
  )
}

export default App
