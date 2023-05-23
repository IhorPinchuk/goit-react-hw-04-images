import { useState } from 'react';
import propTypes from 'prop-types';
import { toast } from 'react-toastify';

import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleNameChange = e => {
    setImageName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (imageName.trim() === '') {
      return toast.info('Enter the name of the picture or photo');
    }

    onSubmit(imageName);
    setImageName('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.search_form} onSubmit={handleSubmit}>
        <button type="submit" className={css.search_form_button}>
          <span className={css.search_form_button_label}>Search</span>
        </button>

        <input
          className={css.search_form_input}
          type="text"
          name="imageName"
          value={imageName}
          onChange={handleNameChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: propTypes.func,
};
