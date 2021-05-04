import React from "react";
import "./SlideMoadl.css";

function SlideModal(props){

    function close(){
        if (props.isActive){
            let slideModel = document.getElementById("slideModal");
            function setOpacity0(){
                slideModel.classList.add("op-0");
                props.setActive(false);
            }
            slideModel.classList.add("modalClose");
            setTimeout(setOpacity0,300);
        }
    }
    let className = props.isActive ? "slideModal" : "slideModal op-0";

    // console.log(props.isActive);

    return(
        <React.Fragment>
            {/*onMouseDown={() => props.setActive(false)}*/}
            <div id="slideModal" className={className} onMouseDown={ () => {close()}}>
                {/*<div className= {`modal-body ${props.isActive ? 'active' : null}`}*/}
                {/*     onClick={event => event.stopPropagation()}>*/}
                { props.isActive && (<div className="slideModal-body"
                     onMouseDown={event => event.stopPropagation()}>
                        <div className="slideModal-line"/>
                    <div className="slideModal-content">
                        {props.children}
                    </div>
                </div>)}
            </div>
        </React.Fragment>
    );
}

export default SlideModal;