import React from "react";
import "../containers/pages/App/App.css";

const Iframe = (props) => {
  if (!props.source) {
    return <div>Loading....</div>;
  }

  // const src = source;
  return <iframe key={props.clue} src={props.source} id="frame"></iframe>;
};

export default Iframe;
