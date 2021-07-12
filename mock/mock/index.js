const listTableList = require('./listTableList.js');
const pagesaccountsettings = require('./pages-account-settings.js');
const pagesaccountcenter = require('./pages-account-center.js');

const pagesdashboardanalysis = require('./pages-dashboard-analysis.js');
const pagesdashboardmonitor = require('./pages-dashboard-monitor.js');
const pagesdashboardworkplace = require('./pages-dashboard-workplace.js');
const pagesformadvancedform = require('./pages-form-advanced-form.js');
const pagesformbasicform = require('./pages-form-basic-form.js');
const pagesformstepform = require('./pages-form-step-form.js');
const pageslistbasiclist = require('./pages-list-basic-list.js');
const pageslistcardlist = require('./pages-list-card-list.js');
const pageslistsearchapplications = require('./pages-list-search-applications.js');
const pageslistsearcharticles = require('./pages-list-search-articles.js');
const pageslistsearchprojects = require('./pages-list-search-projects.js');
const pageslisttablelist = require('./pages-list-table-list.js');
const pagesprofileadvanced = require('./pages-profile-advanced.js');
const pagesprofilebasic = require('./pages-profile-basic.js');
const pagesuserregister = require('./pages-user-register.js');
const route = require('./route.js');
const user = require('./user.js');
const notices = require('./notices.js');

module.exports = {
  ...notices,
  ...listTableList,
  ...pagesaccountsettings,
  ...pagesdashboardanalysis,
  ...pagesdashboardmonitor,
  ...pagesdashboardworkplace,
  ...pagesformadvancedform,
  ...pagesformbasicform,
  ...pagesformstepform,
  ...pageslistbasiclist,
  ...pageslistcardlist,
  ...pageslistsearchapplications,
  ...pageslistsearcharticles,
  ...pageslistsearchprojects,
  ...pageslisttablelist,
  ...pagesprofileadvanced,
  ...pagesprofilebasic,
  ...pagesaccountcenter,
  ...pagesuserregister,
  ...route,
  ...user,
};
