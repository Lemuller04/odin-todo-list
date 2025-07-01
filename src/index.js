import "./styles.css";

import Events from "./classes/events.js";
import Storage from "./classes/storage.js";
import InputHandler from "./classes/inputs.js";
import Display from "./classes/display.js";

const Index = (() => {
  document.addEventListener("DOMContentLoaded", () => {
    Events.publish("page:loaded");
  });
})();

export default Index;
