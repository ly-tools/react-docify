import 'babel-polyfill';
import Mod from '../lib/index';
import fs from 'fs';
import path from 'path';

describe('react-docify', () => {
  it('should works with default configurations', () => {
    const testDir = path.join(__dirname, 'case1');
    const content = fs.readFileSync(path.join(testDir, 'index.js'), 'utf-8');
    const expect = fs.readFileSync(path.join(testDir, 'index.md'), 'utf-8');
    Mod(content).trim().should.be.eql(expect.trim());
  });
  it('should works with custom template', () => {
    const testDir = path.join(__dirname, 'case2');
    const content = fs.readFileSync(path.join(testDir, 'index.js'), 'utf-8');
    const expect = fs.readFileSync(path.join(testDir, 'index.md'), 'utf-8');
    Mod(content, {
      template: '<% _.forEach(classes, function(cla) { %><%= cla.propTypesTable %><% }); %>'
    }).trim().should.be.eql(expect.trim());
  });
});
