const asyncWrapper = require('../../middleware/asyncWrapper');
const loadConfig = require('../../utils/loadConfig');
const { writeFile } = require('fs/promises');

// @desc      Update config
// @route     PUT /api/config/
// @access    Public
const updateConfig = asyncWrapper(async (req, res, next) => {
  const existingConfig = await loadConfig();

  const newConfig = {
    ...existingConfig,
    ...req.body,
  };

  await writeFile('data/config.json', JSON.stringify(newConfig));

  res.status(200).send({
    success: true,
    data: newConfig,
  });
});

module.exports = updateConfig;
