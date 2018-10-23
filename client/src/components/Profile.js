import React from 'react'
import {
  Header,
  List,
  Card,
  Image,
  Container,
  Divider
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import Matches from './Matches'
import { getProfile } from '../reducers/codapi'
import axios from 'axios'
import { setFlash } from '../reducers/flash'

import Chart from './Chart'

class Profile extends React.Component {

  state = {
    matches: []
  }
 
  componentDidMount() {
    debugger
    const BASE_URL = 'https://my.callofduty.com/api/papi-client';
    const { title, platform, username } = this.props.match.params
    const params = {title, platform, username, days: 31}

    this.props.dispatch(getProfile(params))

    const matchesEndpoint = BASE_URL + '/crm/cod/v2'
    const uri = 
      `${matchesEndpoint}/title/${title}/platform/${platform}/gamer/${username}/matches/days/${params.days}`
    axios.get(uri)
        .then( res => { this.setState({matches: res.data.data.matches}) } )
        .catch( res => {setFlash(res, 'red')})
  }

  profileView = () => {
    const { username, mp,  } = this.props.profile
    if (mp === undefined) {
      return
    }
    return (
      <>
        <Header as="h1" inverted color="white"> {username}</Header>
        <Header as="h2" inverted color="white"> Level: {mp.level}</Header>
        <p> Kills: {mp.lifetime.all.kills}</p>
        <p> Deaths: {mp.lifetime.all.deaths}</p>
        <p> K/D Ratio: {mp.lifetime.all.kdRatio}</p>
        <p> Wins: {mp.lifetime.all.wins}</p>
        <p> Losses: {mp.lifetime.all.losses}</p>
        <Chart profile={this.props.profile}/>
       </>
    )
  }


      render() {
        return(
            <Container>
              <div>
              { this.profileView() }
              </div>
            <Divider />
            <div>
              <Matches matches={this.state.matches} />
            </div>
            </Container>
        )
      }
}

const mapStateToProps = (state) => {
  return {
    profile: state.codapi
  }
}

export default connect(mapStateToProps)(Profile)
