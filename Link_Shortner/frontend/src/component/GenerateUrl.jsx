import React, { useState } from "react";
import axios from "axios";

function GenerateUrl() {
  const [url, seturl] = useState("");

  function generateurl() {
    axios
      .post("http://localhost:3000/api/shorternurl", { url: url })
      .then((response) => {
        if (response.data.msg == "Enter Valid Url") {
          alert("Enter Valid Url");
        }
        if (response.data.msg == "Url shortened") {
          const hash = response.data.hashedurl;
          const hashedurl = "localhost:3000/" + hash;
          document.getElementById("linkarea").innerText = hashedurl;
        }
      });
  }

  return (
    <>
      <div>
        <input
          type="text"
          value={url}
          placeholder="Enter a Url..."
          className="mt-12 outline-none p-4 rounded-xl"
          onChange={(e) => {
            seturl(e.target.value);
          }}
        />
        <button
          className="text-slate-400 p-4 text-xl hover:text-white outline-none"
          type="button"
          onClick={generateurl}
        >
          shorten url
        </button>
      </div>
      <div>
        <h1
          className="text-slate-400 mt-6 hover:text-white cursor-pointer"
          id="linkarea"
          onClick={() => {
            navigator.clipboard.writeText(
              document.getElementById("linkarea").innerText
            );
          }}
        ></h1>
      </div>
    </>
  );
}

export default GenerateUrl;
