'use client';

import { useState } from 'react';
import css from './NoteForm.module.css';
import Modal from '@/components/Modal/Modal';
import { createNote } from '@/lib/api';
import { NoteTag } from '@/types/note';

export default function NoteForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState<NoteTag>('Todo');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNote({ title, content, tag });
    setIsOpen(false);
    setTitle('');
    setContent('');
    setTag('Todo');
  };

  return (
    <>
      <button className={css.createBtn} onClick={() => setIsOpen(true)}>
        Створити нотатку
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form className={css.form} onSubmit={handleSubmit}>
          <h2 className={css.title}>Створити нотатку</h2>

          <label className={css.label}>
            Назва
            <input
              className={css.input}
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </label>

          <label className={css.label}>
            Зміст
            <textarea
              className={css.textarea}
              value={content}
              onChange={e => setContent(e.target.value)}
              required
            />
          </label>

          <label className={css.label}>
            Тег
            <select
              className={css.select}
              value={tag}
              onChange={e => setTag(e.target.value as NoteTag)}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </select>
          </label>

          <div className={css.buttons}>
            <button type="submit" className={css.save}>
              Зберегти
            </button>
            <button
              type="button"
              className={css.cancel}
              onClick={() => setIsOpen(false)}
            >
              Скасувати
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
