import {bindActionCreators} from 'redux';
import {connect} from "preact-redux";
import SearchComponent from "./SearchComponent";
import {keyupSearchAction} from "./searchActions";

function mapStateToProps(state) {
    console.log('state -->', state);
    return {
        q: state.q,
        // another state props ..
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        keyupSearchAction,
        dispatch
    );
}

const SearchConnector = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchComponent);

export default SearchConnector;