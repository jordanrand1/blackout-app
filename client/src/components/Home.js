import React from 'react';
import { getLeaderboard } from '../reducers/codapi';
import { connect } from 'react-redux';
import { getProfile } from '../reducers/codapi';
import { 
  Card,
  Menu,
  Dropdown,
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

const PlayerCard = styled(Card)`
  cursor: pointer
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
    this.props.history.push(`/${entry.username}/${this.state.title}/${this.state.platform}`)
  }

  entryItem = () => {
    const { entries } = this.props.leaderBoardData
    if (entries === undefined)
      return
    return entries.map(entry => {
      return(
        <PlayerCard key={entry.rank} color="orange">
          <Card.Content onClick={() => this.goToProfile(entry)}>
            <Card.Header>{entry.username}</Card.Header>
            <Card.Meta>Rank: #{entry.rank}</Card.Meta>
            <Card.Description>KD: {entry.values.kdRatio.toFixed(2)} | Rating {entry.rating}</Card.Description>
          </Card.Content>
        </PlayerCard>
      )
    })
  }

  render() {

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

    return(
      <>
        <HeroImg>
          <BigText textAlign="center">Blackout Tracker</BigText>
        </HeroImg>
        <Container>
          <Menu inverted pointing secondary fluid widths={4}>
            <Dropdown 
              selection
              placeholder="Select Platform" 
              options={platforms} 
              value={this.state.platform}
              onChange={(e, data) => this.setState({ platform: data.value }, () => {this.props.dispatch(getLeaderboard(this.state)) })}
            />
            <Dropdown 
              selection
              placeholder="Select Title" 
              options={titles} 
              value={this.state.title}
              onChange={(e, data) => this.setState({ title: data.value }, () => {this.props.dispatch(getLeaderboard(this.state)) })}
            />
          </Menu>
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