import { useState, useEffect } from 'react'

const Pokemon = ({ obj }: any) => {
    
    obj = obj.name;
  
    const [info, setInfo]: any = useState(null);
    const [details, setDetails]: any = useState(null);
    const [spriteView, setSpriteView]: any = useState('front_default');
    const [seeArtwork, setSeeArtwork]: any = useState(null);
    const [infoWrapper, setInfoWrapper]: any = useState({opacity: '0.2'});
    const [goBackToInfo, setGoBackToInfo]: any = useState(true);
    const [cartCount, setCartCount]: any = useState(0);
  
    useEffect(() => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${obj}`)
      .then((res) => res.json())
      .then((data) => {
        setInfo(data);
      })}, []);
  
      const handlePokeName = (e: any) => {
        console.log(e.target.textContent)
        setDetails(e.target.textContent)
      }
  
      const handleReturn = () => {
        setDetails(null);
      }
  
      const handleView = () => {
        if (spriteView === 'back_default') {
          setSpriteView('front_default')
        } else {
        setSpriteView('back_default')
        }
      }
  
      const handleArtwork = () => {
          setSeeArtwork({display: 'none'})
          setInfoWrapper({opacity: '1'})
          setGoBackToInfo(false)
      }
  
      const handleGoBackToInfo = () => {
          setSeeArtwork(null)
          setInfoWrapper({opacity: '0.2'})
          setGoBackToInfo(true)
      }
  
      const handleAddToCart = () => {
        setCartCount(cartCount+1)
      }
  
  
    if (info === null) {
      return <div className='divWrapper'>-</div>
    } else if (details !== null) {
      return (
        <div className='detailsWrapper'>
  
        <img className='artwork' style={infoWrapper} src={info.sprites.other['official-artwork'].front_default}></img>
        <button className='backToInfoBtn' hidden={goBackToInfo} onClick={handleGoBackToInfo}>Return</button>
  
          <div className='infoWrapper' style={seeArtwork}>
  
            <button className='returnButton' onClick={handleReturn}>Return</button>
  
            <div><p>name: {details}</p></div>
            <div><p>exp: {info.base_experience}</p></div>
            <div><p>height: {info.height/10}m</p></div>
            <div><p>weight: {info.weight/10}kg</p></div>
  
            <div className='typeList' >
              <p>type:&nbsp;</p>
              <p className='types'>{info.types[0].type.name}</p>
              <p className='types'>{((info.types.length) >= 2 ? (info.types[1].type.name) : null)}</p>
              <p className='types'>{((info.types.length) >= 3 ? (info.types[2].type.name) : null)}</p>
              <p className='types'>{((info.types.length) >= 4 ? (info.types[3].type.name) : null)}</p>
            </div>
  
            <div className='typeList'>
              <p>abilities:&nbsp;</p>
              <p className='types'>{info.abilities[0].ability.name}</p>
              <p className='types'>{((info.abilities.length) >= 2 ? (info.abilities[1].ability.name) : null)}</p>
              <p className='types'>{((info.abilities.length) >= 3 ? (info.abilities[2].ability.name) : null)}</p>
            </div>
  
            <img className='sprite' src={info.sprites[spriteView]}></img>
            
            <button className='viewBtn' onClick={handleView}>Change view</button>
            <button className='artBtn' onClick={handleArtwork} >See artwork</button>
            <button className='addToCart' onClick={handleAddToCart} >Add to Cart</button>
  
          </div>
  
          
  
        </div>
      )
    } else {
      return (
          <div className='listWrapper'>
            <div className='divWrapper'>
              <span><img className='image' src={info.sprites.front_default}></img></span>
              <p className='name' onClick={handlePokeName} >{info.name}</p>
              <p className='experience'>&nbsp;EXP&nbsp;{info.base_experience}&nbsp;</p>
            </div>
            
          </div>
        )
      }
  }

export default Pokemon;