import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment, Loader } from 'semantic-ui-react'
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import validateInput from '../validators/docsForm';
import { sendEnvelope } from '../store/actions/envelope';

class DocusignForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'Test',
      lastName: 'User',
      phoneNumber: '123123',
      email: 'testatwe',
      address: 'fwefwefwe',
      city: '234234',
      state: '12312',
      errors: {},
      isLoading: false
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.sendEnvelope(this.state, this.props.history);
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid = () => {
    // const { errors, isValid } = validateInput(this.state);
    // if (!isValid) {
    //   this.setState({ errors });
    // }
    // return isValid;
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        isLoading: false
      });
    }
  }

  componentDidMount() {
    console.log('fwefw')
  }

  render() {
    const { 
      firstName, lastName, phoneNumber, email, address, city, state, errors, isLoading 
    } = this.state;

    return(
      <div className="register-form">
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: '600px' }}>
            <Form size='large' onSubmit={this.onSubmit}>
              <Segment stacked className='form-body'>
                <Header as='h2' color='teal' textAlign='center' className="document-title">
                  Docusign Consept Proof
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
                  <Button color='teal' fluid size='large' disabled={isLoading} className="docusign-btn">
                    {!isLoading
                      ? 'Docusign'
                      : <Loader active inverted inline size='small' />
                    }
                  </Button>
                </Grid.Row>

              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

DocusignForm.propTypes = {
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  errors: state.errors
})

export default connect(mapStateToProps, { sendEnvelope })(DocusignForm)
