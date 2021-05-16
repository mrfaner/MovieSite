import React from "react";
import "./MovieCard.css";
import { Button } from "reactstrap";
import noimage from "./../MovieRedactor/no-image.png";
import { NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';


function MovieCard(props) {



    return (
        <div className="view">
            <img className="img" src={(props.movie.image.includes("data:image")) ? props.movie.image : noimage} alt="Film pos" />
            <div className="mask">
                <h2>{props.movie.name}</h2>
                <p className="cardText">{props.movie.description}</p>
                <NavbarBrand tag={Link} to={"/MoviePage/" + props.movie.movieId}>
                    <Button>ReadMore...</Button>
                </NavbarBrand>
            </div>
        </div>
    );

}

export default MovieCard;