import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Swing from 'react-swing';
import { Direction } from 'swing';
import { connect } from 'react-redux';


import styles from './card.css';
import FakeData from './fakeData.js';
import KeyHandler, {KEYPRESS} from 'react-key-handler';



class InstagramCard extends Component {

  constructor(props, context) {
    super(props, context);

    this.rendered = 0;

    // An instance of the Stack
    this.state = {
      stack: null,
      cards: [],
      currentIndex: 0,
      page: 0,
      fetching: true,
      hashtagIndex: 0
    };

    this.fetchLikeableMedia()
  }

  fetchLikeableMedia () {
    this.setState({fetching: true});
    fetch(`http://192.168.0.49:3000/tags/${this.props.hashtags[this.state.hashtagIndex]}`, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + this.props.access_token
      }
    })
    .then((response) => response.json())
    .then((likeableMedia) => {
      console.log(likeableMedia);

      const newCards = this.state.cards.concat(likeableMedia.data);
      this.setState({
        cards: newCards,
        floor: this.state.cards.length,
        currentIndex: newCards.length-1,
        fetching: false,
        hashtagIndex: (this.state.hashtagIndex+1)%this.props.hashtags.length
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
        const card = this.state.stack.getCard(el);
        card.throwOut(100, 200, direction);
      } else {
        const card = this.state.stack.getCard(el);
        card.throwOut(100, 200, direction);
      }


      const currentIndex = this.state.currentIndex - 1;
      this.setState({currentIndex: currentIndex});

      if (currentIndex < this.state.floor) {
        this.fetchLikeableMedia();
      }
    }
  }


  onThrowOut = (e)=> {
    const cardId = e.target.getAttribute('id').split('card')[1];
    const media = this.state.cards[cardId];
    console.log(media);

    if(e.throwDirection === Direction.LEFT) {

    }
    else {
      fetch(`http://192.168.0.49:3000/media/like`, {
        method: 'POST',
        body: JSON.stringify({
          url: media.url
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.access_token
        }
      });
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

  renderLoadingIndicator () {
    if(!this.state.fetching) return null;

    return (
      <div className="loading-container">
        <img
          className="loading"
          src="https://s-media-cache-ak0.pinimg.com/originals/86/07/37/86073779879c4777c617c6cea2e9eac6.gif" />
      </div>
    )
  }

  render() {
    this.rendered++
    return (
      <div>
        <div id="viewport">
          {this.renderLoadingIndicator()}
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

const mapStateToProps = (state) => ({
  hashtags: state.userProfile.hashtags
})

export default connect(mapStateToProps)(InstagramCard);
