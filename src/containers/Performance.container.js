import React from 'react';
import { connect } from 'react-redux';
import { Linechart } from '../components/performance/Linechart';
// import { Heatmap } from '../components/performance/Heatmap';
import { Worldmap } from '../components/performance/Worldmap';
import LineAndBarsChart from '../components/performance/LineAndBarsChart';

class PerformanceContainer extends React.Component {

  commentsAndLikes: [];

  constructor () {
    super();
    this.state = { access_token: null };
  }

  componentWillMount () {

    const myInit = { method: 'GET',
               headers: {
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + this.props.access_token
               },
               mode: 'cors',
               cache: 'default' };

    const myRequest = new Request('https://private-cb530a-bravakin.apiary-mock.com/performance?timeframe=week',myInit);

    fetch(myRequest)
      .then((response) => response.json())
      .then((response) => {
        // inject into graph
      })
      .catch((error) => {
        console.error(error);
      });


      this.commentsAndLikes = [
        {date: new Date(Date.now() - (1 * 3600000)), likes: 12, followers: 1, comments: 1},
        {date: new Date(Date.now() - (2 * 3600000)), likes: 2, followers: 2, comments: 5},
        {date: new Date(Date.now() - (3 * 3600000)), likes: 0, followers: 2, comments: 0},
        {date: new Date(Date.now() - (4 * 3600000)), likes: 12, followers: 2, comments: 5},
        {date: new Date(Date.now() - (5 * 3600000)), likes: 7, followers: 2, comments: 5},
        {date: new Date(Date.now() - (6 * 3600000)), likes: 0, followers: 2, comments: 2},
        {date: new Date(Date.now() - (7 * 3600000)), likes: 40, followers: 2, comments: 5},
        {date: new Date(Date.now() - (8 * 3600000)), likes: 1, followers: 2, comments: 1},
        {date: new Date(Date.now() - (9 * 3600000)), likes: 12, followers: 2, comments: 1},
        {date: new Date(Date.now() - (10 * 3600000)), likes: 1, followers: 2, comments: 1},
        {date: new Date(Date.now() - (11 * 3600000)), likes: 5, followers: 2, comments: 2},
        {date: new Date(Date.now() - (12 * 3600000)), likes: 1, followers: 2, comments: 0},
        {date: new Date(Date.now() - (13 * 3600000)), likes: 13, followers: 2, comments: 0},
        {date: new Date(Date.now() - (14 * 3600000)), likes: 1, followers: 22, comments: 0},
        {date: new Date(Date.now() - (15 * 3600000)), likes: 22, followers: 2, comments: 0},
        {date: new Date(Date.now() - (16 * 3600000)), likes: 41, followers: 2, comments: 3},
        {date: new Date(Date.now() - (17 * 3600000)), likes: 38, followers: 2, comments: 7},
        {date: new Date(Date.now() - (19 * 3600000)), likes: 33, followers: 2, comments: 1},
        {date: new Date(Date.now() - (19 * 3600000)), likes: 16, followers: 2, comments: 2},
        {date: new Date(Date.now() - (20 * 3600000)), likes: 20, followers: 2, comments: 2}
      ];
  }

  render () {
    return (
      <div>
        <h2>Likes and Comments performance</h2>
        <LineAndBarsChart data={this.commentsAndLikes} width="800" height="460" />
        <h2>Followers performance</h2>
        <Linechart data={this.commentsAndLikes} width="800" height="460" />
        {/* <h2>Best time to post</h2>
        <Heatmap width="800" height="460" /> */}
        <h2>Map of influence</h2>
        <Worldmap width="800" height="460" />
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  access_token: state.authorization.access_token,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceContainer);
