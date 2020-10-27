/** @format */

// [START functions import]
const express = require('express');
const fetch = require('node-fetch');
const ExpressCache = require('express-cache-middleware');
const cacheManager = require('cache-manager');
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

const tagList = ['success', 'processing', 'error', 'default', 'warning'];
const getTag = () => {
  return tagList[(Math.random() * 5).toFixed()];
};

app.get('/github/issues', async (req, res, next) => {
  const params = req.query;

  const data = await fetch('https://api.github.com/repos/ant-design/ant-design-pro/issues', {
    params: {
      ...params,
      access_token: 'c17b1cb63754f4e97a926950a3eb9a7d10660199',
      page: params.current,
      per_page: params.pageSize,
    },
  }).then((msg) => msg.json());

  if (!Array.isArray(data)) {
    res.json({
      data: [
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6689',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6689/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6689/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6689/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6689',
          id: 624748504,
          node_id: 'MDU6SXNzdWU2MjQ3NDg1MDQ=',
          number: 6689,
          title: '🐛[BUG]yarn install命令 antd2.4.5会报错',
          labels: [
            {
              id: 676362617,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MTc=',
              url: 'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%90%9Bbug',
              name: 'bug',
              color: 'ee0701',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 1,
          created_at: '2020-05-26T09:42:56Z',
          updated_at: '2020-05-26T10:03:02Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6688',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6688/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6688/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6688/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6688',
          id: 624691229,
          node_id: 'MDU6SXNzdWU2MjQ2OTEyMjk=',
          number: 6688,
          title: '🐛[BUG]无法创建工程npm create umi',
          labels: [
            {
              id: 676362617,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MTc=',
              url: 'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%90%9Bbug',
              name: 'bug',
              color: 'ee0701',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2020-05-26T08:19:22Z',
          updated_at: '2020-05-26T08:19:22Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6685',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6685/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6685/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6685/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6685',
          id: 624674790,
          node_id: 'MDU6SXNzdWU2MjQ2NzQ3OTA=',
          number: 6685,
          title: '🧐[问题] build 后还存在 es6 的代码（Umi@2.13.13）',
          labels: [
            {
              id: 676362622,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MjI=',
              url:
                'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%A7%90question',
              name: 'question',
              color: 'cc317c',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2020-05-26T07:54:25Z',
          updated_at: '2020-05-26T07:54:25Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6683',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6683/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6683/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6683/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6683',
          id: 624620220,
          node_id: 'MDU6SXNzdWU2MjQ2MjAyMjA=',
          number: 6683,
          title: '2.3.1版本如何在业务页面修改头部状态',
          labels: [
            {
              id: 676362622,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MjI=',
              url:
                'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%A7%90question',
              name: 'question',
              color: 'cc317c',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 2,
          created_at: '2020-05-26T05:58:24Z',
          updated_at: '2020-05-26T07:17:39Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6682',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6682/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6682/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6682/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6682',
          id: 624592471,
          node_id: 'MDU6SXNzdWU2MjQ1OTI0NzE=',
          number: 6682,
          title: 'hideChildrenInMenu设置后，子路由找不到了',
          labels: [
            {
              id: 676362617,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MTc=',
              url: 'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%90%9Bbug',
              name: 'bug',
              color: 'ee0701',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 2,
          created_at: '2020-05-26T04:25:59Z',
          updated_at: '2020-05-26T08:00:51Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6680',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6680/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6680/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6680/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6680',
          id: 624556297,
          node_id: 'MDU6SXNzdWU2MjQ1NTYyOTc=',
          number: 6680,
          title: '🐛[BUG]Umi UI 添加多个空白页，就会出错！把空白页都变成选中状态！',
          labels: [
            {
              id: 676362617,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MTc=',
              url: 'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%90%9Bbug',
              name: 'bug',
              color: 'ee0701',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2020-05-26T02:13:47Z',
          updated_at: '2020-05-26T02:13:47Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6678',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6678/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6678/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6678/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6678',
          id: 624415799,
          node_id: 'MDU6SXNzdWU2MjQ0MTU3OTk=',
          number: 6678,
          title: '🐛[BUG]第一次载入页面，菜单仅图标时，图标没有居中',
          labels: [
            {
              id: 676362617,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MTc=',
              url: 'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%90%9Bbug',
              name: 'bug',
              color: 'ee0701',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 1,
          created_at: '2020-05-25T17:34:21Z',
          updated_at: '2020-05-26T03:05:55Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6675',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6675/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6675/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6675/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/pull/6675',
          id: 624300343,
          node_id: 'MDExOlB1bGxSZXF1ZXN0NDIyNzUxNjIw',
          number: 6675,
          title: 'build(deps-dev): bump eslint from 6.8.0 to 7.1.0',
          labels: [
            {
              id: 1477584108,
              node_id: 'MDU6TGFiZWwxNDc3NTg0MTA4',
              url: 'https://api.github.com/repos/ant-design/ant-design-pro/labels/dependencies',
              name: 'dependencies',
              color: '0366d6',
              default: false,
              description: 'Pull requests that update a dependency file',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2020-05-25T13:27:09Z',
          updated_at: '2020-05-25T13:27:10Z',
          closed_at: null,
          author_association: 'CONTRIBUTOR',
          pull_request: {
            url: 'https://api.github.com/repos/ant-design/ant-design-pro/pulls/6675',
            html_url: 'https://github.com/ant-design/ant-design-pro/pull/6675',
            diff_url: 'https://github.com/ant-design/ant-design-pro/pull/6675.diff',
            patch_url: 'https://github.com/ant-design/ant-design-pro/pull/6675.patch',
          },
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6674',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6674/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6674/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6674/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6674',
          id: 624130987,
          node_id: 'MDU6SXNzdWU2MjQxMzA5ODc=',
          number: 6674,
          title: 'V4版本如何使用第三方的enhanceReduxMiddleware 🧐[问题]',
          labels: [
            {
              id: 676362622,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MjI=',
              url:
                'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%A7%90question',
              name: 'question',
              color: 'cc317c',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          milestone: null,
          comments: 3,
          created_at: '2020-05-25T08:20:31Z',
          updated_at: '2020-05-26T07:37:47Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6663',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6663/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6663/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6663/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6663',
          id: 623677811,
          node_id: 'MDU6SXNzdWU2MjM2Nzc4MTE=',
          number: 6663,
          title:
            '🐛[BUG] 官网预览页面，第一次点击二级菜单，其父级菜单会收起，之后再次点击二级菜单，父菜单正常',
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 1,
          created_at: '2020-05-23T15:00:49Z',
          updated_at: '2020-05-24T23:47:37Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6662',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6662/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6662/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6662/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6662',
          id: 623565176,
          node_id: 'MDU6SXNzdWU2MjM1NjUxNzY=',
          number: 6662,
          title: '🧐[问题] 从自建 block 仓库下载区块报错。',
          labels: [
            {
              id: 676362622,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MjI=',
              url:
                'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%A7%90question',
              name: 'question',
              color: 'cc317c',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2020-05-23T02:46:12Z',
          updated_at: '2020-05-23T03:03:26Z',
          closed_at: null,
          author_association: 'CONTRIBUTOR',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6652',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6652/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6652/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6652/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6652',
          id: 622902420,
          node_id: 'MDU6SXNzdWU2MjI5MDI0MjA=',
          number: 6652,
          title:
            '🧐[问题] fetchCurrent接口报错，退出登录页，第一次点击登录，SecurityLayout不渲染，导致需要点击两次',
          labels: [
            {
              id: 676362622,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MjI=',
              url:
                'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%A7%90question',
              name: 'question',
              color: 'cc317c',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2020-05-22T02:20:27Z',
          updated_at: '2020-05-22T02:21:01Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6644',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6644/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6644/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6644/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6644',
          id: 622348582,
          node_id: 'MDU6SXNzdWU2MjIzNDg1ODI=',
          number: 6644,
          title: '🐛[BUG] V5 左侧栏收缩时，点击图标无效。',
          labels: [
            {
              id: 676362617,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MTc=',
              url: 'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%90%9Bbug',
              name: 'bug',
              color: 'ee0701',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2020-05-21T08:45:13Z',
          updated_at: '2020-05-21T08:45:13Z',
          closed_at: null,
          author_association: 'CONTRIBUTOR',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6643',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6643/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6643/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6643/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6643',
          id: 622326186,
          node_id: 'MDU6SXNzdWU2MjIzMjYxODY=',
          number: 6643,
          title: '🧐[问题]不知道有没有大佬将这个模板迁移至Electron的例子',
          labels: [
            {
              id: 676362622,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MjI=',
              url:
                'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%A7%90question',
              name: 'question',
              color: 'cc317c',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2020-05-21T08:04:36Z',
          updated_at: '2020-05-21T08:04:36Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6642',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6642/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6642/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6642/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6642',
          id: 622290419,
          node_id: 'MDU6SXNzdWU2MjIyOTA0MTk=',
          number: 6642,
          title: 'npm run start 为什么不能打开浏览器',

          labels: [
            {
              id: 676362617,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MTc=',
              url: 'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%90%9Bbug',
              name: 'bug',
              color: 'ee0701',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 3,
          created_at: '2020-05-21T06:51:22Z',
          updated_at: '2020-05-24T23:51:59Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6641',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6641/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6641/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6641/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6641',
          id: 622267649,
          node_id: 'MDU6SXNzdWU2MjIyNjc2NDk=',
          number: 6641,
          title:
            '🧐[问题]在重新npm install后运行npm start报出一些less找不到，但项目可以正常运行起来',
          labels: [
            {
              id: 676362622,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MjI=',
              url:
                'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%A7%90question',
              name: 'question',
              color: 'cc317c',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 3,
          created_at: '2020-05-21T05:56:36Z',
          updated_at: '2020-05-22T01:38:30Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6639',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6639/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6639/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6639/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6639',
          id: 622207575,
          node_id: 'MDU6SXNzdWU2MjIyMDc1NzU=',
          number: 6639,
          title: '🐛[BUG]错误通知：http code 200',
          labels: [
            {
              id: 676362617,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MTc=',
              url: 'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%90%9Bbug',
              name: 'bug',
              color: 'ee0701',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 4,
          created_at: '2020-05-21T02:47:35Z',
          updated_at: '2020-05-24T16:27:00Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6630',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6630/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6630/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6630/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6630',
          id: 621402301,
          node_id: 'MDU6SXNzdWU2MjE0MDIzMDE=',
          number: 6630,
          title: '🐛[BUG]线上预览项目好多布局错乱，不知道是antd的锅还是啥原因',
          labels: [
            {
              id: 824463768,
              node_id: 'MDU6TGFiZWw4MjQ0NjM3Njg=',
              url:
                'https://api.github.com/repos/ant-design/ant-design-pro/labels/%E2%98%BA%EF%B8%8FIn%20Progress',
              name: '☺️In Progress',
              color: '8BC34A',
              default: false,
              description: '',
            },
            {
              id: 676362617,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MTc=',
              url: 'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%90%9Bbug',
              name: 'bug',
              color: 'ee0701',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 8,
          created_at: '2020-05-20T02:02:33Z',
          updated_at: '2020-05-20T08:13:24Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6629',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6629/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6629/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6629/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6629',
          id: 621388407,
          node_id: 'MDU6SXNzdWU2MjEzODg0MDc=',
          number: 6629,
          title: '🐛[BUG] umi 偶尔出现没有导出成员',
          labels: [
            {
              id: 676362617,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MTc=',
              url: 'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%90%9Bbug',
              name: 'bug',
              color: 'ee0701',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 19,
          created_at: '2020-05-20T01:20:55Z',
          updated_at: '2020-05-24T23:53:03Z',
          closed_at: null,
          author_association: 'CONTRIBUTOR',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6624',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6624/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6624/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6624/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6624',
          id: 620820348,
          node_id: 'MDU6SXNzdWU2MjA4MjAzNDg=',
          number: 6624,
          title: '🐛[BUG]请问大佬，为什么无论怎么选择，都无法切换成JS语言，怎么下都是TS,求解答',
          labels: [
            {
              id: 676362617,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MTc=',
              url: 'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%90%9Bbug',
              name: 'bug',
              color: 'ee0701',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 6,
          created_at: '2020-05-19T09:22:47Z',
          updated_at: '2020-05-25T03:50:54Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6619',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6619/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6619/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6619/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6619',
          id: 620673679,
          node_id: 'MDU6SXNzdWU2MjA2NzM2Nzk=',
          number: 6619,
          title: '🐛[BUG] protable内存泄漏问题',
          labels: [
            {
              id: 824463768,
              node_id: 'MDU6TGFiZWw4MjQ0NjM3Njg=',
              url:
                'https://api.github.com/repos/ant-design/ant-design-pro/labels/%E2%98%BA%EF%B8%8FIn%20Progress',
              name: '☺️In Progress',
              color: '8BC34A',
              default: false,
              description: '',
            },
            {
              id: 676362617,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MTc=',
              url: 'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%90%9Bbug',
              name: 'bug',
              color: 'ee0701',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 9,
          created_at: '2020-05-19T04:45:27Z',
          updated_at: '2020-05-20T04:06:22Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6618',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6618/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6618/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6618/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6618',
          id: 620666530,
          node_id: 'MDU6SXNzdWU2MjA2NjY1MzA=',
          number: 6618,
          title:
            'ProTable中选择开始日期和结束日期，判断结束日期大于开始日期，有没有选择完日期后的回调？',
          labels: [
            {
              id: 676362622,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MjI=',
              url:
                'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%A7%90question',
              name: 'question',
              color: 'cc317c',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2020-05-19T04:24:27Z',
          updated_at: '2020-05-19T04:24:27Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6614',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6614/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6614/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6614/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6614',
          id: 620313393,
          node_id: 'MDU6SXNzdWU2MjAzMTMzOTM=',
          number: 6614,
          title: '🧐[问题]有人用过在这个上集成IOC吗?',
          labels: [
            {
              id: 676362622,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MjI=',
              url:
                'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%A7%90question',
              name: 'question',
              color: 'cc317c',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2020-05-18T15:44:53Z',
          updated_at: '2020-05-19T02:33:31Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6605',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6605/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6605/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6605/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6605',
          id: 619865001,
          node_id: 'MDU6SXNzdWU2MTk4NjUwMDE=',
          number: 6605,
          title: 'Ant Design Pro V5 已经支持预览',
          labels: [
            {
              id: 676362622,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MjI=',
              url:
                'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%A7%90question',
              name: 'question',
              color: 'cc317c',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 76,
          created_at: '2020-05-18T02:33:44Z',
          updated_at: '2020-05-26T07:59:59Z',
          closed_at: null,
          author_association: 'COLLABORATOR',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6599',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6599/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6599/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6599/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6599',
          id: 619494862,
          node_id: 'MDU6SXNzdWU2MTk0OTQ4NjI=',
          number: 6599,
          title: 'Add support for RTL ',
          labels: [
            {
              id: 688775576,
              node_id: 'MDU6TGFiZWw2ODg3NzU1NzY=',
              url:
                'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%91%91Feature%20Request',
              name: 'Feature Request',
              color: 'fbca04',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 1,
          created_at: '2020-05-16T15:07:41Z',
          updated_at: '2020-05-17T21:16:31Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6596',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6596/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6596/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6596/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6596',
          id: 619369062,
          node_id: 'MDU6SXNzdWU2MTkzNjkwNjI=',
          number: 6596,
          title: 'Deno 1.0 发布，有没有取代 node 的优势？',
          labels: [
            {
              id: 676362622,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MjI=',
              url:
                'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%A7%90question',
              name: 'question',
              color: 'cc317c',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 2,
          created_at: '2020-05-16T03:42:00Z',
          updated_at: '2020-05-18T02:59:12Z',
          closed_at: null,
          author_association: 'COLLABORATOR',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6589',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6589/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6589/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6589/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6589',
          id: 618781702,
          node_id: 'MDU6SXNzdWU2MTg3ODE3MDI=',
          number: 6589,
          title: 'dva 相关问题',
          labels: [
            {
              id: 676362622,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MjI=',
              url:
                'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%A7%90question',
              name: 'question',
              color: 'cc317c',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 4,
          created_at: '2020-05-15T08:09:03Z',
          updated_at: '2020-05-18T04:18:25Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6588',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6588/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6588/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6588/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6588',
          id: 618752606,
          node_id: 'MDU6SXNzdWU2MTg3NTI2MDY=',
          number: 6588,
          title: '创建项目中途报错🐛[BUG]',
          labels: [
            {
              id: 676362617,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MTc=',
              url: 'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%90%9Bbug',
              name: 'bug',
              color: 'ee0701',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2020-05-15T07:14:19Z',
          updated_at: '2020-05-16T18:03:09Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6576',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6576/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6576/comments',
          events_url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6576/events',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6576',
          id: 617300825,
          node_id: 'MDU6SXNzdWU2MTczMDA4MjU=',
          number: 6576,
          title: 'Umi UI 资产界面没有antd区块🧐[问题]',
          labels: [
            {
              id: 676362622,
              node_id: 'MDU6TGFiZWw2NzYzNjI2MjI=',
              url:
                'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%A7%90question',
              name: 'question',
              color: 'cc317c',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: '2020-05-13T09:38:58Z',
          updated_at: '2020-05-13T09:38:58Z',
          closed_at: null,
          author_association: 'NONE',
        },
        {
          url: 'https://api.github.com/repos/ant-design/ant-design-pro/issues/6575',
          repository_url: 'https://api.github.com/repos/ant-design/ant-design-pro',
          labels_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6575/labels{/name}',
          comments_url:
            'https://api.github.com/repos/ant-design/ant-design-pro/issues/6575/comments',
          html_url: 'https://github.com/ant-design/ant-design-pro/issues/6575',
          id: 617260670,
          node_id: 'MDU6SXNzdWU2MTcyNjA2NzA=',
          number: 6575,
          title: 'qiankun支持👑 [需求]',
          labels: [
            {
              id: 688775576,
              node_id: 'MDU6TGFiZWw2ODg3NzU1NzY=',
              url:
                'https://api.github.com/repos/ant-design/ant-design-pro/labels/%F0%9F%91%91Feature%20Request',
              name: 'Feature Request',
              color: 'fbca04',
              default: false,
              description: '',
            },
          ],
          state: 'open',
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 2,
          created_at: '2020-05-13T08:42:34Z',
          updated_at: '2020-05-16T18:15:20Z',
          closed_at: null,
          author_association: 'NONE',
        },
      ].map((item) => ({
        ...item,
        labels: item.labels.map((tag) => ({ ...tag, color: getTag() })).slice(0, 1),
        state: item.labels.find((tag) => tag.name.includes('Progress')) ? 'processing' : item.state,
      })),
      page: params.current,
      success: true,
      total: 30,
    });
    return {};
  }

  const totalObj = await fetch(
    'https://api.github.com/repos/ant-design/ant-design-pro/issues?per_page=1&access_token=c17b1cb63754f4e97a926950a3eb9a7d10660199',
    {
      params,
    }
  ).then((msg) => msg.json());

  res.json({
    data: (data || []).map((item) => ({
      ...item,
      labels: item.labels.map((tag) => ({ ...tag, color: getTag() })).slice(0, 1),
      state: item.labels.find((tag) => tag.name.includes('Progress')) ? 'processing' : item.state,
    })),
    page: params.current,
    success: true,
    total: (totalObj[0] || { number: 0 }).number - 56,
  });
});

const cacheMiddleware = new ExpressCache(
  cacheManager.caching({
    store: 'memory',
    max: 10000,
    ttl: 3600,
  })
);

cacheMiddleware.attach(app);

app.listen(process.env.PORT || 80, () => {
  console.log('服务已启动');
});
