class ThemeSwitcher extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.path = this.getAttribute("path")
    this.themes = this.getAttribute("themes").split(',');
    this.ext = this.getAttribute("ext") || "jpg";

    this.render();
    this.setupEventListeners();
    this.loadSavedTheme();
  }

  render() {
    const style = `
      :host {
        
position: fixed;
        bottom: 0;
        left: 0;
width: 50px;
        z-index: 999999;
        padding: 0;

        box-sizing: border-box;
        display: flex;
flex-direction: column;
        width: 100%;
        gap: 3px;
        padding: 3px;
      }
      button {
        transition: 200ms;
        height: 50px;
        border: 1px solid var(--bg);
        cursor: pointer;
      }
      .theme-btn {
        flex: 1;
        border: 1px solid var(--bg);
        background-size: cover;
        background-position: center;
        display: block;
        position: relative;
        }
      .theme-btn:not(.active) {
        height: 0;
        padding: 0;
        margin: 0;
        border-width: 0;
      }
      .theme-btn.active, :host:hover .theme-btn:not(.active) {
        height: 50px;
        padding: 0;
        margin: 3px;
        border-width: 1px;
      }
    `;

    const themeButtons = this.themes
      .map(
        (theme) => `
      <button id="${theme}" class="active theme-btn" style="background-image: url('${this.path}/${theme}-sm.${this.ext}')"></button>
    `,
      )
      .join("");


    this.shadowRoot.innerHTML = `
      <style>${style}</style>
      ${themeButtons}
    `;
  }

  setupEventListeners() {
    this.themes.forEach((theme) => {
      this.shadowRoot
        .getElementById(theme)
        .addEventListener("click", () => this.switchTheme(theme));
    });

  }

  switchTheme(theme) {
    this.themes.forEach((t) => document.body.classList.remove(t));
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
    sessionStorage.setItem("theme", theme);
  }


  loadSavedTheme() {
    const savedTheme = sessionStorage.getItem("theme") || localStorage.getItem("theme");
    // const savedTheme = ;
    if (savedTheme && this.themes.includes(savedTheme)) {
      this.switchTheme(savedTheme);
    }
  }

}

customElements.define("theme-switcher", ThemeSwitcher);
