import React from "react";
import "./styles.css";

function registerButtonEvent(id, callback) {
  try {
    document.getElementById(id).addEventListener("click", callback);
  } catch (error) {
    throw new Error(error.message);
  }
}

const buttonId = "my-example-button";

export default function App() {
  const [, setCount] = React.useState(0);
  // DOM is not created yet
  console.log("render");
  // this will fail, document is not yet accessible
  registerButtonEvent(buttonId, () => setCount((prevCount) => prevCount + 1));

  React.useLayoutEffect(() => {
    // DOM is created
    // It's safe to register button event now
    console.log("commit");
    registerButtonEvent(buttonId, () => setCount((prevCount) => prevCount + 1));
  }, []);

  React.useEffect(() => {
    // Component is mounted, DOM was created
    // Also safe to register button event
    console.log("after render");
    registerButtonEvent(buttonId, () => setCount((prevCount) => prevCount + 1));
  }, []);

  return (
    <div className="App">
      <h2>Check the logs</h2>
      <button id={buttonId}>Click Me</button>
    </div>
  );
}
