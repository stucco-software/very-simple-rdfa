import fs from 'fs'
import path from 'path'
import { JSDOM } from 'jsdom'
import { rdfa2json } from './rdfa2json.js'

let origin = process.env.origin
global.DOMParser = new JSDOM().window.DOMParser

const handleError = (err) => {
  throw new Error(err)
}

const parseFiles = (dir) => (files) => {
  const arr = files
    .filter(file => path.extname(file) == ".html")
    .map(file => {
      let html = fs.readFileSync(`${dir}/${file}`, 'utf8')
      let json = rdfa2json(html, `${origin}/${path.basename(file, '.html')}`)
      return json
    })
  return {
    "@context": `${origin}/context.json`,
    "@graph": arr
  }
}

export const parseHTML = async (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      handleError(err)
      return
    }
    let data = parseFiles(dir)(files)
    fs.writeFile(`${dir}/index.json`, JSON.stringify(data, null, 2), err => {
      if (err)
        handleError(err)
    })
  })
}