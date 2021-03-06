import React from "react";

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: "",
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <img
            className="logo"
            src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
            alt="logo"
          />
          <h2>Spotify Personality Test</h2>
        </nav>
        <hr />
      </div>
    );
  }
}

export default Navbar;
