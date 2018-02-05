import { defaultsDeepAll } from 'lodash/fp';

const defaultConfig = require('./default.json');

let localConfig = {};

try {
  localConfig = require('./local.json');
} catch (e) {
  // pass
}

export default defaultsDeepAll([localConfig, defaultConfig]);
