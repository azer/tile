const fs = require('fs');
const path = require('path');

function readMarkdownFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function extractModuleInfo(content) {
  const lines = content.split('\n');
  let moduleName = lines[0].replace('# ', '').replace(' Module', '');
  let moduleDescription = '';
  let moduleExample = '';
  let inExample = false;

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim().startsWith('```') && !inExample) {
      inExample = true;
      moduleExample = lines[i];
    } else if (lines[i].trim().startsWith('```') && inExample) {
      inExample = false;
      moduleExample += '\n' + lines[i];
      break;
    } else if (inExample) {
      moduleExample += '\n' + lines[i];
    } else if (lines[i].trim() !== '' && !moduleDescription) {
      moduleDescription = lines[i];
    }
  }

  return { moduleName, moduleDescription, moduleExample };
}

function extractMethods(content) {
  const methodRegex = /^###\s(.+)/gm;
  const methods = [];
  let match;
  while ((match = methodRegex.exec(content)) !== null) {
    methods.push(match[1]);
  }
  return methods;
}

function generateMethodLinks(methods, fileName) {
  return methods.map(method => {
    const methodId = method.toLowerCase().replace(/[^\w]+/g, '-');
    return `* [${method}](./docs/${fileName}#${methodId})`;
  }).join('\n');
}

function generateModuleSection(filePath) {
  const fileName = path.basename(filePath);
  const content = readMarkdownFile(filePath);
  const { moduleName, moduleDescription, moduleExample } = extractModuleInfo(content);
  const methods = extractMethods(content);
  const methodLinks = generateMethodLinks(methods, fileName);

  let section = `## [${moduleName}](./docs/${fileName})

${moduleDescription}

`;

  if (moduleExample) {
    section += `${moduleExample}

`;
  }

  section += `Methods:

${methodLinks}

`;

  return section;
}

function generateFullDocumentation(docsDir) {
  const files = fs.readdirSync(docsDir).filter(file => file.endsWith('.md'));
  let fullDoc = '# Tile Documentation\n\n';

  files.forEach(file => {
    const filePath = path.join(docsDir, file);
    fullDoc += generateModuleSection(filePath);
  });

  return fullDoc;
}

function main() {
  const docsDir = process.argv[2];
  if (!docsDir) {
    console.error('Please provide the docs directory path.');
    process.exit(1);
  }

  const fullDocumentation = generateFullDocumentation(docsDir);
  console.log(fullDocumentation);
}

main();