const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const blogController = require("../controllers/blog.controller");
const blogValidation = require("../validation/blog.validation");

router
  .post(
    "/posts",
    validate(blogValidation.createBlog),
    blogController.createBlog
  )
  .get("/posts", blogController.getAllBlogs)
  .get("/posts/:id", blogController.getBlogsById)
  .put("/posts/:id", blogController.updateBlog)
  .delete("/posts/:id", blogController.deleteBlog);
module.exports = router;
