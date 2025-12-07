'use client';

import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={css.wrapper}>
      <p className={css.text}>Something went wrong:</p>
      <p className={css.message}>{message}</p>
    </div>
  );
}
