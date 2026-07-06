import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const zipPath = 'shared/walmartProjectReference/Walmart.com.zip';
const outDir = '_builder-export';

fs.mkdirSync(outDir, { recursive: true });

// File is base64-encoded — decode it first
const raw = fs.readFileSync(zipPath, 'utf8');
const buf = Buffer.from(raw, 'base64');
console.log('Decoded zip size:', buf.length, 'bytes');

// Verify zip signature
const sig = buf.readUInt32LE(0);
if (sig !== 0x04034b50) {
  console.log('Not a valid zip. Signature:', sig.toString(16));
  process.exit(1);
}
console.log('Valid zip signature found');

// Find end of central directory
let offset = buf.length - 22;
while (offset >= 0 && buf.readUInt32LE(offset) !== 0x06054b50) offset--;
if (offset < 0) { console.log('No end of central dir'); process.exit(1); }

const cdOffset = buf.readUInt32LE(offset + 16);
const cdEntries = buf.readUInt16LE(offset + 10);
console.log('Entries:', cdEntries);

let pos = cdOffset;
let extracted = 0;
for (let i = 0; i < cdEntries; i++) {
  const csig = buf.readUInt32LE(pos);
  if (csig !== 0x02014b50) break;
  const method = buf.readUInt16LE(pos + 10);
  const compSize = buf.readUInt32LE(pos + 20);
  const uncompSize = buf.readUInt32LE(pos + 24);
  const nameLen = buf.readUInt16LE(pos + 28);
  const extraLen = buf.readUInt16LE(pos + 30);
  const commentLen = buf.readUInt16LE(pos + 32);
  const localOffset = buf.readUInt32LE(pos + 42);
  const name = buf.slice(pos + 46, pos + 46 + nameLen).toString('utf8');
  pos += 46 + nameLen + extraLen + commentLen;

  const fullPath = path.join(outDir, name);
  if (name.endsWith('/')) {
    fs.mkdirSync(fullPath, { recursive: true });
    continue;
  }
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });

  const lNameLen = buf.readUInt16LE(localOffset + 26);
  const lExtraLen = buf.readUInt16LE(localOffset + 28);
  const dataStart = localOffset + 30 + lNameLen + lExtraLen;

  if (method === 0) {
    fs.writeFileSync(fullPath, buf.slice(dataStart, dataStart + uncompSize));
    extracted++;
  } else if (method === 8) {
    try {
      const inflated = zlib.inflateRawSync(buf.slice(dataStart, dataStart + compSize));
      fs.writeFileSync(fullPath, inflated);
      extracted++;
    } catch(e) {
      console.log('Failed:', name, e.message);
    }
  }
}

console.log('Extracted:', extracted, 'files');

const files = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else files.push(p);
  }
}
walk(outDir);
console.log('Total files on disk:', files.length);
files.forEach(f => console.log(f));
