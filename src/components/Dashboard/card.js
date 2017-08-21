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

    // An instance of the Stack
    this.state = {
      stack: null
    };
  }

  alertme = () => {
    alert('helllooooooo');
  }


  fakeData = () => {
    console.log('FakeData: ', FakeData);
    let ref = 0;
    return FakeData.map((data) =>
    <div className="card" throwout={(e)=>console.log('card throwout',e)} ref={data.id}
      style={{backgroundImage: "url(" + data.imageURL + ")", backgroundSize: 'cover', backgroundPosition: 'center'}}>{data.username}</div>  )
    }

    // throwOut Method
    throwCard() {
      const target = this.refs.stack.refs.card11;

      // get Target Dom Element
      const el = ReactDOM.findDOMNode(target);

      // stack.getCard
      const card = this.state.stack.getCard(el);

      // throwOut method call
      card.throwOut(100, 200, Swing.DIRECTION.LEFT);

    }

    throwCard2() {
      const target = this.refs.stack.refs.card11;

      // get Target Dom Element
      const el2 = ReactDOM.findDOMNode(target);

      // stack.getCard
      const card2 = this.state.stack.getCard(el2);

      // throwOut method call
      card2.throwOut(100, 200, Swing.DIRECTION.RIGHT);

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
              <KeyHandler keyEventName={KEYPRESS} keyValue="j" onKeyHandle={this.throwCard.bind(this)} />
              <KeyHandler keyEventName={KEYPRESS} keyValue="k" onKeyHandle={this.throwCard2.bind(this)} />
            </div>

          </div>
        )
      }
    }

    export default Card2;
