import React, { useEffect, useState } from "react";
import "./MovieRedactor.css";
import { useParams } from "react-router-dom";
import noimage from "./no-image.png";
import imageToBase64 from 'image-to-base64/browser';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from "react-router-dom";


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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    '3D',
    'Action',
    'Adventure',
    'Animation',
    'Anime',
    'Biography',
    'Comedy',
    'Crime',
    'Concert',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'Film-Noir',
    'Game-Show',
    'History',
    'Horror',
    'Kids',
    'Music',
    'Musical',
    'Mystery',
    'News',
    'Reality-TV',
    'Romance',
    'Sci-Fi',
    'Shortie',
    'Sport',
    'Talk-Show',
    'Thriller',
    'TV and DVD only',
    'War',
    'Western'
];


export function MovieRedactor() {
    const [personName, setPersonName] = React.useState([]);
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
    const history = useHistory();

    const [errorList, setErrorList] = React.useState({});
    const handleChange = (event) => {
        setPersonName(event.target.value);
    };

    function errorsValidator() {
        let errors = {};

        if (!movieTitleField.get().trim()) errors["Title"] = true;
        if (!movieDescriptionField.get().trim()) errors["Description"] = true;
        if (!movieYearField.get().trim()) errors["Year"] = true;
        if (!movieCountryField.get().trim()) errors["Country"] = true;
        if (!movieDurationField.get().trim()) errors["Duration"] = true;
        if (!movieRatingField.get().trim()) errors["Rating"] = true;
        if (personName.length === 0) errors["Category"] = true;
        console.log(personName);
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
        if (!redactor) {
            setReadactor(document.getElementById("movie-dynamic-body"));
        }
    }, [redactor, setReadactor])

    useEffect(() => {
        if (!image) {
            setImage(noimage);
        }
    }, [image])

    async function movieSubmitHandler() {
        let err = errorsValidator();

        setErrorList(err);
        if (Object.keys(err).length === 0) {
            let xhr = new XMLHttpRequest();
            let img;
            if (image === "/static/media/no-image.9ae40db8.png") {
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
            } else {
                img = image;
            }
            let movie = JSON.stringify({
                MovieId: params,
                Name: movieTitleField.get(),
                Description: movieDescriptionField.get(),
                Year: movieYearField.get(),
                Image: img,
                Categories: personName,
                Country: movieCountryField.get(),
                Duration: movieDurationField.get(),
                IMDBRating: movieRatingField.get(),
                TrailerLink: movielinkField.get().substr(movielinkField.get().length - 11, 11)
            });
            xhr.open("post", "api/movies", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200){
                    history.push("/");
                }
            };    
            xhr.send(movie);
            console.log(movie);
        }
    }

    // console.log(image);
    // console.log(redactor);
    return (
        <div id="movie-redactor">
            <div className="mainSetBlock">
                <span className="imageSelector">
                    <img className="imageblock" src={image ? image : noimage} alt="Dont choose" />
                    <input className="imageInput"
                        type="file"
                        onChange={event => imageSelect(event)}
                    />
                </span>
                <div className="otherSetEditor">
                    <span className="titleSet">
                        <label className="nameLabelEditor">Title*:</label>
                        <input type="text"
                            {...movieTitleField.bind}>
                        </input>
                        {errorList["Title"] ? <div className="emptyErrorTitle">Field is empty</div> : null}
                    </span>
                    <span className="year">
                        <label className="yearLabelEditor">Date*:</label>
                        <input type="text"
                            {...movieYearField.bind} />
                        {errorList["Year"] ? <div className="emptyErrorTitle">Field is empty</div> : null}
                    </span>
                    <span className="country">
                        <label className="countryLabelEditor">Country*:</label>
                        <input type="text"
                            {...movieCountryField.bind} />
                        {errorList["Country"] ? <div className="emptyErrorTitle">Field is empty</div> : null}
                    </span>
                    <span className="duration">
                        <label className="durationlabelEditor">Duration*:</label>
                        <input type="text"
                            {...movieDurationField.bind} />
                        {errorList["Duration"] ? <div className="emptyErrorTitle">Field is empty</div> : null}
                    </span>
                    <span className="rating">
                        <label className="ratingLabelEditor">IMDB Rating*:</label>
                        <input type="text"
                            {...movieRatingField.bind} />
                        {errorList["Rating"] ? <div className="emptyErrorTitle">Field is empty</div> : null}
                    </span>
                    <span className="link">
                        <label className="linkLabelEditor">Youtube link:</label>
                        <input type="text"
                            {...movielinkField.bind} />
                    </span>
                    <div className="categoriesBox">
                        <label className="categoriesLabelEditor">
                            Categories*:
                        </label>
                        <Select
                            className="CatSel"
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<Input />}
                            style={{width: "182px", border:"1px solid #767676", background: "white"}}

                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}

                        >
                            {names.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={personName.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                        {errorList["Category"] ? <div className="emptyErrorTitle">Select category</div> : null}

                    </div>

                </div>

                <span className="description">
                    <label className="descriptionLabel">Description*:</label>
                    <textarea type={"textbox"}
                        {...movieDescriptionField.bind} />
                    {errorList["Description"] ? <div className="emptyErrorTitle">Field is empty</div> : null}
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
