import './App.css';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [pokemon, setPokemon] = useState({});
  const [pokemonNum, setPokemonNum] = useState(null);
  const [pokemonGuess, setPokemonGuess] = useState("");
  const [pokemonCorrect, setPokemonCorrect] = useState(null);
  const inputRef = useRef(null);

  const handleNewPokemon = () => {
    let random = Math.floor(Math.random()*151);
    setPokemonNum(random);
    setPokemonCorrect(null);
    setPokemonGuess("");
    inputRef.current.focus();
    inputRef.current.value = ''
  }
  
  const handleOnChange = (event) => {
    let guess = (event.target.value).toLowerCase()
    setPokemonGuess(guess);
  }

  const handleOnKeypress = (event) => {
    if(event.charCode === 13){
      checkGuess();
    }
  }

  const checkGuess = () => {
    if(pokemonGuess && pokemonGuess === pokemon.id){
      setPokemonCorrect(true);
    } else {
      setPokemonCorrect(false);
    }
  }

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNum}`)
    .then(res => res.json())
    .then(data => {
      setPokemon({
        id: data.species.name,
        img: data.sprites.other.dream_world.front_default,
        ability: data.abilities[0].ability.name
      })
    })
  }, [pokemonNum])

  return (
    <div className="App">
      <h1>Name that 1st gen pokemon!</h1>
        {pokemonNum
          ? <h1>{`# ${pokemonNum}`}</h1> 
          : <h2>Click to start</h2>}
      <div className='new-pokemon'>
        <button 
          onClick={() => handleNewPokemon()}
        >
          New pokemon
        </button>
      </div>
      <div className='pokemon-hint'>
        <p>Hint by its ability: {pokemon.ability}</p>
        <input 
          className='input'
          onChange={handleOnChange}
          onKeyPress={handleOnKeypress}
          ref={inputRef}
        />
        {(pokemonCorrect === null || pokemonCorrect) ?
          <button 
          className='guess' 
          onClick={checkGuess}
          >
            Guess
          </button>
          :
          <button 
          className='guess-wrong' 
          onClick={checkGuess}
          >
            TRY AGAIN
          </button>}
      </div>
      <div className={pokemonCorrect ? "pokemon-reveal" : "pokemon-hide"}>
        <h2>{pokemon.id}</h2>
        <img src={pokemon.img} />
      </div>
    </div>
  )
}

export default App
