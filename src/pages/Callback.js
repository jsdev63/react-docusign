import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Loader, Grid, Message } from 'semantic-ui-react'
import { getToken } from '../store/actions/user';

var _ = require('lodash');

const getAuthCode = (props) => {
  const search = window.location.search, params = new URLSearchParams(search);
  return params.get('code');
}

class Callback extends Component {
  state={
    isload: true
  }

  static getDerivedStateFromProps(props, state) {
    if(!_.isEmpty(props.user.accessToken) | !_.isEmpty(props.errors)) {
       return state.isload = false
    }
    return true;
  }

  componentDidMount() {
    const authCode = getAuthCode();
    if(!_.isEmpty(authCode) && _.isEmpty(this.props.user.accessToken)) {
      this.props.getToken(authCode);
   }
  }

  render() {
    if(!_.isEmpty(this.props.user.accessToken)) {
      return <Redirect to='/' />
    } 
      
    return (
      <Grid textAlign='center' centered style={{ height: '100%' }} className="centered">
        <Grid.Column  style={{ paddingTop: '50vh'}}>
          { this.state.isload?
            <Loader active inline='centered' size='large'>Loading</Loader>
            :
            <Message
              warning
              header='Bad request, Please go home page!'
              content='Your token is invlaid, please try again.'
              style={{width: '50%', margin: 'auto', textAlign: 'center'}}
            />
          }
        </Grid.Column>
      </Grid>
    )
  }
}

Callback.propTypes = {
  errors: PropTypes.string,
  user: PropTypes.object
}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
})

// export default Callback
export default connect(mapStateToProps, {getToken})(Callback)
