import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

const baseDir = './docs';

const ymlFiles: string[] = [];
fs.readdirSync(baseDir).forEach((fileName) => {
    if (fileName.endsWith('yml') || fileName.endsWith('yaml')) {
        const filePath = path.resolve(baseDir, fileName);
        ymlFiles.push(filePath);
    }
});

const mergedYamlContents = ymlFiles.map((filePath) => fs.readFileSync(filePath, 'utf8'));
const mergedYamlString = mergedYamlContents.join('\n');

export const swaggerDocument = YAML.parse(mergedYamlString);
