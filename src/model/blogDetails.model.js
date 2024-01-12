module.exports = (sequelize, Sequelize) => {
  const blogDetails = sequelize.define("blog_details", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    blogType: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    blogName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    blogContent: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  return blogDetails;
};
