import React from "react";
import { FaStar } from "react-icons/fa6";

const Rating: React.FC<{ rate: number | undefined }> = ({ rate = 0 }) => {
  return (
    <div className="flex items-center gap-1 font-semibold text-warning-500">
      <FaStar />
      <p>{rate.toFixed(1)}</p>
    </div>
  );
};

export default Rating;
