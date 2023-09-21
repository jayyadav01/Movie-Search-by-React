import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import './App.css';
import movieTrailer from 'movie-trailer';
import CloseIcon from '@mui/icons-material/Close';
import YouTube from 'react-youtube';

function App() {

 const [ movieName , setmovieName] = useState([]);
 const [ data , setdata] = useState([]);
 const [ showModal , setShowModal ] = useState(false);

 console.log(showModal);
 function search()
 {
    axios.get("https://api.themoviedb.org/3/search/movie?api_key=6823d286f080c1f6a885aaaf7abb5e93&language=en-US&query=" +movieName+"&page=1&include_adult=false")
        .then((response) => {
            setdata(response.data.results);
    })
  }

    let link = 'https://image.tmdb.org/t/p/original';

    function trimTitle(title)
    {
      return(
        (title.length > 15) ? title.slice(0,15) + '...' : title
      )
    }
    function trimOverview(overview)
    {
      return(
        (overview.length > 100) ? overview.slice(0,100) + '...' : overview
      )
    }

    const opts = {
      width : "640",
      height : "400",
      playerVars : {
        autoplay : 1
      }

    }

    async function watchTrailer(e,title)
    {
        e.preventDefault();
        const movieId = await movieTrailer(title)
        console.log(movieId)
        if(movieId)
        {
          setShowModal(movieId.split('?v=')[1])
        }
    }
    
  return (
    <>
      {
        (showModal) ? 
          <div className='container'>

            <div className='modal'>
              <CloseIcon className='close' onClick={() => setShowModal(false)} />
              <YouTube videoId={showModal} opts={opts} />
            </div>

          </div>
          
          :
          ('')
      }

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
                      <a className='watch-trailer' href='' onClick={(e) => watchTrailer(e,data.title)}>Watch Trailer</a>
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
