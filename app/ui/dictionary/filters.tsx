'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { BiChevronDown, BiSearch } from 'react-icons/bi';

export default function Filters() {
  const [formData, setFormData] = useState({
    word: '',
    category: '',
    isIrregular: '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData(prevFormData => {
      const { name, value } = e.target;
      if (name === 'category' && value === 'verb') {
        return { ...prevFormData, [name]: value, isIrregular: 'regular' };
      }
      return { ...prevFormData, [name]: value };
    });
  }

  console.log(formData);

  return (
    <div
      className={clsx('md:mb-7 md:flex md:items-center md:gap-2', {
        'mb-10': formData.category !== 'verb',
        'mb-[14px]': formData.category === 'verb',
      })}
    >
      <div className="relative max-md:mb-2 md:w-[274px]">
        <input
          className="block text-base font-medium placeholder:text-mainFont placeholder:font-medium px-6 py-3 outline-none border rounded-[15px] w-full border-gray-main focus:border-green-dark"
          type="text"
          name="word"
          placeholder="Find the word"
          value={formData.word}
          onChange={handleChange}
        />
        <BiSearch className="absolute top-4 right-6 w-5 h-5" />
      </div>
      <div className="relative max-md:mb-2 md:w-[164px]">
        <select
          className="block text-base font-medium px-6 py-3 border rounded-[15px] w-full outline-none border-gray-main appearance-none focus:border-green-dark"
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Categories</option>
          <option value="verb">Verb</option>
          <option value="participle">Participle</option>
          <option value="noun">Noun</option>
          <option value="adjective">Adjective</option>
        </select>
        <BiChevronDown className="absolute top-3 right-6 w-6 h-6" />
      </div>
      {formData.category === 'verb' && (
        <div className="flex gap-4">
          <div className="flex gap-2">
            <input
              className="accent-pink-500"
              type="radio"
              value="regular"
              id="regular"
              name="isIrregular"
              checked={formData.isIrregular === 'regular'}
              onChange={handleChange}
            />
            <label htmlFor="regular">Regular</label>
          </div>
          <div className="flex gap-2">
            <input
              type="radio"
              value="irregular"
              id="irregular"
              name="isIrregular"
              checked={formData.isIrregular === 'irregular'}
              onChange={handleChange}
            />
            <label htmlFor="irregular">Irregular</label>
          </div>
        </div>
      )}
    </div>
  );
}
