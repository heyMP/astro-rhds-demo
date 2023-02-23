import '@lit-labs/ssr-dom-shim';
import { LitElement, html, css } from 'lit';
import { state } from 'lit/decorators/state.js';
import '@rhds/elements/rh-button/rh-button.js';
import '@rhds/elements/rh-cta/rh-cta.js';

const tagName = 'my-element';

export class MyElement extends LitElement {
  @state() count = 0;

  #interval?: ReturnType<typeof setInterval>;

  #clickHandler = () => {
    this.count = this.count + 1;
  }

  firstUpdated() {
    this.#interval = setInterval(() => {
      this.count = this.count + 1;
    }, 1000);
    this.addEventListener('click', this.#clickHandler);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this.#interval);
  }

  /* Fails because it needs DOMShim */
  /* render() { */
  /*   return html` */
  /*     <p>Counter: ${this.count}</p> <rh-button>Inc</rh-button> */
  /*   `; */
  /* } */

  render() {
    return html`
      <p>Counter: ${this.count}</p> <rh-cta>Inc</rh-cta>
    `;
  }
}

customElements.define(tagName, MyElement);
