import React, { Component } from "react";
import Playlists from "./Playlists";
// import Analysis from "./Analysis";
import NavBar from "./NavBar";
import TopArtists from "./TopArtists";
import Profile from "./Profile";

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
      nowPlaying: { name: "Not Checked", albumArt: "", id: "" },
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

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.nowPlaying.name !== this.state.nowPlaying.name) {
  //     this.getNowPlaying();
  //   }
  // }

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
    const { user, nowPlaying, loggedIn } = this.state;
    if (!loggedIn) {
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
          <div>
            <h1>Hello, {user.display_name}</h1>
          </div>
          <Profile />
          <TopArtists />
          <div>
            <div>Now Playing: {nowPlaying.name}</div>
            <img src={nowPlaying.albumArt} alt="album-art" />
          </div>
          {this.state.loggedIn && (
            <div>
              <button className="button" onClick={() => this.getNowPlaying()}>
                Check Now Playing
              </button>
            </div>
          )}
        </div>
        {/* <Analysis id={nowPlaying.id} /> */}
      </div>
    );
  }
}

export default App;
