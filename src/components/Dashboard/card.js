import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Swing from 'react-swing';
import { Direction } from 'swing';

import styles from './card.css';
import FakeData from './fakeData.js';
import KeyHandler, {KEYPRESS} from 'react-key-handler';


class Card2 extends Component {

  constructor(props, context) {
    super(props, context);

    this.rendered = 0;

    // An instance of the Stack
    this.state = {
      stack: null,
      cards: [],
      currentIndex: 0,
      floor: 0,
    };

    this.fetchLikeableMedia()
  }

  fetchLikeableMedia () {
    fetch('http://192.168.0.49:3000/tags/goldenhour', {
      method: "GET",
      headers: {
        'Authorization': 'Bearer 5885499160.38553e7.ccfd98b2185a4fed833163bf17e86b04',
      }
    })
    .then((response) => response.json())
    .then((likeableMedia) => {
      console.log(likeableMedia);

      const newCards = this.state.cards.concat(likeableMedia.data);
      this.setState({
        cards: newCards,
        floor: this.state.cards.length,
        currentIndex: newCards.length-1
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  throwCard (direction) {
    return () => {

      if(this.state.currentIndex < this.state.floor) return;
      // get Target Dom Element
      const el = ReactDOM.findDOMNode(this.refs.stack.refs[`card${this.state.currentIndex}`]);
      const postUrl = this.state.cards[this.state.currentIndex].postUrl;

      if (direction === Direction.RIGHT) {
        fetch(`https://private-cb530a-bravakin.apiary-mock.com/media/${postUrl}/like`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 5885499160.38553e7.ccfd98b2185a4fed833163bf17e86b04'
          }
        });
        const card = this.state.stack.getCard(el);
        card.throwOut(100, 200, direction);
      } else {
        const card = this.state.stack.getCard(el);
        card.throwOut(100, 200, direction);
      }


      const currentIndex = this.state.currentIndex - 1;
      this.setState({currentIndex: currentIndex});

      if (currentIndex < this.state.floor) {
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
        backgroundImage: 'url(' + data.imageURL + ')',
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
