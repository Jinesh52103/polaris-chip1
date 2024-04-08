import { LitElement, html, css } from 'lit';

export class CounterApp extends LitElement {

  static get tag() {
    return 'counter-app';
  }

  constructor() {
    super();
    this.counter = 0;
    this.min = 0;
    this.max = 100;
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: Arial, sans-serif;
        background-color: var(--background-color, lightblue);
        max-width: 400px;
        margin: auto;
        padding: 16px;
        box-sizing: border-box;
      }

      .counter {
        font-size: 3em;
        color: var(--counter-color, black);
        margin-bottom: 16px;
        transition: color 0.3s;
        display: flex;
        text-align: center;
        justify-content: center;
      }

      .buttons {
        display: flex;
        gap: 8px;
      }

      button {
        padding: 12px 24px;
        font-size: 1.5em;
        cursor: pointer;
        background-color: limegreen;
        color: white;
        border: none;
        border-radius: 8px;
        transition: background-color 0.3s;
      }

      button:hover,
      button:focus {
        background-color: limegreen;
      }

      button:disabled {
        background-color: #95a5a6;
        cursor: not-allowed;
      }

      .counter-color-change {
        color: hotpink;
      }
    `;
  }

  render() {
    return html`
    <confetti-container id="confetti">
      <div class="counter ${this.counter >= 21 ? 'counter-color-change' : ''}">
        ${this.counter}
      </div>
      <div class="buttons">
        <button @click="${this.handleDecrement}" ?disabled="${this.min === this.counter}">-</button>
        <button @click="${this.handleIncrement}" ?disabled="${this.max === this.counter}">+</button>
      </div>
      </confetti-container>
    `;
  }

  static get properties() {
    return {
      counter: { type: Number },
      min: { type: Number },
      max: { type: Number },
    };
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('counter')) {
      this.updateCounterColor();
      if (this.counter === 21) {
        this.makeItRain();
      }
    }
  }

  updateCounterColor() {
    const counterElement = this.shadowRoot.querySelector('.counter');
    if (this.counter === 18 || this.counter === 21 || this.counter === this.min || this.counter === this.max) {
      counterElement.style.color = 'hotpink';
    } else {
      counterElement.style.color = 'black';
    }
  }

  handleIncrement() {
    if (this.counter < this.max) {
      this.counter += 1;
    }
  }

  handleDecrement() {
    if (this.counter > this.min) {
      this.counter -= 1;
    }
  }
  
  //For some reason if I comment the function below the counter app will show however when I don't comment it out then I'm not able to see the counter app.

  // makeItRain() {
    // this is called a dynamic import. It means it won't import the code for confetti until this method is called
    // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
    // will only run AFTER the code is imported and available to us
    // import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
    //   (module) => {

        // setTimeout(() => {
//           this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
//         }, 0);
//       }
//     );
//   }
 }

globalThis.customElements.define(CounterApp.tag, CounterApp);
