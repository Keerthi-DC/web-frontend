import React from 'react';

const Card = ({ image, title, description, date, children }) => (
  <div className="bg-white rounded shadow">
    {image && <img src={image} alt={title} className="w-full h-48 object-cover rounded-t" />}
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      {date && <p className="text-xs text-gray-400">{date}</p>}
      {children}
    </div>
  </div>
);

export default Card;
