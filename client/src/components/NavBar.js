import React, { Component } from 'react';
import { 
  Menu,
  Dropdown,
  Form,
  Button,
  Segment,
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleLogout } from '../reducers/user';
import { getProfile } from '../reducers/codapi';

class NavBar extends Component {

  state = {
    title: '',
    platform: '',
    username: '',
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    const { dispatch } = this.props
    dispatch(getProfile(this.state))
    this.props.history.push(`/profile/${this.state.username}`)
  }

  render() {

    const styles = {
      navItem: { 
        borderRadius: 50,
        marginRight: 5,
        marginLeft: 5,
        color: '#ec7300',
       }
    }

    const platforms =
    [
      {
        text: 'PlayStation',
        value: 'psn'
      },
      {
        text: 'XBOX',
        value: 'xbl'
      },
      {
        text: 'PC (Steam)',
        value: 'steam'
      },
      {
        text: 'PC (Battle.net)',
        value: 'bnet'
      },
    ]

    const titles =
    [
      {
        text: 'Black Ops 4',
        value: 'bo4'
      },
      {
        text: 'Black Ops 3',
        value: 'bo3'
      },
      {
        text: 'WWII',
        value: 'wwii'
      },
      {
        text: 'Infinite Warfare',
        value: 'iw'
      },
    ]

    return (
      <Segment inverted>
        <Menu inverted pointing secondary fluid widths={4}>
          <Link to="/">
            <Menu.Item name="home" />
          </Link>
          <Dropdown 
            selection
            style={styles.navItem}
            placeholder="Select Platform" 
            options={platforms} 
            onChange={(e, data) => this.setState({ platform: data.value })}
          />
          <Form.Input
              value={this.state.username}
              name='username'
              placeholder='Username'
              onChange={this.handleChange}
            >
          </Form.Input>
          <Dropdown 
            selection
            style={styles.navItem}
            placeholder="Select Title" 
            options={titles} 
            onChange={(e, data) => this.setState({ title: data.value })}
          />
          <Button circular onClick={this.handleSubmit}>Submit</Button>
        </Menu>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user, data: state.codapi };
};

export default withRouter(connect(mapStateToProps)(NavBar));

