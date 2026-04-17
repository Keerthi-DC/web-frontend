import React from 'react';
import { Link } from 'react-router-dom';

const ReadMoreButton = ({ to, text = 'Read More' }) => (
  <Link to={to} className="inline-block text-sm text-yellow-300 hover:underline mt-2">{text}</Link>
);

export default ReadMoreButton;
