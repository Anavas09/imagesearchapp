import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

const Searcher = ({setSearch}) => {

    const [searchTerms, setSearchTerms] = useState('');
    const [error, setError] = useState(false);

    const handleOnSubmit = (e) =>{
        e.preventDefault()

        if(searchTerms === ''){
            setError(true)
            return;
        }

        setError(false)
        setSearch(searchTerms)
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        onChange={(e)=> setSearchTerms(e.target.value)}
                        value={searchTerms}
                        placeholder="Look for an image, example: coffee, café, comida or food"
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                        value="Search"
                    />
                </div>
            </div>
            { (error) ? <Error message="Look for some image :D"/>: null }
        </form>
    );
};

Searcher.propTypes = {
    setSearch: PropTypes.func.isRequired,
};

export default Searcher;