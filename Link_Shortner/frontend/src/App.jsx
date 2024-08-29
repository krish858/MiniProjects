import React from "react";
import GenerateUrl from "./component/GenerateUrl";

function App() {
  return (
    <div className="w-full h-full bg-black">
      <div className="h-[80%] w-[100%] flex items-center justify-center">
        <center>
          <h1 className="text-6xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text mt-8">
            Link Shortner
          </h1>
          <h1 className="text-slate-400">
            A Simple,Fast,Reliable Link Shortner
          </h1>
          <GenerateUrl />
        </center>
      </div>
    </div>
  );
}

export default App;
