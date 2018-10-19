import React from 'react'
import {
  Header,
  List,
  Card,
  Image,
  Container,
} from 'semantic-ui-react'
import { connect } from 'react-redux'

class Profile extends React.Component {

  profileView = () => {
    const { username, mp, } = this.props.profile
    if (mp === undefined) {
      return
    }
    return (
      <>
        <Header as="h1"> {username}</Header>
        <Header as="h3"> Level: {mp.level}</Header>
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
              { this.profileView() }
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
