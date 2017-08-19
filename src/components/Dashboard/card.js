import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Swing from 'react-swing';
import { Direction } from 'swing';

import styles from './card.css';
import Photo from './photo.jpg'
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
      style={{backgroundImage: "url(" + data.image + ")", backgroundSize: 'cover', backgroundPosition: 'center'}}>{data.username}</div>  )
    }


    // throwOut Method
    throwCard() {
      // Swing Card Directions
      console.log('Swing.DIRECTION', Swing.DIRECTION);
      // Directions using fetch

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
                throwout={(e)=> {
                  if(e.throwDirection === Direction.LEFT) {
                    console.log('Noooooooo');
                  }
                  else {
                    console.log('I like it');
                  }

                }}
                >
                {/* children elements is will be Card */}
                {this.fakeData()}
              </Swing>
            </div>
            <div className="control">
              <button>I don't like it</button>
              <button>I love it</button>
            </div>
          </div>
        )
      }
    }

    export default Card2;
