import React from "react";
import "./MovieCardList.css";
import MovieCard from "./MovieCard";



 function MovieCardList({MovieList, getMovies}) {
     return (
             <div className="movieList">
                 {MovieList.map((movie, index) => {
                     return (
                         <MovieCard key = {movie.movieId}
                                      movie = {movie}
                                      index = {index}/>
                     )})}
                 <div className="showMore" onClick={() => {getMovies()}} >
                        <label className = "title">ShowMore</label>
                 </div>
             </div>

     );
}




export default MovieCardList;