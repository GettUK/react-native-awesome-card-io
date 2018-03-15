const path = require('path');

module.exports = ({ root }, defaults) => ({
  entry: './index.js',
  resolve: {
    ...defaults.resolve,
    alias: {
      ...defaults.resolve.alias,
      actions: path.join(root, 'src', 'actions'),
      assets: path.join(root, 'src', 'assets'),
      components: path.join(root, 'src', 'components'),
      config: path.join(root, 'src', 'config'),
      containers: path.join(root, 'src', 'containers'),
      locales: path.join(root, 'src', 'locales'),
      models: path.join(root, 'src', 'models'),
      navigators: path.join(root, 'src', 'navigators'),
      reducers: path.join(root, 'src', 'reducers'),
      store: path.join(root, 'src', 'store'),
      utils: path.join(root, 'src', 'utils')
    }
  }
});
