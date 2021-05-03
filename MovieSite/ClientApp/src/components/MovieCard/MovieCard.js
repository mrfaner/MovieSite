import React from "react";
import "./MovieCard.css";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

 function MovieCard(props){

     console.log(props.movie);
     const history = useHistory();

     return(
         <div className="box text-center">
             <div className="cardTitle">{props.movie.title}</div>
             <div className="cardText">{props.movie.description}</div>
             <p>
                <Button onClick={() => { history.push(`/MoviePage/${props.movie.movieId}`);}}>Читати...</Button>
             </p>
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