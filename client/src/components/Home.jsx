import React, { Component } from "react";
import api from "../api";

import styled from "styled-components";

const Row = styled.div.attrs({
  className: "row",
})``;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      isloading: false,
    };
  }

  async componentDidMount() {
    this.setState({ isloading: true });
    const movies = await api.getAllMovies();
    this.setState({
      movies: movies.data.data,
      isloading: false,
    });
  }

  render() {
    const { movies, isloading } = this.state;
    return (
      <div className="container mt-4">
        <Row>
          {!isloading &&
            movies.slice(0, 10).map((movie) => {
              return (
                <div className="col-md-4 text-center">
                  <img height="200px" src={movie.poster}></img>
                  <h5>{movie.title}</h5>
                </div>
              );
            })}
        </Row>
      </div>
    );
  }
}

export default Home;
