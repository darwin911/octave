# **Octave**

## Link to deployed project

## Project Description
A fullstack app using React, Node, and Express where users can see and select events after registering and logging in. Users can view all events happening in their area (NYC). Users can select events to attend.

## Feature List
- App registration
- App login
- User can see list of events and relevant data
- User can track events

## API Endpoint Documentations
//Get all users
`userRouter.get '/'`

//Get a specific user
`userRouter.get '/:id'`

// Register route
`userRouter.post '/'`

//Login route
`userRouter.post '/login'`

// Add to LIKES table
`userRouter.put '/:user_id/artists/:artist_id'`

// Get all artists which user liked
`userRouter.get '/:user_id/artists'`

// Delete from LIKES table
`userRouter.delete '/:user_id/artists/:artist_id'`

// Add to ATTENDS table
`userRouter.put '/:user_id/events/:event_id'`

// Get all events user is attending
`userRouter.get '/:user_id/events'`

// Delete from ATTENDS table
`userRouter.delete '/:user_id/events/:event_id'`

// Get all events
`eventRouter.get '/'`

// Get a specific event
`eventRouter.get '/:event_name'`

// Add an event with a venue
`eventRouter.post '/:venue_id'`

// Delete an event
`eventRouter.delete '/:id'`

// Add to PERFORMS table
`eventRouter.put '/:event_id/artists/:artist_id'`

// Get all artists that will perform at the event
`eventRouter.get '/:event_id/artists'`

// Get all venues
`venueRouter.get '/'`

// Get a specific venue
`venueRouter.get '/:venue_name'`

// Add a venue
`venueRouter.post '/'`

// Delete a venue
`venueRouter.delete '/:id'`

// Get all venue reviews
`venueReviewRouter.get '/'`

// Get all venue reviews of a venue
`venueReviewRouter.get '/:venue_id'`

// Add a venue review. first id is venue id, second id is user id
`venueReviewRouter.post '/:id/users/:user_id'`

// Delete a venue review
`venueReviewRouter.delete '/:id'`

// Edit a venue review
`venueReviewRouter.put '/:id'`

// Get all artists
`artistRouter.get '/'`

// Get a specific artist
`artistRouter.get '/:artist_name'`

// Add an artist
`artistRouter.post '/'`

// Delete an artist
`artistRouter.delete '/:id'`

// Get all artist reviews
`artistReviewRouter.get '/'`

// Get all artist reviews for an artist
`artistReviewRouter.get '/:artist_id'`

// Add an artist review. first id is the artist id, second id is the user id
`artistReviewRouter.post '/:id/users/:user_id'`

// Delete an artist review
`artistReviewRouter.delete '/:id'`

// Edit an artist review
`artistReviewRouter.put '/:id'`

## List Dependencies
- Axios
- Express
- Morgan
- Pg
- Nodemon
- Sequelize
- Body-Parser
- Cors
- React-router-dom
- Bcrypt
- Jsonwebtoken
- Moment.js

## Wireframes
![Wireframe Main View](https://files.slack.com/files-pri/T0351JZQ0-FH9RKL86R/img_20190325_163755.jpg)


## Component Hierarchy

![Components](https://files.slack.com/files-pri/T0351JZQ0-FH0Q35TL1/img_20190325_163758.jpg)

## Code Snippet
