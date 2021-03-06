import React from 'react'
import {
  Header,
  List,
  Card,
  Image,
  Container,
} from 'semantic-ui-react'
import { connect } from 'react-redux'




class Matches extends React.Component {

matchView = () => {
  // if (matches === undefined)
  //   return
  // return matches.map(match => {
  //   return(
  //     <Card>
  //       <Card.Content>
  //         <Card.Header>Map: {match.map}</Card.Header>
  //         <Card.Meta>Mode: {match.mode}</Card.Meta>
  //         <Card.Description>Result: {match.result}</Card.Description>
  //       </Card.Content>
  //     </Card>
  //   )
  // })
}


render() {
  return(
    <>
        <Header textAlign="center">Match History</Header>
      <Container>
        <Card.Group itemsPerRow={1}>
          {this.matchView()}
        </Card.Group>
      </Container>
    </>
  )
}
}

export default Matches
