# html2md
A deno script to convert a section of a HTML page to markdown

## Usage with binary for linux 64 bits
```
./html2md [url]
```

## Usage with deno
```
deno run --allow-read --allow-write --allow-net index.js [url]
```

## Compile with deno
```
deno compile --allow-read --allow-write --allow-net index.js
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

### -r --remove
DOM query selector of elements to remove before convert.
All matches will be removed.
