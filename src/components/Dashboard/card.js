import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './card.css';
import Photo from './photo.jpg'
import Swing, { Stack, Card, Direction } from './swing.js';
import axios from 'axios';
import faker from 'faker';
import FakeData from './fakeData.js';

class Card2 extends Component {


  constructor(props, context) {
    super(props, context);

    // An instance of the Stack
    this.state = {
      stack: null
    };

  }

  handleSubmit = (formData) => {
    const {username, password} = formData;
    this.props.login(username, password);
  }

 fakeData = () => {
  console.log('FakeData: ', FakeData);
  let ref = 0;
  return FakeData.map((data) =>
  <div className="card" ref={data.id}
    style={{backgroundImage: "url(" + data.image + ")", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>)
}

  componentWillMount() {
    this.state = { images: [] };
    axios.get('https://api.imgur.com/3/gallery/hot/viral/0')
    .then(response => this.setState({ images: response.data.data }));
    console.log(this.state.images);
  }

  // throwOut Method
  throwCard() {
    // Swing Card Directions
    console.log('Swing.DIRECTION', Swing.DIRECTION);

    // Swing Component Childrens refs
    const target = this.refs.stack.refs.card2;

    // get Target Dom Element
    const el = ReactDOM.findDOMNode(target);

    // stack.getCard
    const card = this.state.stack.getCard(el);

    // throwOut method call
    card.throwOut(100, 200, Swing.DIRECTION.RIGHT);
  }

  render() {
    return (
      <div>
        <div id="viewport">

          {/*
            Swing Element
            */}
            <Swing
              className="stack"
              tagName="div"
              setStack={(stack)=> this.setState({stack:stack})}
              ref="stack"
              throwout={(e)=>console.log('throwout',e)}
              >
              {/*
                children elements is will be Card
                */}
                {this.fakeData()}
              </Swing>
            </div>
            <div className="control">
              <button type="button" onClick={this.throwCard.bind(this)}>
                throw Card
              </button>
            </div>
          </div>
        )
      }
    }

    export default Card2;
