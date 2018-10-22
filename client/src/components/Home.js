import React from 'react';
import { getLeaderboard } from '../reducers/codapi';
import { connect } from 'react-redux';
import { getProfile } from '../reducers/codapi';
import { 
  Card,
  Image,
  Icon,
  Container,
  Button,
  Grid,
} from 'semantic-ui-react';
import styled from 'styled-components';
import user from '../reducers/user';

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
    platform: 'psn',
    time: 'alltime',
    type: 'core',
    mode: 'war',
    page: 1,
  }

  componentDidMount() {
    this.props.dispatch(getLeaderboard(this.state))
  }

  changePage = (num) => {
    this.setState({page: this.state.page + num}, () => {
      this.props.dispatch(getLeaderboard(this.state))
    })
  }

  goToProfile = (entry) => {
    const { username } = entry
    const { title, platform } = this.state
    const params = {title, platform, username: username}
    this.props.dispatch(getProfile(params))
    this.props.history.push('/profile')
  }

  entryItem = () => {
    const { entries } = this.props.leaderBoardData
    if (entries === undefined)
      return
    return entries.map(entry => {
      return(
        <Card key={entry.rank} color="orange">
          <Card.Content onClick={() => this.goToProfile(entry)}>
            <Card.Header>{entry.username}</Card.Header>
            <Card.Meta>Rank: #{entry.rank}</Card.Meta>
            <Card.Description>KD: {entry.values.kdRatio.toFixed(2)} | Rating {entry.rating} | Games Played: {entry.values.gamesPlayed}</Card.Description>
          </Card.Content>
        </Card>
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
          <Grid>
            <Grid.Column width={4}>
            </Grid.Column>
            <Grid.Column width={8}>
              <Button.Group fluid>
                { this.state.page === 1 ? 
                <div></div> 
                  : 
                <Button icon labelPosition='left' onClick={() => this.changePage(-1)}>
                  Previous
                  <Icon name='left arrow' />
                </Button>
                }
                <Button icon labelPosition='right' onClick={() => this.changePage(1)}>
                  Next
                  <Icon name='right arrow' />
                </Button>
              </Button.Group>
            </Grid.Column>
            <Grid.Column width={4}>
            </Grid.Column>
          </Grid>
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { leaderBoardData: state.codapi }
}

export default connect(mapStateToProps)(Home);
