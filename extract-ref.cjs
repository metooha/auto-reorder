const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Simple ZIP parser - reads local file headers
const buf = fs.readFileSync('/tmp/basket.zip');
const files = [];
let offset = 0;

while (offset < buf.length - 4) {
  const sig = buf.readUInt32LE(offset);
  if (sig !== 0x04034b50) break; // Not a local file header
  
  const compMethod = buf.readUInt16LE(offset + 8);
  const compSize = buf.readUInt32LE(offset + 18);
  const uncompSize = buf.readUInt32LE(offset + 22);
  const nameLen = buf.readUInt16LE(offset + 26);
  const extraLen = buf.readUInt16LE(offset + 28);
  const name = buf.toString('utf8', offset + 30, offset + 30 + nameLen);
  const dataStart = offset + 30 + nameLen + extraLen;
  const data = buf.slice(dataStart, dataStart + compSize);
  
  if (/\.(jsx?|css|html)$/.test(name) && !name.includes('node_modules') && !name.includes('package-lock')) {
    let content;
    if (compMethod === 0) {
      content = data.toString('utf8');
    } else if (compMethod === 8) {
      try {
        content = zlib.inflateRawSync(data).toString('utf8');
      } catch(e) {
        content = '[decompress error]';
      }
    }
    if (content && content.length < 50000) {
      files.push({ name, content });
    }
  }
  
  offset = dataStart + compSize;
}

const appFile = files.find(f => f.name.endsWith('/app.js'));
if (appFile) {
  const lines = appFile.content.split('\n');
  console.log(lines.slice(300).join('\n'));
}
