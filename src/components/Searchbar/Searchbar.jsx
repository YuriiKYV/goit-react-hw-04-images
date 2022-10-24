import React, { Component } from 'react';
import css from '../Searchbar/Searchbar.module.css';
import { nanoid } from 'nanoid';
import { PropTypes } from 'prop-types';

export default class Searchbar extends Component {
  state = {
    search: '',
  };

  searchField = {
    lable: 'Searcg',
    name: 'search',
    required: true,
  };

  searchId = nanoid;

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
  }
  render() {
    const { search } = this.state;
    const { handleSubmit, handleChange, nanoid, searchField } = this;

    return (
      <header className={css.Searchbar}>
        <form onSubmit={handleSubmit} className={css.SearchForm}>
          <button
            onClick={handleSubmit}
            className={css.SearchFormButton}
            type="submit"
          >
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            onChange={handleChange}
            value={search}
            id={nanoid}
            className={css.SearchFormInput}
            type="text"
            placeholder="Search images and photos"
            {...searchField}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};