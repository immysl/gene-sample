import React, { Component } from 'react';

class SingleInputSearchForm extends Component {
  constructor(props) {
    super(props);

    // set the state to have a hasError search flag
    this.state = {
      hasError: false
    };

    // bind the on submit even function to this component's context
    this.submitSearch = this.submitSearch.bind(this);    
  }

  componentDidUpdate(prevProps, prevState) {
    // check if the isMultiInputForm has changed (if the active form has changed or not)
    // and if it has then check if it is the multi input form
    if (prevProps.isMultiInputForm !== this.props.isMultiInputForm && this.props.isMultiInputForm === true) {
      // reset the hasError in this single input search form as the current active form is the multi input form
      this.setState({
        hasError: false
      });
    }
  }

  submitSearch(event) {
    event.preventDefault();

    // check if the HGVS input is empty
    // if it is then display error and return early
    if (!this.hgvsCode.value) {
      this.setHasError(true);
      return;
    }

    try {
      // get form values from the HGVS nomenclature code
      const formValues = this.extractFormValues(this.hgvsCode.value);

      // reset the hasError flag as there are no errors
      this.setHasError(false);

      // update the parent component with the formValues
      this.props.onSearchSubmit(formValues);
    } catch (exception) {
      // update error flag
      this.setHasError(true);
    }
  }

  // extract the gene symbol, sequence position and amino acid letter
  extractFormValues(hgvsCode) {
    // split to find the gene symbol
    const splitMatches = hgvsCode.split('.'); // e.g. BRAF and .p:V600E

    // get the gene symbol
    const geneSymbol = splitMatches[0]; // e.g. BRAF

    // use regex to identify the amino acid letter and the sequence position
    const regexMatches = /([A-Z])([0-9]+)/.exec(splitMatches[1]); // e.g. V600, V and 600

    // get the amino acid letter
    const aminoAcid = regexMatches[1]; // e.g. V

    // get sequence position
    const seqPosition = regexMatches[2]; // e.g. 600

    return { geneSymbol, aminoAcid, seqPosition };
  }

  setHasError(status) {
    // update the error flag state
    this.setState({
      hasError: status
    });

    // update the parent component with the search error status and the isMultiInputForm flag
    this.props.updateSearchError(status, false);
  }

  render() {
    return (
      <form className="search-form single-input-search" onSubmit={this.submitSearch}>
        <h2>HGVS Nomenclature Search</h2>

        {/* show error messae if HGVS code is empty */}
        {this.state.hasError && <p className="error">Please enter HGVS code in correct format</p>}

        <p>
          <label htmlFor="hgvs-code">HGVS Code</label>
          <input id="hgvs-code" type="text" placeholder="e.g. BRAF.p:V600E" ref={(input) => this.hgvsCode = input} />
        </p>
        <p>
          <button type="submit">Search</button>
        </p>
      </form>
    );
  }
}

export default SingleInputSearchForm;
