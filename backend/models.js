const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: `octave_db`,
  dialect: 'postgres',
  operatorsAliases: false,
  define: {
    underscored: true
  }
});

const User = sequelize.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password_digest: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Artist = sequelize.define('artists', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

const Event = sequelize.define('events', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

const Venue = sequelize.define('venues', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

const Review = sequelize.define('reviews', {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});

User.hasMany(Review, {
  onDelete: 'cascade',
});

Review.belongsTo(User, {
  foreignKey: {
    allowNull: false
  }
});

module.exports = {
  sequelize,
  User,
  Artist,
  Event,
  Venue,
  Review
};
