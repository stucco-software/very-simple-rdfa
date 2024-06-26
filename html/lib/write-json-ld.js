
const frame = {}

class WriteJSONLD extends HTMLElement {
  constructor() {
    super()
  }

  async connectedCallback() {
    const r = await fetch('/index.json')
    const data = await r.json()

    const parser = new DOMParser()
    const template = `
      <details>
        <summary>Show Code</summary>
<code><pre>${JSON.stringify(data, null, 2)}</pre></code>
      </details>
    `
    let html = parser
      .parseFromString(template, "text/html")
    this.replaceWith(html.body.firstChild)
  }
}

customElements.define("rdfa-write-jsonld", WriteJSONLD)
