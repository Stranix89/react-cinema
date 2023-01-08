
import './App.css';
import Movie from './componets/Movie';
import {useState, useEffect} from 'react'
import NotFound from './componets/NotFound';
import {Spinner} from 'react-bootstrap'
const movieApi = 'https://imdb-api.com/en/API/SearchMovie/k_lvq1wupy/'
const movieTop = 'https://imdb-api.com/en/API/Top250Movies/k_lvq1wupy'

function App() {
  const [movie,setMovie] = useState([])
  const [tern, setTern] = useState('')
  const [loading, setLoading] = useState(true)
  const [error,setError] = useState(false)

  const onHandleTern = (e) => {
    setTern(e.target.value)
  }

  useEffect(() => {
    fetch(movieTop)
    .then(res => res.json())
    .then(res => { 
      setMovie(res.items)
      setLoading(false)
    })
  },[])

const onHandleSearch = (e) => {
    e.preventDefault()
    setLoading(true)
    fetch(movieApi + tern)
    .then(res => res.json())
    .then(res => {
      if(res.results.length !== 0) {
        setMovie(res.results)
      } else {
        setError(true)
      }
      setLoading(false)
    })
    setTern('')
}

const onNotFound = () => {
  setLoading(true)
  fetch(movieTop)
  .then(res => res.json())
  .then(res => {
    setMovie(res.items)
    setError(false)
    setLoading(false)
  })
}

  return (
    <>
      <header>
        <form action='submit' onSubmit={onHandleSearch}>
          <input type="text" placeholder="Search..." value={tern} onChange={onHandleTern}/>
        </form>
      </header>
      <div className="movies">
          {
          error ? <NotFound onNotFound={onNotFound} /> : 
          (loading ? <Spinner animation="border" variant="light" style={{width: '5rem', height:'5rem', position:'absolute', top:'50%', left:'50%'}} /> : 
          movie.map((elem) => <Movie key={elem.id} {...elem}/>)) 
          }
      </div>
    </>
  );
}

export default App;
