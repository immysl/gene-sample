import React, { Component } from 'react';
import SearchResult from './SearchResult';

class SearchResultContainer extends Component {
  constructor(props) {
    super(props);

    // save state for search result and no result flag
    this.state = {
      searchResult: {},
      noResult: false
    };
  }

  componentDidUpdate(prevProps) {
    // check if the hasSearchError has got updated
    // if it has then check if it is true and reset searchResult
    if (prevProps.hasSearchError !== this.props.hasSearchError && this.props.hasSearchError === true) {
      this.setState({
        searchResult: {}
      });
    }

    // check if formValues has changed
    // if it has then load the data
    if (prevProps.formValues !== this.props.formValues) {
      this.getGeneData(this.props.formValues);
    }
  }

  // print error to the console and set noResult to true
  printError(error) {
    console.error(`There was a problem with the network request: ${error}`);

    this.setState({
      noResult: true
    });
  }

  // get the gene data using the geneSymbol
  getGeneData(formValues) {
    const lookupUrl = `https://rest.ensembl.org/lookup/symbol/homo_sapiens/${formValues.geneSymbol}.json?;expand=1`;

    fetch(lookupUrl).then((response) => {
      if (response.status !== 200) {
        this.printError(response.statusText);
        return;
      }

      response.json().then((data) => {
        // get the protein sequence data if the API call is successful
        // pass the data to extract info
        this.getSequenceData(formValues, data);
      });
    }).catch((error) => {
      this.printError(error);
    });
  }

  getSequenceData(formValues, geneData) {
    // get the transcript list from the geneData
    const transcriptList = geneData.Transcript;

    // get the stable identifier of the gene
    const stableId = geneData.id;

    // use the stable identifier to get the relevant multiple sequences
    const sequenceUrl = `https://rest.ensembl.org/sequence/id/${stableId}.json?type=protein;multiple_sequences=true`;

    fetch(sequenceUrl).then((response) => {
      if (response.status !== 200) {
        this.printError(response.statusText);
        return;
      }

      response.json().then((proteinList) => {
        // set the search result if successful
        // pass the proteinList and transcriptList to prepare the search results
        this.setSearchResult(formValues, proteinList, transcriptList);
      });
    }).catch((error) => {
      this.printError(error);
    });
  }

  setSearchResult(formValues, proteinList, transcriptList) {
    // format the search result and pass on all the params to getSearchResultObject
    const searchResult = this.getSearchResultObject(formValues, proteinList, transcriptList);

    // check if search result is not empty and set the noResult flag accordingly
    const noResult = searchResult.length === 0 ? true : false;

    // update the state to re-render the SearchResult child component
    this.setState({ searchResult, noResult });
  }


  getSearchResultObject(formValues, proteinList, transcriptList) {
    // sequence position of the amino acid letter
    // need to be -1 because of zero based index
    const seqPosition = formValues.seqPosition - 1;

    // matched transcripts are the actual search results to be displayed
    const matchedTranscripts = [];

    // iterate through the protein list
    proteinList.forEach((protein) => {
      // check if the protein has a match for the amino acid letter in the exact sequence position
      if (protein.seq.charAt(seqPosition) === formValues.aminoAcid) {
        // iterate through the transcript list
        transcriptList.forEach((transcript) => {
          // check if the transcript does a translation
          // if it is then check if the translation ID matches the protein ID
          if (transcript.Translation && transcript.Translation.id === protein.id) {
            // push the matched transcript
            matchedTranscripts.push(transcript);
          }
        });
      }
    });

    return matchedTranscripts;
  }

  render() {
    const { searchResult, noResult } = this.state;
    const { hasSearchError } = this.props;

    return (
      <SearchResult searchResult={searchResult} noResult={noResult} hasSearchError={hasSearchError} />
    )
  }
}

export default SearchResultContainer;
