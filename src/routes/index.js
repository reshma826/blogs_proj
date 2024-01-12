const express = require("express");
const router = express.Router();
const blogRoute = require("./blogs.route");

const defaultRoutes = [
  {
    path: "/blog",
    route: blogRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
