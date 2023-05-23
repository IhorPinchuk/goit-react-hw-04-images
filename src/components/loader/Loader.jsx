import css from './Loader.module.css';
import sprite from './sprite.svg';

export const Loader = () => {
  return (
    <div className={css.loader_wrapper} role="alert">
      <svg className={css.loader_image} width={300} height={300}>
        <use href={sprite + "#icon-loader"}></use>
      </svg>
      <p className={css.loader_text}>Loading...</p>
    </div>
  );
};
