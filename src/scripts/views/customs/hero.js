class Hero extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <picture class="hero">
        <source media="(max-width: 600px)" type="image/jpeg"
          srcset="./images/heros/hero-image_4-small.jpg">
        <img class="hero_image" type="image/webp" src="./images/heros/hero-image_4.webp" 
          width="1000px" alt="almond cookies with flower and lime">
      </picture>
    `;
  }
}

customElements.define('hero-content', Hero);
