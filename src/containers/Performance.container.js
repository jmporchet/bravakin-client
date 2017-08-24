import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

import LineAndBarsChart from '../components/performance/LineAndBarsChart';
import Linechart from '../components/performance/Linechart';
import Worldmap from '../components/performance/Worldmap';

class PerformanceContainer extends React.Component {

  constructor () {
    super();
    this.state = {
      access_token: null,
      commentsAndLikes: null,
      mapData: null
    };
  }

  render () {
    if(!this.state.commentsAndLikes) return null;
    if(!this.state.mapData) return null;
    return (
      <Container>
        <Row>
          <Col>
            <h2>Likes and Comments</h2>
            <LineAndBarsChart data={this.state.commentsAndLikes} width="800" height="460" />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Followers</h2>
            <Linechart data={this.state.commentsAndLikes} width="800" height="460" />
          </Col>
        </Row>
        {/* <h2>Best time to post</h2>
          <Heatmap width="800" height="460" /> */}
        <Row>
          <Col>
            <h2>Map of influence</h2>
            <Worldmap data={this.state.mapData} width="800" height="460" />
          </Col>
        </Row>
      </Container>
    );
  }

}

const mapStateToProps = (state) => ({
  access_token: state.authorization.access_token,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceContainer);
