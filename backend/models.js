const { Sequelize } = require('sequelize');

let sequelize;
if (process.env.DATABASE_URL) {
  console.log('called');
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgresql',
    loggin: true,
    operatorsAliases: false,
    define: {
      underscored: true
    }
  });
} else {
  sequelize = new Sequelize({
    database: `octave_db`,
    dialect: `postgresql`,
    operatorsAliases: false,
    define: {
      underscored: true
    }
  });
};

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
  }
});

const Event = sequelize.define('events', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Venue = sequelize.define('venues', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const VenueReview = sequelize.define('venue_reviews', {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

const EventReview = sequelize.define('event_reviews', {
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

// Relationships between User, EventReview, and Event

User.hasMany(EventReview, {
  onDelete: 'cascade'
});

EventReview.belongsTo(User, {
  foreignKey: {
    allowNull: false
  }
});

Event.hasMany(EventReview, {
  onDelete: 'cascade'
});

EventReview.belongsTo(Event, {
  foreignKey: {
    allowNull: false
  }
});

// Relationships between User, VenueReview, and Venue

User.hasMany(VenueReview, {
  onDelete: 'cascade'
});

VenueReview.belongsTo(User, {
  foreignKey: {
    allowNull: false
  }
});

Venue.hasMany(VenueReview, {
  onDelete: 'cascade'
});

VenueReview.belongsTo(Venue, {
  foreignKey: {
    allowNull: false
  }
});

// JOIN TABLE between users and artists

User.belongsToMany(Artist, {
  through: 'likes'
});

Artist.belongsToMany(User, {
  through: 'likes'
});

// JOIN TABLE between users and events

User.belongsToMany(Event, {
  through: 'attends'
});

Event.belongsToMany(User, {
  through: 'attends'
});

// JOIN TABLE between events and artists

Artist.belongsToMany(Event, {
  through: 'performs'
});

Event.belongsToMany(Artist, {
  through: 'performs'
});

// Relationship between events and venues

Venue.hasMany(Event, {
  onDelete: 'cascade'
});

Event.belongsTo(Venue, {
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
  VenueReview,
  EventReview
};
