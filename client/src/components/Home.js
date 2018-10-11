import React from 'react';
import { getLeaderboard } from '../reducers/codapi';
import { connect } from 'react-redux';
import { 
  Card,
  Image,
  Icon,
  Container,
  Header,
} from 'semantic-ui-react';
import styled from 'styled-components';

const BigText = styled.h1`
  font-family: 'K2D', sans-serif;
  background-color: black;
  color: white;
  text-align: center;
  padding: 0;
  margin: 10 0 0 0;
`

const HeroImg = styled.div`
  background-image: url(${require('../images/hero-home.png')});
  height: 500px;
  background-size: cover;
  background-position: 0px -50px;
`


class Home extends React.Component {

  state = {
    title: 'bo3',
    platform: 'pc',
    time: 'alltime',
    type: 'core',
    mode: 'war',
    page: 1,
  }

  componentDidMount() {
    this.props.dispatch(getLeaderboard(this.state))
  }

  entryItem = () => {
    const { entries } = this.props.leaderBoardData
    if (entries === undefined)
      return
    return entries.map(entry => {
      return(
        <>
          <Card color="orange">
            <Image src='/images/avatar/large/daniel.jpg' />
            <Card.Content>
              <Card.Header>{entry.username}</Card.Header>
              <Card.Meta>{entry.rank}</Card.Meta>
              <Card.Description>KD: {entry.values.kdRatio.toFixed(2)} | Rating {entry.rating} | Games Played: {entry.values.gamesPlayed}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                10 Friends
              </a>
            </Card.Content>
            </Card>
        </>
      )
    })
  }

  render() {
    return(
      <>
        <HeroImg>
          <BigText textAlign="center">Blackout Tracker</BigText>
        </HeroImg>
        <Container>
          <Card.Group itemsPerRow={4}>
            {this.entryItem()}
          </Card.Group>
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { leaderBoardData: state.codapi }
}

export default connect(mapStateToProps)(Home);
