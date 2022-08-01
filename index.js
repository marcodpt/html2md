import tds from "https://cdn.skypack.dev/turndown@7.1.1"
import {DOMParser} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import {parse} from "https://deno.land/std/flags/mod.ts"

const args = parse(Deno.args, {
  alias: {
    s: "selector",
    i: "ignore",
    o: "output",
    f: "footnote"
  }
})

const parser = new DOMParser()
const service = new tds({})

const res = await fetch(args._[0])
const data = await res.text()
const Notes = []
var doc = parser.parseFromString(data, "text/html")
if (!doc) {
  throw `failed to parse doc`
}
if (args.selector) {
  doc = doc.querySelector(args.selector)
  if (!doc) {
    throw `failed to resolve selector`
  }
}
if (args.footnote) {
  doc.querySelectorAll(args.footnote).forEach(el => {
    const href = el.getAttribute('href')
    const target = doc.querySelector(href)
    const label = el.textContent
    const id = label.replace("[", "").replace("]", "")

    if (target == null || !id) {
      throw `failed to resolve footnote: ${label} [${href}]`
    }

    el.replaceWith(`{{^note${id}}}`)

    var text = target.textContent.trim()

    if (text.indexOf(label) != 0) {
      throw `wrong footnote: ${label} [${href}]`
    }

    text = text.substr(id.length).trim()
    if ([".", ":"].indexOf(text.substr(0, 1)) >= 0) {
      text = text.substr(1).trim()
    }

    Notes.push(`[^note${id}]: ${text}`)
  })
}
if (args.ignore) {
  doc.querySelectorAll(args.ignore).forEach(e => {
    e.parentNode.removeChild(e)
  })
}

const md = service.turndown(doc).trim()
  .replace(/\{\{\^([^\}]+)\}\}/g, (a, b) => `[^${b}]`)
  + (Notes.length ? '\n\n' : '')
  + Notes.join('\n\n')

if (args.output) {
  Deno.writeTextFileSync(args.output, md)
} else {
  console.log(md)
}
