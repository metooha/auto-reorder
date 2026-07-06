const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'client', 'components');

const animations = {
  '01 Chat_70px_NeutralEasterEgg2.json': require('../attachments/01 Chat_70px_NeutralEasterEgg2.json'),
  '02 Chat_70px_EasterEgg2.json': require('../attachments/02 Chat_70px_EasterEgg2.json'),
  '03 Chat_70px_EasterEgg2Neutral.json': require('../attachments/03 Chat_70px_EasterEgg2Neutral.json'),
  '04 Chat_70px_EasterEgg2_FullSequence.json': require('../attachments/04 Chat_70px_EasterEgg2_FullSequence.json'),
  '05 Chat_70px_ThinkingEasterEgg2.json': require('../attachments/05 Chat_70px_ThinkingEasterEgg2.json'),
  '06 Search_28px_ThinkingEaster Egg 2.json': require('../attachments/06 Search_28px_ThinkingEaster Egg 2.json'),
  '06 Search_28px_ThinkingEmpathetic.json': require('../attachments/06 Search_28px_ThinkingEmpathetic.json'),
  '07 Search_28px_EasterEgg2.json': require('../attachments/07 Search_28px_EasterEgg2.json'),
  '07 Search_28px_Empathetic.json': require('../attachments/07 Search_28px_Empathetic.json'),
};

Object.entries(animations).forEach(([filename, content]) => {
  const filePath = path.join(targetDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  console.log(`Written: ${filename}`);
});

console.log('All animation files have been written successfully!');
