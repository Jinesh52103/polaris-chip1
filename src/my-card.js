import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";

/**
 * Now it's your turn. Here's what we need to try and do:
 * 1. Get you HTML from your card working in here 
 * 2. Get your CSS rescoped as needed to work here
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title = "My card";
    this.backgroundColor = "#f0f0f0";
    this.fancy = false;
    this.description='';
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: var(--background-color, #f0f0f0);
      }

      .card {
        max-width: 400px;
        border: 2px solid #ddd;
        margin: 16px;
        padding: 12px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      img {
        width: 100%;
        height: auto;
      }

      .card-content {
        margin-top: 12px;
        text-align: center;
      }

      h2 {
        margin-bottom: 8px;
      }

      .details-btn {
        display: none;
        background-color: #3498db;
        color: #fff;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 4px;
      }

      .color-btn {
        background-color: #2ecc71;
        color: #fff;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 12px;
      }

      .delete-btn {
        background-color: #e74c3c;
        color: #fff;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 12px;
      }

      details summary {
    font-size: 20px;
    padding: 8px 0;
  }

  details[open] summary {
    font-weight: bold;
  }
  
  details div {
    border: 2px solid black;
    text-align: left;
    padding: 8px;
    height: 70px;
    overflow: auto;
  }
    `;
  }

  openChanged(e) {
    if (e.newState === "open") {
      this.fancy = true;
    } else {
      this.fancy = false;
    }
  }

  render() {
    return html`
      <section class="card" id="colorCard">
      <meme-maker alt="Cat stalking a small toy" image-url="https://cdn2.thecatapi.com/images/9j5.jpg" top-text="I bring you" bottom-text="the death">
      </meme-maker>        
      <div class="card-content">
          <h2>${this.title}</h2>
        <details ?open="${this.fancy}" @toggle="${this.openChanged}">
          <summary>Quotes</summary>
        <div>
            <slot>${this.description}</slot>
          </div>
        </details>
        <button class="color-btn" onclick="location.href='https://hax.psu.edu'" type="button">Details</button>
          <button class="color-btn" @click="${this.changeColor}">Change Color</button>
      <button class="delete-btn" @click="${this.deleteCard}">Delete Card</button>
      <button class="color-btn" @click="${this.duplicateCard}">Duplicate Card</button>
        <button class="color-btn" @click="${this.generateRandomQuote}">Generate Random Quote</button>
      </section>
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      backgroundColor: { type: String },
      fancy: { type: Boolean, reflect: true },
      description: { type: String },
    };
  }

  Details(){

  }

  changeColor() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const cardElement = this.shadowRoot.querySelector('.card');
    cardElement.style.backgroundColor = randomColor;
  }

  duplicateCard() {
    const newCard = document.createElement('my-card');
    newCard.title = this.title;
    newCard.backgroundColor = this.backgroundColor;
    this.parentNode.appendChild(newCard);
  }

  deleteCard() {
    const allCards = this.parentNode.querySelectorAll('my-card');

    if (allCards.length > 1) {
      this.remove();
    } else {
      alert("Cannot delete the last card. At least one card must remain.");
    }
  }

  generateRandomQuote() {
    const quotes = [
      "The sun has set, but the memories linger.",
      "Chase the sunset and discover a world of possibilities.",
      "As the sun sets, let your worries fade away.",
    ];
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    this.description = quotes[randomIndex];
  
    // Update the slot content with the new quote
    const slotElement = this.shadowRoot.querySelector('.card-content slot');
    slotElement.textContent = this.description;
  }
  
  
}




globalThis.customElements.define(MyCard.tag, MyCard);
