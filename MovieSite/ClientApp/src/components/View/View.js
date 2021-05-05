import React, { useEffect, useState} from "react";
import "./View.css"
import {useParams} from "react-router-dom"
import {Spinner} from "reactstrap"
import YoutubeEmbed from "./../YoutubeEmbed/YoutubeEmbed";


export function View()
{
    const [movie,setMovie] = useState();
    const params = useParams().id


    useEffect(() => {
            if (!movie) {
                let xhr = new XMLHttpRequest()

                xhr.open("get", "api/movies/GetMovieByMovieId/" + params, true)
                xhr.setRequestHeader("Content-Type", "application/json")

                xhr.onload = function () {
                    if (xhr.status === 200) {

                        let movie = JSON.parse(xhr.responseText)

                        setMovie(JSON.parse(xhr.responseText))
                    }
                }
                xhr.send()
            }
        }, [movie, params])

        console.log(movie);
    return(
        <>
        {movie
            ? (
                    <div className="movie-view">
                        <img className="imageView" src={movie.image} alt="Photo dont choose"/>
                        <label className="titleLabel">{movie.name}</label>
                        <div className="yearBlock">
                            <div className="yearField">Date: </div>
                            <label className="yearLabel">{movie.year}</label>
                        </div>
                        <div className="countryBlock">
                            <div className="countryField">Country: </div>
                            <label className="countryLabel">{movie.country}</label>
                        </div>
                        <div className="durationBlock">
                            <div className="durationField">Duration: </div>
                            <label className="durationLabel">{movie.duration}</label>
                        </div>
                        <div className="ratingBlock">
                            <div className="ratingField">IMDB Rating: </div>
                            <label className="ratingLabel">{movie.imdbRating}</label>
                        </div>
                        <div className="descriptionBlock">
                            <div className="descriptionField">Description:</div>
                            <label className="descriptionLabel">{movie.description}</label>
                        </div>
                        {(movie.trailerLink !== null)?
                        (
                            <div className="TrailerBlock">
                            <div className="trailerField">Trailer:</div>
                            <YoutubeEmbed embedId={movie.trailerLink} />
                        </div>
                        ):(null)
                        
                        }
                    </div>
            )
            : (
                <>
                    <Spinner className="spinner"/>
                </>
            )}
    </>
    )
}