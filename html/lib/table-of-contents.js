const listNodeLink = (node) => `<li><a href=${node['@id']}>${node['ex:title']}</a></li>`

class TableOfContents extends HTMLElement {
  constructor() {
    super()
  }

  async connectedCallback() {
    const r = await fetch('/index.json')
    const data = await r.json()
    const nodes = data['@graph']

    const parser = new DOMParser()
    const template = `
      <ol>
        ${nodes.filter(n => n['ex:title']).map(listNodeLink).join('')}
      </ol>
    `
    let html = parser
      .parseFromString(template, "text/html")
    this.replaceWith(html.body.firstChild)
  }
}

customElements.define("rdfa-toc", TableOfContents)
