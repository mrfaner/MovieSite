import React, { useCallback, useEffect, useState } from "react";
import MovieCardList from "./../MovieCard/MovieCardList";
import "./SearchPage.css";
import NativeSelect from '@material-ui/core/NativeSelect';

const useFormField = (initialValue) => {
    const [value, setValue] = React.useState(initialValue);

    const onChange = React.useCallback((e) => setValue(e.target.value), []);

    return {
        bind: {
            value,
            onChange
        },
        set: (line) => setValue(line),
        get: () => value
    };
};

const categories = [
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


export function SearchPage() {
    const [movieList, setMovieList] = useState();
    const getMovies = useCallback(() => {
        setMovieList();
    }, [movieList])

    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    useEffect(() => {
        if (!movieList) getMovies();
    }, [movieList, getMovies])

    let TitleField = useFormField("");


    function handleSubmit() {
        let xhr = new XMLHttpRequest();
        let string;
        if (movieList && movieList?.length !== 0) {
            string = "api/movies/GetMovieSearch/" + TitleField.get() + "," + (state.categorys? categories[state.categorys] : "0") +"/0," + (parseInt(movieList.length, 10) + 10);

        } else {
            string = "api/movies/GetMovieSearch/" + (TitleField.get().trim()===""? "0" : TitleField.get().trim()) + "," + (state.categorys? categories[state.categorys] : 0 ) +"/0,11";
        }
        xhr.open("get", string, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                setMovieList(JSON.parse(xhr.responseText));
            }
        };
        xhr.send();
        console.log(string);
        console.log(xhr);

    }

    return (
        <div className="searchPageBlock">
            <div className="searchPageTitle">
                Search
            </div>
            <div className="searchPageParams">
                <div className="searchPageSetTitle">
                    <div className="searchPageTitle">
                        Title:
                    </div>
                    <input className="searchPageSetTitleInput" name="title"
                        type="text" {...TitleField.bind} />
                </div>
                <div className="searchPageSetCategories">
                    <div className="searchPageCategories">
                        Category:
                    </div>
                    <NativeSelect
                        value={state.categorys}
                        onChange={handleChange}
                        name="categorys"
                        className="categorySelector"
                        inputProps={{ 'aria-label': 'categorys' }}
                    >
                        <option value=''>None</option>
                        {
                            categories.map((category, index) => {
                                return (
                                    <option key = {index} value={index}>{category}</option>
                                )
                            })
                        }
                    </NativeSelect>
                </div>
            </div>

            <div onClick={() => {
                handleSubmit()
            }}>
                button
                </div>


            {movieList ?
                (
                    <div className="movieListArea">
                        <MovieCardList MovieList={movieList}
                            getMovies={getMovies}
                        />
                    </div>
                )
                : null
            }

        </div>
    );
}