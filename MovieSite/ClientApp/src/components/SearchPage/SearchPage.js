import React, { useCallback, useEffect, useState } from "react";
import MovieCardListWithoutShowMore from "./../MovieCard/MovieCardListWithoutShowMore";
import "./SearchPage.css";
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from "reactstrap/lib/Button";

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
        string = "api/movies/GetMovieSearch/" + (TitleField.get().trim() === "" ? "0" : TitleField.get().trim()) + "," + (state.categorys ? categories[state.categorys] : 0) + "/" + state.sort;
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
                    <div className="searchPageTitles">
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
                        style ={{width: "182px", border : "1px solid black", borderRadius: "5px"}}
                    >
                        <option value=''>None</option>
                        {
                            categories.map((category, index) => {
                                return (
                                    <option key={index} value={index}>{category}</option>
                                )
                            })
                        }
                    </NativeSelect>
                </div>
                <div className="searchPageSetSorting">
                    <div className="searchPageSortingTitle">
                        Sort by:
                    </div>
                    <NativeSelect
                        value={state.sort}
                        onChange={handleChange}
                        name="sort"
                        className="categorySort"
                        inputProps={{ 'aria-label': 'sort' }}
                        inputProps={{ 'aria-label': 'categorys' }}
                        style ={{width: "182px", border : "1px solid black", borderRadius: "5px"}}

                    >
                        <option value={1}>Name</option>
                        <option value={2}>Name(desc)</option>
                        <option value={3}>Rating</option>
                        <option value={4}>Rating(desc)</option>
                    </NativeSelect>

                </div>
            </div>

            <Button className="searchButton" onClick={() => {
                handleSubmit()
            }}>
                Search
                </Button>


            {movieList ?
                (
                    <div className="movieListArea">
                        <MovieCardListWithoutShowMore MovieList={movieList}
                            getMovies={getMovies}
                        />
                    </div>
                )
                : null
            }

        </div>
    );
}