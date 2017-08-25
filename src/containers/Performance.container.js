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
    if(!this.props.performance || this.props.performance.length === 0) return null;
    if(!this.props.worldMap || this.props.worldMap.length === 0) return null;
    return (
      <Container>
        <Row>
          <Col>
            <h2>Likes and Comments</h2>
            <LineAndBarsChart data={this.props.performance} width="800" height="460" />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Followers</h2>
            <Linechart data={this.props.performance} width="800" height="460" />
          </Col>
        </Row>
        {/* <h2>Best time to post</h2>
          <Heatmap width="800" height="460" /> */}
        <Row>
          <Col>
            <h2>Map of influence</h2>
            <Worldmap data={this.props.worldMap} width="800" height="460" />
          </Col>
        </Row>
      </Container>
    );
  }

}

const mapStateToProps = (state) => ({
  access_token: state.authorization.access_token,
  performance: state.stats.performance,
  worldMap: state.stats.worldMap,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceContainer);
