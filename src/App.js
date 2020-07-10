//In this application, App.js is used to display the Header and all routes.
import React from "react";
import Header from "./Components/Header/Header";
import routes from "./routes";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      {routes}
    </div>
  );
}

export default App;
