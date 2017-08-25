import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import {
  addUser,
  setPerformanceData,
  setInfluenceData,
} from '../actions';

import TopMenu from '../components/TopMenu'
import Dashboard from '../components/Dashboard';
import PerformanceContainer from '../containers/Performance.container';
import Preferences from '../components/Preferences';

class Authenticated extends React.Component {
  constructor () {
    super();
    this.state = { access_token: null };
  }


  componentWillMount () {
    this.fetchOptions = {
      method: 'GET',
      headers: {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + this.props.access_token
      },
      mode: 'cors',
      cache: 'default'
    };

    this.fetchUserData();
    this.fetchCommentsAndLikes();
    this.fetchMapData();
  }

  render () {
    if (!this.props.access_token) {
      return <Redirect to="/sign-in" />;
    } else {
      return (
        <div>
          <TopMenu />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Dashboard}/>
              <Route path="/performance" component={PerformanceContainer}/>
              <Route path="/preferences" component={Preferences}/>
            </Switch>
          </div>
        </div>
      )
    }
  }


  fetchUserData () {
    fetch(new Request('http://localhost:3000/me', this.fetchOptions))
    .then((response) => response.json())
    .then((response) => {
      this.props.addUser(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  fetchCommentsAndLikes () {
    fetch(new Request('http://localhost:3000/performance?timeframe=day', this.fetchOptions))
      .then((response) => response.json())
      .then((response) => {
        let processedData = response.stats.map(el => {
          return Object.assign({}, el, {
            // convert the date to a UTC string
            date: new Date(el.date+'Z')
          });
        });

        // sort from oldest to newest to calculate engagement
        processedData = processedData.sort((a,b) => a.date - b.date);
        processedData.forEach((el, index) => {
          el['engagement'] = (index === 0) ?
            el.likes + el.comments :
            processedData[index-1].engagement + el.likes + el.comments
          }
        );
        processedData = processedData.reverse();


        // hack to display 24 hours even if missing data at the end.
        // TODO: account for missing data in the middle of the data set too
        for (let i = 0; i < 24; i++) {
          if (!processedData[i]) {
            processedData[i] = Object.assign({}, processedData[i-1]);
            processedData[i].date = new Date(processedData[i-1].date - 60*60*1000)
            processedData[i].likes = 0
            processedData[i].comments = 0
            processedData[i].followers = 0
          }
        }

        this.props.setPerformanceData(processedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fetchMapData() {
    fetch(new Request('http://localhost:3000/influence', this.fetchOptions))
      .then((response) => response.json())
      .then((response) => {
        this.props.setInfluenceData(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

const mapStateToProps = (state) => ({
  username: state.userProfile.username,
  access_token: state.authorization.access_token
});

const mapDispatchToProps = (dispatch) => ({
  addUser: (user) => dispatch(addUser(user)),
  setPerformanceData: (data) => dispatch(setPerformanceData(data)),
  setInfluenceData: (data) => dispatch(setInfluenceData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authenticated);
