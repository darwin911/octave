const {
  User,
  Artist,
  Event,
  Venue,
  ArtistReview,
  VenueReview
} = require('./models');

const main = async () => {
  try{
    await User.destroy({where:{}});
    await Artist.destroy({where:{}});
    await Event.destroy({where:{}});
    await Venue.destroy({where:{}});
    await ArtistReview.destroy({where:{}});
    await VenueReview.destroy({where:{}});

    const user1 = await User.create({
      email: 'mike@gmail.com',
      name: 'Mike',
      password_digest: 'abc123'
    });
    const user2 = await User.create({
      email: 'coco@gmail.com',
      name: 'Coco',
      password_digest: '123abc'
    });
    const user3 = await User.create({
      email: 'Eric@gmail.com',
      name: 'Eric',
      password_digest: '456abc'
    });
    const user4 = await User.create({
      email: 'Darwin@gmail.com',
      name: 'Darwin',
      password_digest: 'abc456'
    });
    const user5 = await User.create({
      email: 'Akinyemi@gmail.com',
      name: 'Akinyemi',
      password_digest: '246efg'
    });

    const artist1 = await Artist.create({
      name: 'Armin Van Buren',
      picture: 'hello'
    });
    const artist2 = await Artist.create({
      name: 'Maroon 5',
      picture: 'hello'
    });
    const artist3 = await Artist.create({
      name: 'Hardwell',
      picture: 'hello'
    });
    const artist4 = await Artist.create({
      name: 'Alan Walker',
      picture: 'hello'
    });
    const artist5 = await Artist.create({
      name: 'Beyonce',
      picture: 'hello'
    });

    const venue1 = await Venue.create({
      title: 'Barclays Center',
      picture: 'hello'
    });
    const venue2 = await Venue.create({
      title: 'Madison Square Garden',
      picture: 'hello'
    });
    const venue3 = await Venue.create({
      title: 'Radio City Music Hall',
      picture: 'hello'
    });
    const venue4 = await Venue.create({
      title: 'Miami Marine Stadium',
      picture: 'hello'
    });
    const venue5 = await Venue.create({
      title: 'Met Life Stadium',
      picture: 'hello'
    });

    const artistReview1 = await ArtistReview.create({
      content: 'Great performance!',
      score: 9
    });
    const artistReview2 = await ArtistReview.create({
      content:
        'Horrible performance, they need more practice',
      score: 2
    });
    const artistReview3 = await ArtistReview.create({
      content: 'I love these guys!',
      score: 8
    });
    const artistReview4 = await ArtistReview.create({
      content: 'They were so-so this time...',
      score: 6
    });
    const artistReview5 = await ArtistReview.create({
      content: 'I will never forget how horrible they were!!',
      score: 0
    });
    const venueReview1 = await VenueReview.create({
      content: 'Great staff, and clean!',
      score: 9
    });
    const venueReview2 = await VenueReview.create({
      content:
        'Dirty AF, hate this place',
      score: 1
    });
    const venueReview3 = await VenueReview.create({
      content: 'Need to fix speakers and they need more bathrooms!',
      score: 4
    });
    const venueReview4 = await VenueReview.create({
      content: 'Great place for a gathering! My fav place to go!',
      score: 9
    });
    const venueReview5 = await VenueReview.create({
      content: 'Love it! Has great parking and food selection!',
      score: 10
    });
  }
  catch(e){
    console.error(e);
  }
  process.exit();
};

main();
