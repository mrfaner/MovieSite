import React, { useCallback, useEffect, useState } from "react";
import MovieCardList from "./MovieCard/MovieCardList";
import "./Home.css";
import { Spinner } from "reactstrap";
//import SearchBar from "./SearchBar/SearchBar";


// const useFormField = (initialValue= '') => {
//     const [value, setValue] = React.useState(initialValue);
//     const onChange = React.useCallback((e) => setValue(e.target.value), []);
//     return { value, onChange };
// };


export function Home() {

    const [input, setInput] = useState('');

    const [movieList, setMovieList] = useState();

    const getMovies = useCallback(() => {
        let xhr = new XMLHttpRequest();
        let string;
        if (movieList && movieList?.length !== 0) {
            string = "api/movies/0," + (parseInt(movieList.length, 10) + 10);

        } else {
            string = "api/movies/0,11";
        }
        xhr.open("get", string, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                setMovieList(JSON.parse(xhr.responseText));
            }
        };
        xhr.send();
        console.log(xhr);
    }, [movieList])

    useEffect(() => {
        if (!movieList) getMovies();
    }, [movieList, getMovies])

    const updateInput = async (input) => {
        if (input !== "") {
            let xhr = new XMLHttpRequest();
            xhr.open("get", "api/movies/GetMoviesByTitle/" + input, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    setMovieList(JSON.parse(xhr.responseText));
                }
            };
            xhr.send();

            console.log(xhr);
        }
        else {
            getMovies();
        }
        setInput(input);
    }

    return (
        <div className="Home">
            {/*<SearchBar
                keyword={input}
                setKeyword={updateInput}
            />*/}
            {
                movieList
                    ? (<div className="movieListArea">
                        <MovieCardList MovieList={movieList}
                            getMovies={getMovies}
                        />
                    </div>)
                    : (<Spinner />)
            }

        </div>


    );
}
