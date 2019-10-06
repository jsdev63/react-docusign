import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Message, Grid } from 'semantic-ui-react'

class LoginForm extends Component {
  state = {
    errors: {},
    envelope: {},
    isLoading: false
  };

  static getDerivedStateFromProps(props, state) {
    console.log(props, state)
    if (props.errors !== state.errors) {
      return {
        errors: props.errors,
        isLoading: false
      };
    } 

    return null;
  }
  

  render() {

    return (
      <Grid.Row className="col">
        <Message color='red'>Red</Message>
        <Message color='orange'>Orange</Message>
        <Message color='yellow'>Yellow</Message>
        <Message color='olive'>Olive</Message>
        <Message color='green'>Green</Message>
      </Grid.Row>
    )
  }
}

LoginForm.propTypes = {
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  envelope: state.envelope,
  errors: state.errors
})

export default connect(mapStateToProps, null)(LoginForm)
