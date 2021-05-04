import React from "react";
import "./AuthenticationPage.css"

const useFormField = (initialValue) => {
    const [value, setValue] = React.useState(initialValue);

    const onChange = React.useCallback((e) => setValue(e.target.value), []);

    return{
        bind: {
            value,
            onChange
        },
        set: (line) => setValue(line),
        get: () => value
    };
};

export function AuthenticationPage(){

    const [isSignUp,SetIsSignUp] = React.useState(false);
    const [errorList, setErrorList] = React.useState({});

    let firstNameField = useFormField("");
    let lastNameField = useFormField("");
    let eMailField = useFormField("");
    let loginField = useFormField("");
    let passwordField = useFormField("");

    function showForm (line){
        setErrorList({});

        firstNameField.set("");
        lastNameField.set("");
        eMailField.set("");
        loginField.set("");
        passwordField.set("");

        switch (line){
            case "signIn": {
                if (isSignUp){
                    SetIsSignUp(false);
                }
                break;
            }
            case "signUp": {
                if (!isSignUp)
                {
                    SetIsSignUp(true);
                }
                break;
            }
            default:{
                break;
            }
        }
    }

    function errorsValidator(line){
        let errors = {};

        // console.log(Boolean(!loginField.get().trim()));
        if (!loginField.get().trim()) errors["Login"] = true;
        if (!passwordField.get().trim()) errors["Password"] = true;

        if (line === "new"){
            if (!firstNameField.get().trim()) errors["FirstName"] = true;
            if (!lastNameField.get().trim()) errors["LastName"] = true;
            if (!eMailField.get().trim()) errors["Email"] = true;
        }
        // console.log("errors");
        // console.log(errors);
        return errors;
    }

    function saveUserToLocal(xhr,user){
        console.log("test");
        console.log(xhr);
        let temp = JSON.parse(JSON.parse(user));

        console.log(temp.userId);
        if (temp.userId !== null){
            localStorage.setItem("User", user);
            window.location.reload();
        }
        else {
            let errors = {};
            errors["Login"] = true;
            errors["Password"] = true;
            errors["Email"] = true;
            setErrorList(errors);
        }
    }

    function handleSubmit (event, line){
        let xhr = new XMLHttpRequest();

        let err = errorsValidator(line);

        setErrorList(err);

        //console.log(errorList);

        if (Object.keys(err).length === 0){

            let user = JSON.stringify({
                UserId:"",
                FirstName: firstNameField.get(),
                LastName: lastNameField.get(),
                Email: eMailField.get(),
                Login: loginField.get(),
                Password: passwordField.get()});

            //console.log(user);

            switch (line){
                case "new": {

                    xhr.open("post","api/users", true);
                    xhr.setRequestHeader("Content-Type", "application/json");

                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            let responsedUser = JSON.stringify(xhr.responseText);
                            saveUserToLocal(xhr,responsedUser);
                        }
                    };

                    xhr.send(user);

                    break;
                }
                case "old": {

                    xhr.open("get","api/users/"+loginField.get()+","+passwordField.get(), true);
                    xhr.setRequestHeader("Content-Type", "application/json");

                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            let responsedUser = JSON.stringify(xhr.responseText);
                            saveUserToLocal(xhr,responsedUser);
                        }
                    };

                    xhr.send();

                    break;
                }
                default:{
                    break;
                }
            }
        }
        //console.log(Boolean(xhr.responseText));

        event.preventDefault();
    }

    let formPickerMenu = (
        <div className="formPicker">
            <button onClick={ () => showForm("signIn") }
                    className={ isSignUp ? "nonActive" : " active" }>
                SignIn
            </button>
            <button onClick={ () => showForm("signUp") }
                    className={ isSignUp ? " active" : "nonActive" }>
                SignUp
            </button>
        </div>
    );

    if (!isSignUp){
        return (
            <div className="AuthenticationForm">
                {formPickerMenu}
                <div>
                    <form onSubmit={event => handleSubmit(event,"old")}>
                        <p>Login</p>
                        <p>
                            <input className={ errorList["Login"] ? "notSetValue" : ""}
                                   name="Login"
                                   type="text" {...loginField.bind}/>
                        </p>
                        <p>Password</p>
                        <p>
                            <input className={ errorList["Password"] ? "notSetValue" : ""}
                                   name="Password"
                                   type="password" {...passwordField.bind}/>
                        </p>
                        <p>
                            <input type="submit"
                                   value="SignIn" />
                        </p>
                    </form>
                </div>
            </div>
        );
    }
    else {
        return(
            <div className="AuthenticationForm">
                {formPickerMenu}
                <div>
                    <form onSubmit={event => handleSubmit(event,"new")}>
                        <p>First Name</p>
                        <p>
                            <input className={ errorList["FirstName"] ? "notSetValue" : ""}
                                   name="FirstName"
                                   type="text" {...firstNameField.bind}/>
                        </p>
                        <p>Last Name</p>
                        <p>
                            <input className={ errorList["LastName"] ? "notSetValue" : ""}
                                   name="LastName"
                                   type="text" {...lastNameField.bind}/>
                        </p>
                        <p>Mail</p>
                        <p>
                            <input className={ errorList["Email"] ? "notSetValue" : ""}
                                   name= "Email"
                                   type="email" {...eMailField.bind}/>
                        </p>
                        <p>Login</p>
                        <p>
                            <input className={ errorList["Login"] ? "notSetValue" : ""}
                                   name= "Login"
                                   type="text" {...loginField.bind}/>
                        </p>
                        <p>Password</p>
                        <p>
                            <input className={ errorList["Password"] ? "notSetValue" : ""}
                                   name="Password"
                                   type="password" {...passwordField.bind}/>
                        </p>
                        <p>
                            <input type="submit"
                                   value="SignUp" />
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}


