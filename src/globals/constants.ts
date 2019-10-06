
import * as path from 'path';

const srcDir: string = path.dirname(require.main.filename) + '/';
const savesPath: string = srcDir + '../saves';

export default {
  srcDir,
  savesPath,
};
