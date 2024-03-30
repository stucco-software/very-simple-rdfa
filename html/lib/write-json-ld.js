

class WriteJSONLD extends HTMLElement {
  constructor() {
    super()
  }

  async connectedCallback() {
    const r = await fetch('/index.json')
    const data = await r.json()

    const parser = new DOMParser()
    const template = `
<code><pre>${JSON.stringify(data, null, 2)}</pre></code>
    `
    let html = parser
      .parseFromString(template, "text/html")
    this.replaceWith(html.body.firstChild)
  }
}

customElements.define("rdfa-write-jsonld", WriteJSONLD)
