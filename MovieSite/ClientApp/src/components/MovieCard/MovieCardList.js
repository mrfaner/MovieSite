import React from "react";
import "./MovieCardList.css";
import MovieCard from "./MovieCard";
// import Button from "reactstrap/lib/Button";

// import {Grid, makeStyles} from "@material-ui/core";
// import {Button, Card, CardBody, CardColumns, CardImg, CardSubtitle, CardText, CardTitle} from "reactstrap";


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

         // <div className="movieGrid">
         //     <Grid container
         //           spacing={2}
         //           justify={"center"}
         //           alignItems={"center"}>
         //         {MovieList.map((movie, index) => {
         //             return (
         //                 <Grid item
         //                       xs={12}
         //                       xl={4}
         //                       sm={12}
         //                       md={6}
         //                       key = {movie.id}>
         //                     <MovieCard key = {movie.id}
         //                                  movie = {movie}
         //                                  index = {index}/>
         //                 </Grid>
         //             )
         //         })}
         //     </Grid>
         // </div>
         // <CardColumns className="movieList">
         //     {MovieList.map((movie, index) => {
         //         return (
         //             <MovieCard key = {movie.id}
         //                          movie = {movie}
         //                          index = {index}/>
         //         )
         //     })}
         // </CardColumns>
     );
}




export default MovieCardList;