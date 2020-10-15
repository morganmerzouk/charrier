import React from 'react';
import PropTypes from 'prop-types';

export default class extends React.Component {
    
    static propTypes = {
        query: PropTypes.string.isRequired,
        onSearch: PropTypes.func.isRequired,
        onSearchReset: PropTypes.func.isRequired,
        onQueryChange: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    search(e) {
        e.preventDefault();

        const value = this.props.query;

        if (value && value.length > 0) {
            onSearch(value);
        } else {
            onSearchReset();
        }
    }

    setQuery(e) {
        e.preventDefault();
        const value = e.target.value;
        onQueryChange && onQueryChange(value);
    }

    render() {
        return <form onSubmit={this.search}>
            <input type="text" className="SearchBar" placeholder="Search images" onChange={this.setQuery} value={this.props.query} />
        </form>;
    }
}
