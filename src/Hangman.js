import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from "./words";
import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { 
      nWrong: 0, 
      guessed: new Set(), 
      answer: randomWord(),
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.gameReset = this.gameReset.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  } 

  // resets the current game and set a new word
  gameReset() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    })
  }

  /** render: render game */
  render() {  
  
    let gameState = <p className='Hangman-btns'>{this.generateButtons()}</p>; 

    if (this.state.nWrong >= this.props.maxWrong) {
      gameState = <p className='Hangman-youLose'>You Lose! The word was <span style={{color: 'red'}}>{this.state.answer.toUpperCase()}</span>. Game over.</p>
    }

    if (this.state.answer.split("").map(ltr => this.state.guessed.has(ltr)).every(x => x === true)) {
      gameState = <p className='Hangman-youWin'style={{color: 'green'}}>You win!</p>
    }

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img className='Hangman-img' src={this.props.images[this.state.nWrong]} alt={`Guesses remain: ${this.state.nWrong}/${this.props.maxWrong}`}/>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        <p className='Hangman-guesses'>Number of guesses remaining: {this.props.maxWrong - this.state.nWrong}</p>
        {gameState}
        <div>
      <button className='btn-restart' onClick={this.gameReset}>Restart </button>
        </div>
      </div>
    );
  }
}

export default Hangman;
