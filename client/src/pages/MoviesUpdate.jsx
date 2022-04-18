import React, { Component } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import api from "./../api";

const Row = styled.div.attrs({
  className: "row",
})``;

const Column = styled.div.attrs({
  className: "col-md-4",
})``;

const Form = styled.form.attrs({
  classname: "form",
})``;

const FormGroup = styled.div.attrs({
  className: "form-group",
})``;

const FormLabel = styled.div.attrs({
  className: "form-label",
})``;

const FormControl = styled.input.attrs({
  className: "form-control",
})``;

const FormCheck = styled.input.attrs({
  className: "form-check",
})``;

const Button = styled.button.attrs({
  className: "btn btn-primary",
})``;

class MoviesUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      id: this.props.match.params.id,
      isLoading: false,
      title: "",
      overview: "",
      poster: "",
      release_date: "",
      rating: "",
      cast: "",
      genres: [],
      categories: [
        { id: 1, value: "Action", checked: false },
        { id: 2, value: "Adventure", checked: false },
        { id: 3, value: "Romance", checked: false },
        { id: 4, value: "Comedy", checked: false },
      ],
    };
  }

  handleChangeInputTitle = async (event) => {
    const title = event.target.value;
    this.setState({ title });
  };

  handleChangeInputOverview = async (event) => {
    const overview = event.target.value;
    this.setState({ overview });
  };

  handleChangeInputPoster = async (event) => {
    const poster = event.target.value;
    this.setState({ poster });
  };

  handleChangeInputReleaseDate = async (event) => {
    const release_date = event.target.value;
    this.setState({ release_date: String(release_date) });

  };

  handleChangeInputRating = async (event) => {
    const rating = event.target.value;
    this.setState({ rating });
  };


  handleChangeInputCast = async (event) => {
    const cast = event.target.value;
    this.setState({ cast });
  };


  handleChangeInputGenres = async (event) => {
    let checked = event.target.checked;
    const value = event.target.value;

    if (checked == true) {
      if (this.state.genres.length >= 3) {
        checked=false;
        window.alert("Only three genres allowed");
      } else {
        this.state.genres.push(value);
      }
    } else {
      const index = this.state.genres.indexOf(value);
      this.state.genres.splice(index, 1);
    }

    const a = this.state.categories.map(el => {
      if(el.value === value)
          el.checked=checked;
      return el;
    });
    this.setState({ categories: a})
  };


  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.title);
    console.log(this.state.overview);
    console.log(this.state.release_date);
    console.log(this.state.rating);
    console.log(this.state.cast);
    console.log(this.state.poster);
    console.log(this.state.genres);

    const { title, overview, poster, release_date, rating, cast, genres, id } = this.state;
    const payload = { title, overview, poster, release_date, rating, cast, genres };
    api.updateMovieById(id,payload).then((res) => {
      if(res.data.status === "success"){
        window.alert(`Movie updated successfully`);
      console.log(res);
      window.location = '/'
    } else {
      console.log(res);
    }
    }).catch(err => console.log(err)) ;
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    const movie = await api.getMovieById(String(this.state.id));
    // console.log(movie);
    this.setState({
      movie: movie.data.data,
      title: movie.data.data.title,
      overview: movie.data.data.overview,
      poster: movie.data.data.poster,
      release_date: String(movie.data.data.release_date).substring(0,10),
      rating: String(movie.data.data.rating).substring(0,10),
      cast: movie.data.data.cast,
      isLoading: false,
      genres: movie.data.data.genres
    });
      
    const a = await this.state.categories.map(item => {
        if(movie.data.data.genres.includes(item.value))
          item.checked=true;
        return item;
    })
    this.setState({ categories : a });
    console.log(movie);
  };

  render() {
    const { title, overview, poster, release_date, rating, cast, categories } = this.state;
    // console.log(this.state.categories);
    return (
      <div className="container">
        <p>{this.state.name}</p>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormLabel for="movietitle">
              <strong>Title:</strong>
            </FormLabel>
            <FormControl
              type="text"
              placeholder="Movie Name"
              id="movietitle"
              required
              value={title}
              onChange={this.handleChangeInputTitle}
            ></FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel for="overview">
              <strong>Overview:</strong>
            </FormLabel>
            <FormControl
              as="textarea"
              rows={3}
              placeholder="Movie Description"
              id="overview"
              required
              value={overview}
              onChange={this.handleChangeInputOverview}
            ></FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel for="released_date">
              <strong>Released Date:</strong>
            </FormLabel>
            <FormControl
              type="date"
              id="released_date"
              required
              // value="2020-02-23"
              value={release_date}
              onChange={this.handleChangeInputReleaseDate}
            ></FormControl>
          </FormGroup>

          <FormGroup>
            <FormLabel for="rating">
              <strong>Rating:</strong>
            </FormLabel>
            <FormControl
              type="number"
              id="rating"
              required
              onChange={this.handleChangeInputRating}
            ></FormControl>
          </FormGroup>


          <FormGroup>
            <FormLabel for="cast">
              <strong>Cast:</strong>
            </FormLabel>
            <FormControl
              type="array"
              id="cast"
              required
              onChange={this.handleChangeInputCast}
            ></FormControl>
          </FormGroup>



          <FormGroup>
            <FormLabel for="poster">
              <strong>Poster:</strong>
            </FormLabel>
            <FormControl
              type="url"
              id="poster"
              placeholder="Enter url"
              required
              value={poster}
              onChange={this.handleChangeInputPoster}
            ></FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel>
              <strong>Genres:</strong>
            </FormLabel>
            <ol className="list-group">
              {categories.map((el) => (
                <li key={el.id} className="list-group-item">
                  <label>
                    <input
                      type="checkbox"
                      value={el.value}
                      checked={el.checked}
                      onClick={this.handleChangeInputGenres}
                    />{" "}
                    {el.value}
                  </label>
                </li>
              ))}
            </ol>
          </FormGroup>

          <Button type="submit">Update</Button>
        </Form>
      </div>
    );
  }
}

export default MoviesUpdate;
