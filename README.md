# html2md
A deno script to convert a section of a HTML page to markdown

## Usage with binary for linux 64 bits
```
./html2md [url]
```

## Usage with deno
```
deno run --allow-write --allow-net index.js [url]
```

## Compile with deno
```
deno compile --allow-write --allow-net index.js
```

## Be available in your linux terminal commands
```
sudo cp html2md /usr/bin/
```

## Command Line options
### -o --output
Especify file output.

If nothing is passed it uses stdout.

### -s --selector
DOM query selector of the section of the page to convert to markdown.

If nothing is passed the hole page will be converted.

### -i --ignore
DOM query selector of elements to be removed before convert.
All matches will be removed.

### -f --footnote
DOM query selector of footnotes in text.
It will follow the link to get the text.
