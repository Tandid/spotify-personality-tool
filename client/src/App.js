import React, { Component } from "react";
import NavBar from "./NavBar";
import Profile from "./Profile";
import WebPlayer from "./WebPlayer";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      user: [],
    };
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  async componentDidMount() {
    this.getNowPlaying();
    this.getMe();
  }

  async getNowPlaying() {
    await spotifyApi.getMyCurrentPlaybackState().then((response) => {
      console.log({ nowPlaying: response });
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[1].url,
          id: response.item.id,
        },
      });
    });
  }

  getMe() {
    spotifyApi.getMe().then((response) => {
      console.log({ User: response });
      this.setState({
        user: response,
      });
    });
  }

  render() {
    const { user, loggedIn } = this.state;
    if (!loggedIn || !user) {
      return (
        <div>
          <a className="button" href="http://localhost:8888">
            Login to Spotify
          </a>
        </div>
      );
    }

    return (
      <div className="App">
        <NavBar />
        <div className="scroll">
          <h1>Hello, {user.display_name}</h1>
          <Profile />
          <hr />
          <WebPlayer />
        </div>
      </div>
    );
  }
}

export default App;
