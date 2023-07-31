import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import './App.css'

function App() {

 const [ movieName , setmovieName] = useState([]);
 const [ data , setdata] = useState([]);

 function search()
 {
    axios.get("https://api.themoviedb.org/3/search/movie?api_key=6823d286f080c1f6a885aaaf7abb5e93&language=en-US&query=" +movieName+"&page=1&include_adult=false")
        .then((response) => {
            console.log(response);
            setdata(response.data.results);
    })
}
    let link = 'https://image.tmdb.org/t/p/original';

    function trimTitle(tile)
    {
      return(
        (tile.length > 15) ? tile.slice(0,15) + '...' : tile
      )
    }
    function trimOverview(overview)
    {
      return(
        (overview.length > 100) ? overview.slice(0,100) + '...' : overview
      )
    }
    
  return (
    <>
      <div className='head'>
        <div className='logo'>
          <img src='./brand.png' width={120}></img>
        </div>
        <div className='search'>
          <input placeholder='Find movies, TV shows and movies' onChange={(e) => setmovieName(e.target.value)} />
          <button onClick={search}>Search</button>
        </div>
      </div>

      <div className='parent'>
        <div className='detail'>
        {
              data.map((data,i) => {
                return (
                    <div className='box' key={i}>
                      <div className='image'>
                        
                      {
                          (data.poster_path) ? 
                            <img id='movie' src={link+data.poster_path} width={200} height={238} alt='poster'></img>
                          :
                            <img src='../Dummy.jpeg' width={200} height={238} alt='poster'></img>

                      }

                      </div>

                      <div className='des'>
                        <h1>{trimTitle(data.title)}</h1>
                        <p>{trimOverview(data.overview)}</p>
                      </div>
                    </div>
                )
            })
          
        }
      </div>
    </div>
    </>
  )
}

export default App
