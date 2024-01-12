const db = require("../model");
const blogDetails = db.blogDetails;
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { create } = require("domain");

const createBlog = async (blog) => {
  try {
    createResponse = {};
    const response = await blogDetails.create(blog);
    createResponse.id = response.dataValues.id;
    createResponse.message = "Blog created successfully";
    return createResponse;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error creating blog");
  }
};

const getAllBlogs = async () => {
  try {
    const blogList = await blogDetails.findAll();
    console.log(blogList);
    return blogList;
  } catch (err) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Error Reteriving  blog"
    );
  }
};

const getBlogsById = async (id) => {
  try {
    const blogList = await isBlogExsist(id);
    return blogList;
  } catch (err) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Error Reteriving  blog"
    );
  }
};

const isBlogExsist = async (id) => {
  const blogList = await blogDetails.findByPk(id);
  return blogList === null ? false : blogList;
};

const updateBlog = async (id, payload) => {
  let updateResponse = {};
  const blogExsist = await isBlogExsist(id);
  if (!blogExsist) {
    updateResponse.httpStatus = httpStatus.NOT_FOUND;
    updateResponse.message = "Blog not available to update";
  } else {
    try {
      Object.assign(blogExsist, payload);
      await blogExsist.save();
      updateResponse.httpStatus = httpStatus.OK;
      updateResponse.message = "Blog updated successfully";
    } catch (err) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error Updating  blog"
      );
    }
  }
  return updateResponse;
};

const deleteBlog = async (blogId) => {
  let deleteResponse = {};
  const blogExsist = await isBlogExsist(blogId);
  if (!blogExsist) {
    deleteResponse.httpStatus = httpStatus.NOT_FOUND;
    deleteResponse.message = "Blog not available to delete";
  } else {
    try {
      await blogDetails.destroy({ where: { id: blogId } });
      console.log(blogDetails);
      deleteResponse.httpStatus = httpStatus.OK;
      deleteResponse.message = "Blog deleted successfully";
    } catch (err) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Error Deleting  blog"
      );
    }
  }
  return deleteResponse;
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogsById,
  updateBlog,
  isBlogExsist,
  deleteBlog,
};
