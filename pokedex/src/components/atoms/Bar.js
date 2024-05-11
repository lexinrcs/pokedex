import React from "react";

const Bar = ({ height }) => {
  return (
    <div className="w-8 md:w-[40px] bg-blue-2 group-hover:bg-blue-1 rounded-md" style={{ height: `${height}px` }}></div>
  );
};

export default Bar;