import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Searcher from './components/Searcher';
import ImageList from './components/ImageList';

function App() {

  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [results, setTotalResults] = useState(0);

  useEffect(()=> {
    const fecthAPI = async () => {

      if(search === ''){
        return;
      }

      const per_page = 30;
      const image_type = 'all';
      const key = '13244726-8eec94928af776408675d8ad9'

      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${per_page}&image_type=${image_type}&page=${actualPage}`

      await axios.get(url)
              .then(res => {
                const { hits, totalHits } = res.data;
                setImages(hits);
                setTotalResults(totalHits);
              })

      const pageNumbers = Math.ceil( results / per_page);
      setTotalPages(pageNumbers)

      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth', block: 'end'})
    }

    fecthAPI();
  }, [actualPage, results, search])

  const prevPage = () => {
    let newActualPage = actualPage - 1;
    setActualPage(newActualPage)
  }

  const nextPage = () => {
    let newActualPage = actualPage + 1;
    setActualPage(newActualPage)
  }

  // Logic for displaying page numbers
  const pageNumbers = [];
  if(totalPages > 1){
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  }

  const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          className="page-item"
          key={number}
          id={number}
          onClick={()=>setActualPage(number)}
        >
          <button className="page-link" href="#">{number}</button>
        </li>
      );
    })

  const prevButton = actualPage === 1 ? null:
    <button onClick={()=> prevPage()} type="button" className="btn btn-info mr-1">
      &laquo; Previous
    </button>
  
  const nextButton = actualPage === totalPages ? null:
    <button onClick={()=> nextPage()} type="button" className="btn btn-info ml-1">
      Next &raquo;
    </button>

  return (
    <div className="app container">
      <div className="jumbotron">
        <h4 className="lead text-center">Search Image</h4>

        <Searcher setSearch={setSearch}/>

      </div>
      <div className="row justify-content-center">
        
        <ul className="pagination">
          {prevButton}
          {renderPageNumbers}
          {nextButton}
        </ul>

        <ImageList images={images}/>

        <ul className="pagination">
          {prevButton}
          {renderPageNumbers}
          {nextButton}
        </ul>

      </div>
    </div>
  );
}

export default App;
