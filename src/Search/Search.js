import React, { Component } from 'react';

// The search has three components

// 1. single input search (HGSV search)
import SingleInputSearchForm from './SingleInputSearchForm';

// 2. multi input search (gene symbol, sequence position and amino acid letter)
import MultiInputSearchForm from './MultiInputSearchForm';

// 3. the search result
import SearchResultContainer from './SearchResultContainer';

class Search extends Component {
  constructor(props) {
    super(props);

    // use the state for storing values that regularly change within the component
    this.state = {
      // store the form values
      formValues: {},

      // has any of the search forms got errors?
      hasSearchError: false,

      // if the active form is multi input or single input (HGSV form)
      isMultiInputForm: false
    };

    // bind the event based functions to this component's context
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.updateSearchError = this.updateSearchError.bind(this);
  }

  // use this function to store form values from multi input and single input components
  onSearchSubmit(formValues) {
    this.setState({ formValues });
  }

  // update search errors and the type of the active form
  updateSearchError(hasSearchError, isMultiInputForm) {
    this.setState({ hasSearchError, isMultiInputForm });
  }

  render() {
    const { formValues, hasSearchError, isMultiInputForm } = this.state;

    return (
      <main>
        <MultiInputSearchForm onSearchSubmit={this.onSearchSubmit} 
                              updateSearchError={this.updateSearchError}
                              isMultiInputForm={isMultiInputForm} />

        <SingleInputSearchForm onSearchSubmit={this.onSearchSubmit} 
                               updateSearchError={this.updateSearchError}
                               isMultiInputForm={isMultiInputForm} />
                                
        <SearchResultContainer formValues={formValues} hasSearchError={hasSearchError} />
      </main>
    );
  }
}

export default Search;
