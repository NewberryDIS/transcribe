class ProgressBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const status = this.getAttribute("status") || null;
    const numPages = parseFloat(this.getAttribute("num-pages")) || 0;
    let inProgress, transcribed, reviewed;
    switch (status) {
      case "inprogress":
        inProgress = 100;
        transcribed = 0;
        reviewed = 0;
        break;
      case "transcribed":
        inProgress = 0;
        transcribed = 100;
        reviewed = 0;
        break;
      case "reviewed":
        inProgress = 0;
        transcribed = 0;
        reviewed = 100;
        break;
      default:
        inProgress = parseFloat(this.getAttribute("inprogress")) || 0;
        transcribed = parseFloat(this.getAttribute("transcribed")) || 0;
        reviewed = parseFloat(this.getAttribute("reviewed")) || 0;
    }
    const notStarted = 100 - (inProgress + transcribed + reviewed);
    let totalProgress;
    if (this.getAttribute("review")=="?review"){
      totalProgress = transcribed;
    }
    else{
      totalProgress = inProgress + transcribed + reviewed;
    }

    const reviewOrTranscribe = this.getAttribute("review")=="?review"? "Needs Review" : "Transcribed";
    this.shadowRoot.innerHTML = `
                    <style>
                        :host {
                            display: block;
                            width: 100%;
                            --progress-bg: var(--bg-accent-color, #ccc);
                            --progress-fg: var(--fg-accent-color, #333);
                            --reviewed: color-mix(in oklab,   var(--progress-fg) 60%, var(--progress-bg));
                            --transcribed: color-mix(in oklab,  var(--progress-fg) 40%, var(--progress-bg));
                            --inprogress: color-mix(in oklab, var(--progress-fg) 20%, var(--progress-bg));
                            --notstarted: color-mix(in oklab, var(--progress-fg) 5%, var(--progress-bg));
                        }
                        .progress-container {
                        border-bottom: 1px solid var(--progress-fg);
                            position: relative;
                            height: 33px;
                            background-color: var(--notstarted, #ccc);
                            overflow: hidden;
                        }
                        .progress-section {
                            height: 100%;
                            float: left;
                            transition: width 0.3s ease;
                            text-align: center; 
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .reviewed { background-color: var(--reviewed) ; }
                        .transcribed { background-color: var(--transcribed) ; }
                        .inprogress { background-color: var(--inprogress) ; }
                        .notstarted { background-color: var(--notstarted) ; }

                        .progress-label {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            // background-image: linear-gradient(to right,

                            // );
                        }
                        .progress-section, .progress-label {

                          font-family: 'styrene';
                          color: var(--fg-color);
                        }
                    </style>
                    `;
    if (status) {
      this.shadowRoot.innerHTML =
        this.shadowRoot.innerHTML +
        `<div class="progress-container">
          <div
            class="progress-section reviewed"
            style="overflow: hidden; width: ${reviewed}%"
          >
            Reviewed
          </div>
          <div
            class="progress-section transcribed"
            style="overflow: hidden; width: ${transcribed}%"
          >
            Transcribed
          </div>
          <div
            class="progress-section inprogress"
            style="overflow: hidden; width: ${inProgress}%"
          >
            In Progress
          </div>
          <div
            class="progress-section notstarted"
            style="overflow: hidden; width: ${notStarted}%"
          >
            Not Started
          </div>
        </div>`;
    } else {
      this.shadowRoot.innerHTML =
        this.shadowRoot.innerHTML +
        `<div class="progress-container" >
            <div class="progress-section reviewed" style="width: ${reviewed}%"></div>
            <div class="progress-section transcribed" style="width: ${transcribed}%"></div>
            <div class="progress-section inprogress" style="width: ${inProgress}%"></div>
            <div class="progress-section notstarted" style="width: ${notStarted}%"></div>
            <div class="progress-label">${totalProgress}% ${reviewOrTranscribe}</div>
          </div >
        `;
    }
    const container = this.shadowRoot.querySelector(".progress-container");
    const label = this.shadowRoot.querySelector(".progress-label");
    if (!status) {
      container.addEventListener("mousemove", (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const percentage = (x / width) * 100;

        if (percentage <= reviewed) {
          label.textContent = `${reviewed.toFixed(0)}% Reviewed`;
        } else if (percentage <= reviewed + transcribed) {
          let expandedLabel =
            inProgress > 0 ? "Fully Transcribed" : "Transcribed";
          label.textContent = `${transcribed.toFixed(0)}% ${expandedLabel}`;
        } else if (percentage <= reviewed + transcribed + inProgress) {
          label.textContent = `${inProgress.toFixed(0)}% Partly transcribed`;
        } else {
          label.textContent = `${totalProgress}% Transcribed`;
        }
      });

      container.addEventListener("mouseleave", () => {
        label.textContent = `${totalProgress}% ${reviewOrTranscribe}`;
      });
    }
  }
}

customElements.define("progress-bar", ProgressBar);
