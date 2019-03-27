import React, { Component } from 'react';
import { createReview } from '../services/helper.js'

export class ReviewForm extends Component {
  
  constructor() {
    super();
    this.state = {
      isReview: false,
      review:''
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
  async handleSubmit() {
    // e.preventDefault()
    const newReview = await createReview(1 ,this.state.review)
    this.setState(prevState => ({
      review: [...prevState.review, newReview]
    }));
  }
  render() {
    return (
      <div>
        {this.state.isReview ? (
          <>
            <form
              onSubmit={e => {
                e.preventDefault();
                 this.handleSubmit();                  
                this.setState({ isReview: false });
              }}
            >
              <input
                type='text'
                value={this.review}
                onChange={this.props.handleChange} 
              />
              {/* <input
                type='interger'
                value={}
                onChange={this.props.handleChange}
              /> */}
              <button>Submit</button>
            </form>
          </>
        ) : (
          <>
            <button onClick={() => this.setState({ isReview: true })}>
              Review
            </button>
          </>
        )}
      </div>
    );
  }
}

export default ReviewForm;
