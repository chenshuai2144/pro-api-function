const mockjs = require('mockjs');
const getTags = (_, res) => {
  return res.json({
    data: mockjs.mock({
      'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
    }),
  });
};
module.exports = {
  'GET  /api/tags': getTags,
};
