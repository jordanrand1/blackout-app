import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getLeaderboard } from '../reducers/codapi';
import {
  Form,
  Button,
} from 'semantic-ui-react';
import Profile from './Profile';

class Home extends Component {

  state = {
    title: '',
    platform: '',
    username: '',
    days: '',
    type: '',
    time: '',
    mode: '',
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    const { dispatch } = this.props
    dispatch(getLeaderboard(this.state))
  }

  render() {
    return (
      <>
        <Profile />
        <Header as="h1" textAlign="center">Home Component</Header>
        <Form>
          <Form.Input
            value={this.state.title}
            name='title'
            placeholder='Title'
            onChange={this.handleChange}
          >
          </Form.Input>
          <Form.Input
            value={this.state.platform}
            name='platform'
            placeholder='Platform'
            onChange={this.handleChange}
          >
          </Form.Input>
          <Form.Input
            value={this.state.username}
            name='username'
            placeholder='Username'
            onChange={this.handleChange}
          >
          </Form.Input>
          <Form.Input
            value={this.state.days}
            name='days'
            placeholder='Days'
            onChange={this.handleChange}
          >
          </Form.Input>
          <Form.Input
            value={this.state.type}
            name='type'
            placeholder='Type'
            onChange={this.handleChange}
          >
          </Form.Input>
          <Form.Input
            value={this.state.time}
            name='time'
            placeholder='Time'
            onChange={this.handleChange}
          >
          </Form.Input>
          <Form.Input
            value={this.state.mode}
            name='mode'
            placeholder='Mode'
            onChange={this.handleChange}
          >
          </Form.Input>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </Form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { data: state.codapi }
}

export default connect(mapStateToProps)(Home);

