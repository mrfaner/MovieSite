import React from "react";
import "./MovieCardList.css";
import MovieCard from "./MovieCard";


 function MovieCardListWithoutShowMore({MovieList, getMovies}) {

     return (
             <div className="movieList">
                 {MovieList.map((movie, index) => {
                     return (
                         <MovieCard key = {movie.movieId}
                                      movie = {movie}
                                      index = {index}/>
                     )})}
             </div>

     );
}




export default MovieCardListWithoutShowMore;