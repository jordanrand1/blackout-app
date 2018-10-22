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
import { getMatches } from '../reducers/codapi'


class Profile extends React.Component {
 
  componentDidMount() {
    const { username } = this.props.match.params
    const { title, platform } = this.props.profile
    const params = { title, platform, username, days: 20 }
    this.props.dispatch(getMatches(params))
    debugger
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
              <Matches profile={this.props.profile} />
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
