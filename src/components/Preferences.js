import React from 'react';

import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

export default class Preferences extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
          </div>
          <div className="col">
            Profile information
          </div>
          <div className="col">
          </div>
        </div>
        <div className="row">
          <div className="col">
            Interesting users
            <ListGroup>
              <ListGroupItem className="justify-content-between">Cras justo odio <i className="fa fa-times" aria-hidden="true"></i></ListGroupItem>
              <ListGroupItem className="justify-content-between">Dapibus ac facilisis in <i className="fa fa-times" aria-hidden="true"></i></ListGroupItem>
              <ListGroupItem className="justify-content-between">Morbi leo risus <i className="fa fa-times" aria-hidden="true"></i></ListGroupItem>
            </ListGroup>
          </div>
          <div className="col">
          </div>
          <div className="col">
            Interesting hashtags
            <ListGroup>
              <ListGroupItem className="justify-content-between">Cras justo odio <i className="fa fa-times" aria-hidden="true"></i></ListGroupItem>
              <ListGroupItem className="justify-content-between">Dapibus ac facilisis in <i className="fa fa-times" aria-hidden="true"></i></ListGroupItem>
              <ListGroupItem className="justify-content-between">Morbi leo risus <i className="fa fa-times" aria-hidden="true"></i></ListGroupItem>
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}
