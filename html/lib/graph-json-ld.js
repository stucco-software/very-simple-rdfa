import ForceGraph from './forceGraph.js'

const arrayify = (arr) => Array.isArray(arr) ? arr : [arr]

const getLinksOnPredicate = (nodes, predicate) => {
  const links = nodes.reduce((acc, cur) => {
    const friends = arrayify(cur[predicate])
      .filter(n => n)
      .map(target => {
        return {
          source: cur['@id'],
          target: target,
          value: 1
        }
      })
    return [...acc, ...friends]
  }, [])
  return links
}

class GraphJSONLD extends HTMLElement {
  constructor() {
    super()
  }

  async connectedCallback() {
    const r = await fetch('/index.json')
    const data = await r.json()

    const nodes = data['@graph']
    const links = getLinksOnPredicate(nodes, 'ex:fren')

    const parser = new DOMParser()

    let chart = ForceGraph({
      nodes: nodes,
      links: links
    }, {
      nodeId: d => d['@id'],
      nodeGroup: d => d['@type'],
      nodeTitle: d => `${d['ex:title']}`,
      linkStrokeWidth: l => Math.sqrt(l.value),
      width: 900,
      height: 600
    })
    this.replaceWith(chart)

  }
}

customElements.define("rdfa-graph-jsonld", GraphJSONLD)
