import React, { Component } from 'react';

class MultiInputSearchForm extends Component {
  constructor(props) {
    super(props);

    // bind event listener function to this component's context
    this.submitSearch = this.submitSearch.bind(this);

    this.state = {
      invalid: {
        geneSymbol: false,
        seqPosition: false,
        aminoAcid: false
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // check if the isMultiInputForm has changed (if the active form has changed or not)
    // and if it has then check if it is not the multi input form (single input form)
    if (prevProps.isMultiInputForm !== this.props.isMultiInputForm && this.props.isMultiInputForm === false) {
      // reset the invalid error object in this multi input search form as the current active form is the single input form
      this.setState({
        invalid: {
          geneSymbol: false,
          seqPosition: false,
          aminoAcid: false
        }
      });
    }
  }

  submitSearch(event) {
    event.preventDefault();

    const formValues = {
      geneSymbol: this.geneSymbol.value,
      seqPosition: this.seqPosition.value,
      aminoAcid: this.aminoAcid.value
    };

    // update hasErrors flag
    const hasErrors = this.validateSearchForm(formValues);

    if (hasErrors === true) {
      // update the parent component with the error and isMultiInputForm flags
      this.props.updateSearchError(true, true);
    } else {
      // update the parent component with the error and isMultiInputForm flags      
      this.props.updateSearchError(false, true);

      // update the parent component with the formValues
      this.props.onSearchSubmit(formValues);
    }
  }

  validateSearchForm(formValues) {
    const { geneSymbol, seqPosition, aminoAcid } = formValues;

    let hasErrors = false;

    let invalid = {
      geneSymbol: false,
      seqPosition: false,
      aminoAcid: false
    };

    // check if gene symbol input is empty
    if (!geneSymbol) {
      invalid.geneSymbol = true;
      hasErrors = true;
    }

    // check if sequence position input is empty or if it is zero or alpha character
    // (parsing returns NaN which is less than zero)
    if (!seqPosition || !(+seqPosition > 0)) {
      invalid.seqPosition = true;
      hasErrors = true;
    }

    // check if amino acid input is empty or if it is more than one character
    if (!aminoAcid || aminoAcid.length !== 1) {
      invalid.aminoAcid = true;
      hasErrors = true;
    }

    // update the component state with the invalid error object
    this.setState({ invalid });

    return hasErrors;
  }

  render() {
    return (
      <form className="search-form multiple-input-search" onSubmit={this.submitSearch}>
        <h2>Simple Search</h2>
        {/* show error message if gene symbol input is empty */}
        {this.state.invalid.geneSymbol && <p className="error">Please enter a gene symbol</p>}

        {/* show error message if sequence position input is empty */}
        {this.state.invalid.seqPosition && <p className="error">Please enter protein sequece position</p>}

        {/* show error message if amino acid letter input is empty */}
        {this.state.invalid.aminoAcid && <p className="error">Please enter amino acid letter</p>}

        <p>
          <label htmlFor="gene-symbol">Gene Symbol</label>
          <input id="gene-symbol" type="text" placeholder="e.g. BRAF" ref={(input) => this.geneSymbol = input} />
        </p>
        <p>
          <label htmlFor="seq-position">Protein Sequence Position</label>
          <input id="seq-position" type="text" placeholder="e.g. 600" ref={(input) => this.seqPosition = input} />
        </p>
        <p>
          <label htmlFor="amino-acid">Amino Acid Letter</label>
          <input id="amino-acid" type="text" placeholder="e.g. V" ref={(input) => this.aminoAcid = input} />
        </p>
        <p>
          <button type="submit">Search</button>
        </p>
      </form>
    );
  }
}

export default MultiInputSearchForm;
