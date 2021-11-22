const asyncWrapper = require('../../middleware/asyncWrapper');
const App = require('../../models/App');
const { Sequelize } = require('sequelize');
const loadConfig = require('../../utils/loadConfig');

const { useKubernetes, useDocker } = require('./docker');

// @desc      Get all apps
// @route     GET /api/apps
// @access    Public
const getAllApps = asyncWrapper(async (req, res, next) => {
  const {
    useOrdering: orderType,
    dockerApps: useDockerAPI,
    kubernetesApps: useKubernetesAPI,
  } = await loadConfig();

  let apps;

  if (useDockerAPI) {
    await useDocker(apps);
  }

  if (useKubernetesAPI) {
    await useKubernetes(apps);
  }

  // apps visibility
  const where = req.isAuthenticated ? {} : { isPublic: true };

  const order =
    orderType == 'name'
      ? [[Sequelize.fn('lower', Sequelize.col('name')), 'ASC']]
      : [[orderType, 'ASC']];

  apps = await App.findAll({
    order,
    where,
  });

  if (process.env.NODE_ENV === 'production') {
    // Set header to fetch containers info every time
    return res.status(200).setHeader('Cache-Control', 'no-store').json({
      success: true,
      data: apps,
    });
  }

  res.status(200).json({
    success: true,
    data: apps,
  });
});

module.exports = getAllApps;
