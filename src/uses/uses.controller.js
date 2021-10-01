const path = require("path");
const urls = require(path.resolve("src/data/urls-data"));
const uses = require(path.resolve("src/data/uses-data"));

//middle
const useExists = (req, res, next) => {
  const useId = Number(req.params.useId);
  const foundUse = uses.find((use) => use.id === useId);

  if (foundUse) {
    res.locals.use = foundUse;
    return next();
  } else {
    return next({
      status: 404,
      message: `USE id not found: ${req.params.useId}`,
    });
  }
};

//used for get USES
function list(req, res) {
  const { useId } = req.params;
  let copyUses = [...uses];

  if (useId) {
    copyUrls.filter((u) => {
      return u.id === Number(useId);
    });
  }
  res.json({ data: copyUses });
}

//used for post USES/:useId
const read = (req, res, next) => {
  const { useId } = req.params;

  let foundUse = uses.find((u) => u.id === Number(useId));
  res.json({ data: foundUse });
};

//used for DELETE USES/:useId
function destroy(req, res) {
  const { useId } = req.params;
  const index = uses.findIndex((use) => use.id === Number(useId));
  // `splice()` returns an array of the deleted elements, even if it is one element
  const deletedUses = uses.splice(index, 1);

  res.sendStatus(204);
}

module.exports = {
  list,
  read: [useExists, read],
  destroy: [useExists, destroy],
};
