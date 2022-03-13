import * as path from 'path';
import * as module_alias from 'module-alias';

const files = path.resolve(__dirname, '../..');

module_alias.addAliases({
  '@src': path.join(files, 'src'),
  '@test': path.join(files, 'test'),
});
