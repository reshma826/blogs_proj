const httpStatus = require("http-status");
const blogService = require("../services/blog.service");

const createBlog = async (req, res) => {
  response = await blogService.createBlog(req.body);
  res.status(httpStatus.CREATED).json(response);
};

const getAllBlogs = async (req, res) => {
  const blogList = await blogService.getAllBlogs();
  res.status(httpStatus.OK).json(blogList);
};

const getBlogsById = async (req, res) => {
  const id = req.params.id;
  const blogList = await blogService.getBlogsById(id);
  console.log(blogList);
  res
    .status(!blogList ? httpStatus.OK : httpStatus.NOT_FOUND)
    .json(
      !blogList ? { message: `No blog available with id ${id}` } : blogList
    );
};

const updateBlog = async (req, res) => {
  const id = req.params.id;
  const updateResponse = await blogService.updateBlog(id, req.body);
  res.status(httpStatus.OK).json(updateResponse);
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;
  const response = await blogService.deleteBlog(id);
  res.status(httpStatus.OK).json(response);
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogsById,
  updateBlog,
  deleteBlog,
};
