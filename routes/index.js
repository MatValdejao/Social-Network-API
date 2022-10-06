const router = require("express").Router();

// apiRoutes
const apiRoutes = require("./api");

// user /api for apiRoutes
router.use("/api", apiRoutes);

// export router
module.exports = router;
