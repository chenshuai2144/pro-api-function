/** @format */

// [START functions import]
const express = require('express');
const issueData = require('./issue.json');
const matchMock = require('./mock/matchMock');
const getAvatarList = require('./getAvatarList');

const app = express();

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.use(matchMock);

app.get('/doc/getAvatarList', async (req, res, next) => {
  const { filename, repo, owner } = req.query;
  if (filename && repo && owner) {
    const list = await getAvatarList({
      filename,
      repo,
      owner,
    });
    res.json(list);
  } else {
    res.json({
      error: "'Please pass a name on the query string or in the request body'",
    });
  }
});

const getTag = (name = '') => {
  if (name.includes('bug')) {
    return 'error';
  }
  if (name.includes('question')) {
    return 'success';
  }
  if (name.includes('Progress')) {
    return 'processing';
  }
  return 'default';
};

app.get('/github/issues', async (req, res, next) => {
  const params = req.query;
  const newData = issueData
    .slice(((params.current || 1) - 1) * (params.pageSize || 20), params.pageSize || 20)
    .map((item) => {
      const labels = item.labels
        ? item.labels.map((tag) => ({ name: tag.name, color: getTag(tag.name) })).slice(0, 1)
        : [
            {
              name: 'question',
              color: 'processing',
            },
          ];

      delete item.assignees;
      delete item.assignee;
      delete item.milestone;
      delete item.events_url;
      delete item.repository_url;
      delete item.labels_url;
      delete item.comments_url;
      delete item.node_id;
      delete item.url;
      item.url = item.html_url;
      delete item.html_url;

      return {
        ...item,
        user: 'chenshuai2144',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        labels,
        state: labels.toString().includes('question') ? 'processing' : item.state,
      };
    });
  res.json({
    data: newData,
    page: params.current || 1,
    success: true,
    total: newData.length,
  });
  next();
});

app.listen(process.env.PORT || 80, () => {
  console.log('服务已启动');
});
