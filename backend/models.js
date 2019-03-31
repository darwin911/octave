const { Sequelize } = require('sequelize');

let sequelize;
if (process.env.DATABASE_URL) {
  console.log('called');
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgresql',
    loggin: true,
    operatorsAliases: false,
    define: {
      underscored: true,
    },
  });
} else {
  sequelize = new Sequelize({
    database: 'octave_db',
    dialect: 'postgresql',
    operatorsAliases: false,
    define: {
      underscored: true,
    },
  });
};

const User = sequelize.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password_digest: {
    type: Sequelize.STRING,
  },
  picture: {
    type: Sequelize.STRING,
    defaultValue: "https://pngimage.net/wp-content/uploads/2018/05/default-profile-pic-png-8.png"
  }
});

const Artist = sequelize.define('artists', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  picture: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

const Event = sequelize.define('events', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  picture: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

const Venue = sequelize.define('venues', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  picture: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

const VenueReview = sequelize.define('venue_reviews', {
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

const ArtistReview = sequelize.define('artist_reviews', {
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Relationships between User, ArtistReview, and Artist

User.hasMany(ArtistReview, {
  onDelete: 'cascade',
});

ArtistReview.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});

Artist.hasMany(ArtistReview, {
  onDelete: 'cascade',
});

ArtistReview.belongsTo(Artist, {
  foreignKey: {
    allowNull: false,
  },
});

// Relationships between User, VenueReview, and Venue

User.hasMany(VenueReview, {
  onDelete: 'cascade',
});

VenueReview.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});

Venue.hasMany(VenueReview, {
  onDelete: 'cascade',
});

VenueReview.belongsTo(Venue, {
  foreignKey: {
    allowNull: false,
  },
});

// JOIN TABLE between users and artists

User.belongsToMany(Artist, {
  through: 'likes',
});

Artist.belongsToMany(User, {
  through: 'likes',
});

// JOIN TABLE between users and events

User.belongsToMany(Event, {
  through: 'attends',
});

Event.belongsToMany(User, {
  through: 'attends',
});

// JOIN TABLE between events and artists

Artist.belongsToMany(Event, {
  through: 'performs',
});

Event.belongsToMany(Artist, {
  through: 'performs',
});

// Relationship between events and venues

Venue.hasMany(Event, {
  onDelete: 'cascade',
});

Event.belongsTo(Venue, {
  foreignKey: {
    allowNull: false,
  },
});

module.exports = {
  sequelize,
  User,
  Artist,
  Event,
  Venue,
  VenueReview,
  ArtistReview,
};
