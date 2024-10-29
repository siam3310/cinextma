import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const Rating: React.FC<{ rate: number | undefined }> = ({ rate }) => {
  return (
    <div className="flex items-center gap-1 font-semibold text-warning-500">
      <Icon icon="ph:star-fill" />
      <p>{rate?.toFixed(1)}</p>
    </div>
  );
};

export default Rating;
