import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react'
import { getToken } from '../store/actions/user';
var _ = require('lodash');

class Callback extends Component {
  state={}

  static getDerivedStateFromProps(props) {
    const search = props.location.search, params = new URLSearchParams(search);
    const authCode = params.get('code');
    console.log('-------- callback')
    console.log(props.token)
    if(!_.isEmpty(authCode) && _.isEmpty(props.token.access_token)) {
       props.getToken(authCode);
    }
  }

  render() {
    // if(!_.isEmpty(this.props.user.access_token)) {
    //   return <Redirect to='/' />
    // } 
      
    return null
  }
}

Callback.propTypes = {
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  token: state.token,
  errors: state.errors
})

// export default Callback
export default connect(mapStateToProps, {getToken})(Callback)
