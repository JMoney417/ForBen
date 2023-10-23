import React, { useState } from 'react';
import clean from 'clean-tagged-string';
import queryArgsFunctions from '../graphQLUtils/devsSearchQueryArgsBuilder';
import DeveloperBio from './DeveloperBio';


function SearchDevelopers() {
    const [queryState, setQueryState] = useState({queryName: 'devsByFirstName', queryValue: ''});
    const [results, setResults] = useState([]);

    const handleChange = (event) => {
        setQueryState({
            ...queryState,
            [event.target.name]:event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let queryArgsFunction = queryArgsFunctions[queryState.queryName];
        let queryArgs = queryArgsFunction(queryState.queryValue);

        const query = clean `{
            ${queryState.queryName}${queryArgs}{
                id,
                firstName,
                lastName,
                favoriteLanguage,
                yearStarted
            }
        }`

        fetch(`https://dev-bios-graphql-dot-tech-services-1000201953.uc.r.appspot.com/q?query=${query}`)
        .then(res=>res.json())
        .then(res=>setResults(res.data[queryState.queryName]));

    }

  return (
    <div className="container">
        <h1>Search Developer Bios</h1>
        <div className='row'>
            <div className="col-md-6">
                <form id="searchForm" onSubmit={handleSubmit}>
                    <select name="queryName" data-testid="ddlSearch" className='form-control' onChange={handleChange}>
                        <option value="devsByFirstName" data-testid="ddlSearchField">First Name</option>
                        <option value="devsByLastName" data-testid="ddlSearchField">Last Name</option>
                        <option value="devsByFavLang" data-testid="ddlSearchField">Favorite Language</option>
                        <option value="devsByYearStarted" data-testid="ddlSearchField">Year Started</option>
                    </select>
                    <div className="form-group">
                        <input type="text" data-testid="txtSearch" name="queryValue" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" data-testid="submitButton">Search</button>
                    </div>
                </form>
            </div>
        </div>
        {
                results
                ?
                    results.map(dev => <DeveloperBio developer={dev} key={dev.id} />)
                :
                    <div></div>
        }
    </div>
  );
}

export default SearchDevelopers;