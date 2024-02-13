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
      <meme-maker alt="Cat stalking a small toy" image-url="data:image/jpeg;base64,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" top-text="I bring you" bottom-text="the death">
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
