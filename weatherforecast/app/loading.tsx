import React from "react";

function loading() {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-black">
      <span className="loading loading-spinner loading-lg text-blue-600"></span>
    </div>
  );
}

export default loading;
