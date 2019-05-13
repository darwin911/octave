import React, { Component } from 'react';
import {
  addVenueReview,
  addVenue,
  // addEvent,
  findVenue,
  } from '../services/helper';

class VenueReviewForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReview: false,
      content:'',
      score: 3,
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
    const review = ({
      content: this.state.content,
      score: this.state.score
    })

    const fetchVenue = this.props.currentEvent._embedded.venues[0].name;
    const venue = await findVenue(fetchVenue);

    if (!venue.venue) {
      const newVenue = await addVenue({
        title: this.props.currentEvent._embedded.venues[0].name,
        picture: this.props.currentEvent._embedded.venues[0].images[0].url
      });
      // eslint-disable-next-line
      const venueReview = await addVenueReview(newVenue.venue.id, this.props.user.id, review);
      
    } else {
      // eslint-disable-next-line
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
      <>
        {this.state.isReview ? (
          <>
            <form onSubmit={this.handleSubmit}>
              <input
                type='text'
                value={this.state.content}
                id='content'
                name='content'
                onChange={this.handleChange} />
              <input
                type='number'
                value={this.state.score}
                id='score'
                name='score'
                min="1"
                max="5"
                onChange={this.handleChange} />
              <button>Submit</button>
            </form>
          </>
        ) : (
          <>
            <button className="review-btn" onClick={() => this.setState({ isReview: true })}>
              Write a review
            </button>
          </>
        )}
      </>
    );
  }
}

export default VenueReviewForm;
