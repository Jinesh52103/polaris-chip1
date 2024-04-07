import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

class HAXCMSPartyUI extends DDD {
static get tag() {
    return 'haxcms-party-ui';
  }

  static styles = css`
    :host {
      display: block;
      font-family: var(--ddd-theme-font-family);
      color: var(--ddd-theme-text-color);
      --input-padding: 0.5rem;
      --button-padding: 0.5rem 1rem;
      --button-background: var(--ddd-theme-default-keystoneYellow);
      --button-color: var(--ddd-theme-default-keystoneBlack);
    }

    .container {
      padding: 1rem;
    }

    .input-container {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }

    input[type="text"] {
      flex: 1;
      padding: var(--input-padding);
      margin-right: 1rem;
    }

    .add-button {
      padding: var(--button-padding);
      background-color: var(--button-background);
      color: var(--button-color);
      border: none;
      cursor: pointer;
    }

    .party-list {
      display: flex;
      flex-wrap: wrap;
    }

    .party-member {
      margin-right: 1rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
    }

    .delete-button {
      margin-left: 0.5rem;
      padding: 0.3rem;
      background-color: #ff0000;
      color: #ffffff;
      border: none;
      cursor: pointer;
    }

    .save-button {
      padding: var(--button-padding);
      background-color: var(--button-background);
      color: var(--button-color);
      border: none;
      cursor: pointer;
    }
  `;

  static properties = {
    ...DDD.properties,
    partyMembers: { type: Array },
    userInput: { type: String }
  };

  constructor() {
    super();
    this.partyMembers = [];
    this.userInput = '';
  }

  addUser() {
    const sanitizedInput = this.userInput.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (sanitizedInput) {
      this.partyMembers = [...this.partyMembers, sanitizedInput];
      this.userInput = '';
    }
  }

  removeUser(username) {
    this.partyMembers = this.partyMembers.filter(member => member !== username);
  }

  saveParty() {
    this.dispatchEvent(new CustomEvent('save-party', { detail: this.partyMembers }));
  }

  render() {
    return html`
      <div class="container">
        <div class="input-container">
          <input type="text" .value="${this.userInput}" @input="${e => this.userInput = e.target.value}" placeholder="Enter username">
          <button class="add-button" @click="${this.addUser}">Add User</button>
        </div>
        <div class="party-list">
          ${this.partyMembers.map(member => html`
            <div class="party-member">
              <rpg-character hat="random" seed="${member}"></rpg-character>
              <div>${member}</div>
              <button class="delete-button" @click="${() => this.removeUser(member)}">X</button>
            </div>
          `)}
        </div>
        <button class="save-button" @click="${this.saveParty}">Save members to party</button>
      </div>
    `;
  }
}

globalThis.customElements.define(HAXCMSPartyUI.tag, HAXCMSPartyUI);
