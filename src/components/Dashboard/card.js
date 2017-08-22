import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Swing from 'react-swing';
import { Direction } from 'swing';

import styles from './card.css';
import Photo from './photo.jpg'
import faker from 'faker';
import FakeData from './fakeData.js';
import KeyHandler, {KEYPRESS} from 'react-key-handler';


class Card2 extends Component {

  constructor(props, context) {
    super(props, context);

    this.rendered = 0;

    // An instance of the Stack
    this.state = {
      stack: null,
      cards: FakeData,
      currentIndex: 0,
      page: 0,
    };

  }
  // TODO: fetch likeable media
  // TODO: when done `this.setState({
  //  currentIndex: likeableMedia.length,
  // })`

  fetchLikeableMedia () {
    fetch('https://private-cb530a-bravakin.apiary-mock.com/tags/nature')
    .then((response) => response.json())
    .then((likeableMedia) => {

      this.setState({
        cards: this.state.cards.concat(likeableMedia.data)
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  throwCard (direction) {
    return () => {

      if(this.state.currentIndex > this.state.cards.length) return;

      if(this.state.cards.length === 0) return;
      // get Target Dom Element
      const el = ReactDOM.findDOMNode(this.refs.stack.refs[`card${this.state.currentIndex}`]);
      const card = this.state.stack.getCard(el);
      card.throwOut(100, 200, direction);


      const currentIndex = this.state.currentIndex+1;
      this.setState({currentIndex: currentIndex});

      if (currentIndex > this.state.cards.length-1) {
        // TODO: call `this.fetchLikeableMedia()`
        this.fetchLikeableMedia();
      }
    }
  }


  onThrowOut = (e)=> {
    // TODO: post like
    if(e.throwDirection === Direction.LEFT) {
      console.log('Don\'t like it.');

    }
    else {
      console.log('I like it.');
    }
  }

  // ============================================== RENDERING

  renderCards() {
    return this.state.cards.map((data, index) => {

      const style = {
        backgroundImage: 'url(http://www.petmd.com/sites/default/files/hypoallergenic-cat-breeds.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };

      return (
        <div
          className="card"
          id={`card${index}`}
          key={`card${index}`}
          ref={`card${index}`}
          style={style}
          >
          {data.username}
        </div>
      );
    })
  }

  render() {
    this.rendered++
    return (
      <div>
        <div id="viewport">
          <Swing
            className="stack"
            tagName="div"
            setStack={(stack)=> {
              this.setState({stack:stack})
            }}
            ref="stack"
            throwout={this.rendered === 1 ? this.onThrowOut : null}
            >
            {/* children elements is will be Card */}
            {this.renderCards()}
          </Swing>
        </div>
        <div className="control">
          <KeyHandler keyEventName={KEYPRESS} keyValue="j" onKeyHandle={this.throwCard(Direction.LEFT)} />
          <KeyHandler keyEventName={KEYPRESS} keyValue="l" onKeyHandle={this.throwCard(Direction.RIGHT)} />
        </div>

      </div>
    )
  }
}

export default Card2;
