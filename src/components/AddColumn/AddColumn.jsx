import 'react-datepicker/dist/react-datepicker.css';
import './AddColumn.css';
import { useState } from 'react';

const AddColumnModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');

  if (!isOpen) return null;

  const handleAdd = () => {
    // TODO написати логіку додавання колонки
    console.log({ title });
    onClose();
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <button className='close-button' onClick={onClose}>
          ×
        </button>
        <h2>Add column</h2>
        <input
          type='text'
          className='modal-input'
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button className='add-button' onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddColumnModal;
