import React, { Component } from 'react';
import {
  addArtistReview,
  addArtist,
  findArtist,
  } from '../services/helper';

class ArtistReviewForm extends Component {

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

    const fetchArtist = this.props.currentEvent._embedded.attractions[0].name;
    const artist = await findArtist(fetchArtist);

    if (!artist.artist) {
      const newArtist = await addArtist({name: this.state.currentEvent._embedded.attractions[0].name, picture: this.state.currentEvent._embedded.attractions[0].images[0].url});
      const artistReview = await addArtistReview(newArtist.artist.id, this.props.user.id, review);
    } else {
      const artistReview = await addArtistReview(artist.artist.id, this.props.user.id, review);
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

export default ArtistReviewForm;
