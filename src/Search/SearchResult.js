import React from 'react';
import SearchResultTable from './SearchResultTable';

function SearchResult({ searchResult, noResult, hasSearchError }) {
  const searchResultNodes = (
    <section className="search-result">
      {/* show heading only if the user has searched */}
      {(searchResult.length > 0 || noResult === true) && <h2>Matched Transcripts</h2>}

      {/* show search result table only if there are any search results */}
      {searchResult.length > 0 && <SearchResultTable transcriptList={searchResult} />}

      {/* show the no result message if there aren't any results */}
      {noResult && <p>There was no matching transcript</p>}
    </section>
  );

  return (
    <div className="search-result-container">
      {/* display the search result nodes above is there aren't any search errors only */}
      {hasSearchError === false && searchResultNodes}
    </div>
  );
}

export default SearchResult;
