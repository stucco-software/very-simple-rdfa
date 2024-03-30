import { parseHTML } from './lib/parseHTML.js'

const main = () => {
  // Scrape all the RDFa microdata out of
  // this pile of ./html files and write
  // it to a JSON-LD file in //dist
  parseHTML('./html', './dist')
}

main()