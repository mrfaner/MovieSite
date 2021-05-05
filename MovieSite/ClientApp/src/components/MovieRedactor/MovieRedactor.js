import React, {useEffect, useState} from "react";
import "./MovieRedactor.css";
import {useParams} from "react-router-dom";
import noimage from "./no-image.png";
import imageToBase64 from 'image-to-base64/browser';

const useFormField = (initialValue) => {
    const [value, setValue] = React.useState(initialValue);

    const onChange = React.useCallback((e) => {
        setValue(e.target.value)
    }, []);

    return {
        bind: {
            value,
            onChange
        },
        set: (line) => setValue(line),
        get: () => value
    };
};

  
export function MovieRedactor() {
    const [redactor, setReadactor] = useState();
    const params = useParams().id;
    // console.log(params);
    const [image, setImage] = useState();
    const movieTitleField = useFormField("");
    const movieYearField = useFormField("");
    const movieCountryField = useFormField("");
    const movieDurationField = useFormField("");
    const movieRatingField = useFormField("");
    const movieDescriptionField = useFormField("");
    const movielinkField = useFormField("");
    const [errorList, setErrorList] = React.useState({});
    

    function errorsValidator(){
        let errors = {};

        if (!movieTitleField.get().trim()) errors["Title"] = true;
        if (!movieDescriptionField.get().trim()) errors["Description"] = true;
        if (!movieYearField.get().trim()) errors["Year"] = true;
        if (!movieCountryField.get().trim()) errors["Country"] = true;
        if (!movieDurationField.get().trim()) errors["Duration"] = true;
        if (!movieRatingField.get().trim()) errors["Rating"] = true;

        return errors;
    }

    function imageSelect(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setImage(reader.result);
        }
        console.log(file);
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        if (!redactor) 
        {
            setReadactor(document.getElementById("movie-dynamic-body"));
        }
    }, [redactor, setReadactor])

    useEffect(() => {
        if (!image)
        {
            setImage(noimage);
        }
    }, [image])

    async function movieSubmitHandler() {
        let err = errorsValidator();

        setErrorList(err);
        if (Object.keys(err).length === 0){
            let xhr = new XMLHttpRequest();
            let img;
            if (image === "/static/media/no-image.9ae40db8.png")
            {
                await imageToBase64("./no-image.png") // Path to the image
                .then(
                    (response) => {
                        img = response; // "cGF0aC90by9maWxlLmpwZw==
                    }
                )
                .catch(
                    (error) => {
                        console.log(error); // Logs an error if there was one
                    }
                )            
            }else{
                img = image;
            }
            let movie = JSON.stringify({
                MovieId: params,
                Name: movieTitleField.get(),
                Description: movieDescriptionField.get(),
                Year: movieYearField.get(),
                Image: img,
                Country: movieCountryField.get(),
                Duration: movieDurationField.get(),
                IMDBRating: movieRatingField.get(),
                TrailerLink: movielinkField.get().substr(movielinkField.get().length - 11,11)
            });
            xhr.open("post","api/movies", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(movie);
            console.log(movie);
        }
    }
    

    // console.log(image);
    // console.log(redactor);
    return (
        <div id="movie-redactor">
            <div>
                <span className="imageSelector">
                    <img className="imageblock" src={ image? image : noimage } alt="Photo dont choose"/>
                    <input className="imageInput"
                        type="file"
                        onChange={event => imageSelect(event)}
                    />
                </span>
                <span className="titleSet">
                    <label className="nameLabel">Title*:</label>
                    <input type="text"
                           {...movieTitleField.bind}>
                           </input>
                           {errorList["Title"] ? <div className="emptyErrorTitle">Field is empty</div>: null}
                </span>
                <span className="year">
                    <label className="yearLabel">Date*:</label>
                    <input type="text"
                           {...movieYearField.bind}/>
                    {errorList["Year"] ? <div className="emptyErrorTitle">Field is empty</div>: null}
                </span>
                <span className="country">
                    <label className="countryLabel">Country*:</label>
                    <input type="text"
                           {...movieCountryField.bind}/>
                            {errorList["Country"] ? <div className="emptyErrorTitle">Field is empty</div>: null}
                </span>
                <span className="duration">
                    <label className="durationlabel">Duration*:</label>
                    <input type="text"
                           {...movieDurationField.bind}/>
                           {errorList["Duration"] ? <div className="emptyErrorTitle">Field is empty</div>: null}
                </span>
                <span className="rating">
                    <label className="ratingLabel">IMDB Rating*:</label>
                    <input type="text"
                           {...movieRatingField.bind}/>
                           {errorList["Rating"] ? <div className="emptyErrorTitle">Field is empty</div>: null}
                </span>
                <span className="link">
                    <label className="linkLabel">Youtube link:</label>
                        <input type="text"
                                {...movielinkField.bind}/>
                </span>
                <span className="description">
                    <label className="descriptionLabel">Description*:</label>
                        <textarea type={"textbox"}
                                {...movieDescriptionField.bind}/>
                                {errorList["Description"] ? <div className="emptyErrorTitle">Field is empty</div>: null}
                </span>
            </div>
            <div className="movie-buttons">
                <button className="movie-submit" onClick={movieSubmitHandler}>Add movie</button>
            </div>
            <div id="movie-dynamic-body">
            </div>
        </div>
    );

}
