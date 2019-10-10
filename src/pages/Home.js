import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Messages } from '../components/Messages';
import validateInput from '../validators/docsForm';
import { sendEnvelope } from '../store/actions/envelope';
import { login } from '../store/actions/user';
var _ = require('lodash');

class DocusignForm extends Component {
  state = {
    firstName: 'Test',
    lastName: 'User',
    phoneNumber: '123123',
    email: 'react@test.com',
    address: 'United state',
    city: 'New Yok',
    state: '13001',
    errors: {},
    envelope: [],
    isLoading: false,
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.sendEnvelope(this.state, this.props.history, this.props.user);
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  static getDerivedStateFromProps(props, state) {
    if (!_.isEmpty(props.errors)) {
      state.envelope.push({status: 'error'})
      return {
        errors: props.errors,
        isLoading: false
      };
    } 
    if (!_.isEmpty(props.envelope.url)) {
      state.envelope.push({...props.envelope})
       return {
        isLoading: false
      };
    }

    return true;
  }


  render() {
    const { 
      firstName, lastName, phoneNumber, email, address, city, state, errors, isLoading 
    } = this.state;
    const redirectURL = this.props.envelope.url;
    if(!_.isEmpty(redirectURL)) {
      window.location.replace(redirectURL)
    }
  
    if(_.isEmpty(this.props.user.accessToken)) {
      this.props.login(this.props.history)
      return <Loader active inverted inline size='large' />
    } else {
      return(
        <div className="register-form">
          <Grid columns='equal' textAlign='center' style={{ height: '100%' }} className="stackable layout-container">
            <Grid.Column  width={8} style={{maxWidth: '650px'}}>
              <Form size='large' onSubmit={this.onSubmit}>
                <Segment stacked className='form-body'>
                  <Header as='h2' color='teal' textAlign='center' className="document-title">
                    Docusign Consept Proof Example
                  </Header>
                  
                  <Grid columns={2} stackable textAlign='center'>
                    <Grid.Row verticalAlign='middle'>
                      <Grid.Column>
                        <Form.Input
                          fluid
                          placeholder='First Name'
                          name='firstName'
                          defaultValue={firstName}
                          error={errors.firstName ? true : false}
                          onChange={this.onChange}
                        />
                      </Grid.Column>
  
                      <Grid.Column>
                        <Form.Input
                          fluid
                          placeholder='Last Name'
                          name='lastName'
                          defaultValue={lastName}
                          error={errors.lastName ? true : false}
                          onChange={this.onChange}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
  
                  <Grid columns={2} stackable textAlign='center'>
                    <Grid.Row verticalAlign='middle'>
                      <Grid.Column>
                        <Form.Input
                          fluid
                          placeholder='Phone Number'
                          name='phoneNumber'
                          defaultValue={phoneNumber}
                          error={errors.phoneNumber ? true : false}
                          onChange={this.onChange}
                        />
                      </Grid.Column>
  
                      <Grid.Column>
                        <Form.Input
                          fluid
                          type='email'
                          placeholder='Email'
                          name='email'
                          defaultValue={email}
                          error={errors.email ? true : false}
                          onChange={this.onChange}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid> 
                  
                  <Grid columns={1} stackable textAlign='center' className="form-spacing">
                    <Grid.Row verticalAlign='middle'>
                      <Grid.Column>
                        <Form.Input
                          fluid
                          placeholder='Address'
                          name='address'
                          defaultValue={address}
                          error={errors.address ? true : false}
                          onChange={this.onChange}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
  
                  <Grid columns={2} stackable textAlign='center'>
                    <Grid.Row verticalAlign='middle'>
                      <Grid.Column>
                        <Form.Input
                          fluid
                          placeholder='City'
                          name='city'
                          defaultValue={city}
                          error={errors.city ? true : false}
                          onChange={this.onChange}
                        />
                      </Grid.Column>
  
                      <Grid.Column>
                        <Form.Input
                          fluid
                          placeholder='State'
                          name='state'
                          defaultValue={state}
                          error={errors.state ? true : false}
                          onChange={this.onChange}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  
                  <Grid.Row className="form-footer">
                    <Button color='teal' fluid size='large' disabled={isLoading} className="docusign-btn" >
                      {!isLoading
                        ? 'Docusign'
                        : <Loader active inverted inline size='small' />
                      }
                    </Button>
                  </Grid.Row>
  
                </Segment>
              </Form>
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={3}>
              <Messages msg={this.state.envelope} />
            </Grid.Column>
          </Grid>
        </div>
      )
    }
  }
}

DocusignForm.propTypes = {
  errors: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  envelope: state.envelope,
  user: state.user,
})

export default connect(mapStateToProps, { sendEnvelope, login })(DocusignForm)
