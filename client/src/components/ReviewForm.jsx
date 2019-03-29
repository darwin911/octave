import React, { Component } from 'react';
import {
  addVenueReview,
  addVenue,
  addEvent,
  findVenue,
  } from '../services/helper';

class ReviewForm extends Component {

  constructor() {
    super();
    this.state = {
      isReview: false,
      content:'',
      score: 0,
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  async handleSubmit(e) {
    e.preventDefault();
    const review = {
      content: this.state.content,
      score: this.state.score
    }

    const lookVenue = this.props.currentEvent._embedded.venues[0].name;
    const venue = await findVenue(lookVenue);

    if (!venue.venue) {
      const newVenue = await addVenue({title: this.props.currentEvent._embedded.venues[0].name, picture: this.props.currentEvent._embedded.venues[0].images[0].url});
      const newEvent = await addEvent({title: this.props.currentEvent.name, picture: this.props.currentEvent.images[0].url}, newVenue.venue.id);
      const venueReview = await addVenueReview(newVenue.venue.id, this.props.user.id, review);
    } else {
      const venueReview = await addVenueReview(venue.venue.id, this.props.user.id, review);
    }

    this.setState({
      isReview: false,
      content: '',
      score: 0,
    });
  }

  render() {
    return (
      <div>
        {this.state.isReview ? (
          <>
            <form onSubmit={this.handleSubmit}>
              <input
                type='text'
                value={this.state.content}
                id='content'
                name='content'
                onChange={this.handleChange}
              />
              <input
                type='number'
                value={this.state.score}
                id='score'
                name='score'
                onChange={this.handleChange}
              />
              <button>Submit</button>
            </form>
          </>
        ) : (
          <>
            <button onClick={() => this.setState({ isReview: true })}>
              Write a review
            </button>
          </>
        )}
      </div>
    );
  }
}

export default ReviewForm;