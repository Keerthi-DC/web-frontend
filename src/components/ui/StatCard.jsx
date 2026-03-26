import React from "react";
import PropTypes from "prop-types";

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h4 className="text-sm text-gray-600">{title}</h4>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number
};

export default StatCard;
