import React, { Component } from "react";
import styled from "styled-components";
import ReactTable, { useRowSelect } from "react-table";
import Table from "./Table.js";
import "react-table/index.js";
import api from "../api";
// import 'react-table/react-table.css'

const Wrapper = styled.div`
  padding: 0 60px 60px 60px;
`;

class DeleteMovie extends Component {
  deleteMovie = (event) => {
    event.preventDefault();

    if (
      window.confirm(
        `Do tou want to delete the movie "${this.props.data.title}" permanently?`
      )
    ) {
      api.deleteMovieById(this.props.data._id);
      window.location.reload();
    }
  };

  render() {
    return <button className="btn btn-outline-danger" onClick={this.deleteMovie}>Delete</button>;
  }
}

class UpdateMovie extends Component{

    updateMovie = (event) => {
        window.location = `/movies/update/${this.props.data._id}`;
    };

    render() {
        return <button className="btn btn-outline-success" onClick={this.updateMovie}>Update</button>
    }
}

class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      columns: [],
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const movies = await api.getAllMovies();
    this.setState({
      movies: movies.data.data,
      isLoading: false,
    });
  };

  render() {
    const { movies, isLoading } = this.state;

    const columns = [
      {
        Header: "Poster",
        accessor: "poster",
        Cell: (props) => {
          return (
            <img
              className="img-responsive"
              height="150 px"
              src={props.value}
            ></img>
          );
        },
      },
      {
        Header: "Title",
        accessor: "title",
        filterable: true,
      },
      {
        Header: "Released Date",
        accessor: "release_date",
        Cell: (props) => {
          //props.value will contain your date
          //you can convert your date here
          const d = new Date(props.value);
          const custom_date = d.toDateString();
          return <>{custom_date}</>;
        },
      },

      // {
      //   Header: "Rating",
      //   accessor: "rating",
      //   filterable: true,
      // },

      // {
      //   Header: "Cast",
      //   accessor: "cast",
      //   filterable: false,
      // },



      {
        Header: "Genres",
        accessor: "genres",
        filterable: false,
        Cell: (props) => {
          return props.value.map((el) => (
            <div>
              <span>{el}</span>
              <br></br>
            </div>
          ));
        },
      },
      {
        Header: "",
        id: "update",
        accessor: (str) => "delete",
        Cell: (props) => {
          return (
            <span>
              <UpdateMovie data={props.row.original} />
            </span>
          );
        },
      },
      {
        Header: "",
        id: "delete",
        accessor: (str) => "delete",
        Cell: (props) => {
          return (
            <span>
              <DeleteMovie data={props.row.original} />
            </span>
          );
        },
      },
    ];

    return (
      <div className="container mt-4" id="movies">
        <Table columns={columns} data={movies} />
      </div>
    );
  }
}

export default MoviesList;
