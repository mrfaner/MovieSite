import React from "react";
import "./MovieCard.css";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

 function MovieCard(props){

     console.log(props.movie);
     const history = useHistory();

     
     return(
         <div className="view">
            <img className="img" src={ props.movie.image }/>
                <div className="mask">
                <h2>{props.movie.name}</h2>
                <p className="cardText">{props.movie.description}</p>
                    <a>
                        <Button onClick={() => { history.push(`/MoviePage/${props.movie.movieId}`);}}>Читати...</Button>
                    </a>
             </div>
         </div>
         // <Card className="movieBody">
         //     <CardTitle>
         //         <p>{props.index}</p>
         //         {props.movie.title}
         //     </CardTitle>
         //    <CardBody>
         //        {props.movie.text}
         //    </CardBody>
         // </Card>
     );

}

export default MovieCard;