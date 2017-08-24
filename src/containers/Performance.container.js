import React from 'react';
import { connect } from 'react-redux';
import Linechart from '../components/performance/Linechart';
// import { Heatmap } from '../components/performance/Heatmap';
import { Worldmap } from '../components/performance/Worldmap';
import LineAndBarsChart from '../components/performance/LineAndBarsChart';

class PerformanceContainer extends React.Component {

  commentsAndLikes: [];

  constructor () {
    super();
    this.state = {
      access_token: null,
      commentsAndLikes: null
    };
  }

  componentWillMount () {

    const myInit = { method: 'GET',
               headers: {
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + this.props.access_token
               },
               mode: 'cors',
               cache: 'default' };

    const myRequest = new Request('http://localhost:3000/performance?timeframe=day',myInit);

    fetch(myRequest)
      .then((response) => response.json())
      .then((response) => {
        // inject into graph
        const processedData = response.stats.map(el => {
          return Object.assign({}, el, {
            date: new Date(el.date)
          });
        });
        console.log(processedData);
        this.setState({ commentsAndLikes: processedData })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render () {
    if(!this.state.commentsAndLikes) return null;
    return (
      <div>
        <h2>Likes and Comments performance</h2>
        <LineAndBarsChart data={this.state.commentsAndLikes} width="800" height="460" />
        <h2>Followers performance</h2>
        <Linechart data={this.state.commentsAndLikes} width="800" height="460" />
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
