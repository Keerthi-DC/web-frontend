import React from 'react';

const GridLayout = ({ children, cols = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" }) => (
  <div className={cols}>{children}</div>
);

export default GridLayout;
