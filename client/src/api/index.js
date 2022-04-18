import axios from 'axios'

// const api = axios.create({
//     // baseURL: 'http://localhost:8080/api/v1',
//     baseURL: 'https://moviesapi.eu-gb.mybluemix.net/api/v1'
// });


const api = axios.create({
    baseURL: 'http://localhost:8080'
});

// export const insertMovie = payload => axios.post(`/api/v1/movie`, payload)
// export const getAllMovies = () => axios.get(`/api/v1/movies`)
// export const updateMovieById = (id, payload) => axios.put(`/api/v1/movie/${id}`, payload)
// export const deleteMovieById = id => axios.delete(`/api/v1/movie/${id}`)
// export const getMovieById = id => axios.get(`/api/v1/movie/${id}`)


export const insertMovie = payload => api.post(`/api/v1/movies`, payload)
export const getAllMovies = () => api.get(`/api/v1/movies`)
export const updateMovieById = (id, payload) => api.put(`/api/v1/movies/${id}`, payload)
export const deleteMovieById = id => api.delete(`/api/v1/movies/${id}`)
export const getMovieById = id => api.get(`/api/v1/movies/${id}`)

const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById
}

export default apis