import tds from "https://cdn.skypack.dev/turndown@7.1.1"
import {DOMParser} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts"
import {parse} from "https://deno.land/std/flags/mod.ts"

const args = parse(Deno.args, {
  alias: {
    s: "selector",
    r: "remove",
    o: "output"
  }
})

const parser = new DOMParser()
const service = new tds({})

const res = await fetch(args._[0])
const data = await res.text()
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
if (args.remove) {
  doc.querySelectorAll(args.remove).forEach(e => {
    e.parentNode.removeChild(e)
  })
}

const md = service.turndown(doc).trim()

if (args.output) {
  Deno.writeTextFileSync(args.output, md)
} else {
  console.log(md)
}
