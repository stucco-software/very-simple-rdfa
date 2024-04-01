

class FrameJSONLD extends HTMLElement {
  constructor() {
    super()
  }

  async connectedCallback() {
    const r = await fetch('/index.json')
    const data = await r.json()

    const parser = new DOMParser()
    const template = `
      <mark>neat</mark>
    `
    let html = parser
      .parseFromString(template, "text/html")
    this.replaceWith(html.body.firstChild)
  }
}

customElements.define("rdfa-frame", FrameJSONLD)
