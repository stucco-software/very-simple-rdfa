const escapeHtml = (unsafe) => {
    return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}


class WriteTriples extends HTMLElement {
  constructor() {
    super()
  }

  async connectedCallback() {
    const r = await fetch('/index.json')
    const data = await r.json()
    const nquads = await jsonld.toRDF(data, {format: 'application/n-quads'});

    const parser = new DOMParser()
    const template = `
      <details>
        <summary>Show Code</summary>
<code><pre>${escapeHtml(nquads)}</pre></code>
      </details>
    `
    let html = parser
      .parseFromString(template, "text/html")
    this.replaceWith(html.body.firstChild)
  }
}

customElements.define("rdfa-triples", WriteTriples)
