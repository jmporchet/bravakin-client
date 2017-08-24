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
    fetch(new Request('https://localhost:3000/me', this.fetchOptions))
    .then((response) => response.json())
    .then((response) => {
      this.props.addUser(response.data.username);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  fetchCommentsAndLikes () {
    fetch(new Request('http://localhost:3000/performance?timeframe=day', this.fetchOptions))
      .then((response) => response.json())
      .then((response) => {
        const processedData = response.stats.map(el => {
          return Object.assign({}, el, {
            date: new Date(el.date)
          });
        });
        this.props.setPerformanceData(processedData)
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
