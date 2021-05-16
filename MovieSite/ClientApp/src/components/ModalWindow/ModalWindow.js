import React from "react";
import "./Modal.css";

export function ModalWindow (props){


return(
    <React.Fragment>
        {
            props.active && (
                <div className="modal" onMouseDown={() => props.setActive(false)}>
                    <div className= {`modal-body ${props.active ? null : 'close'}`}
                         onMouseDown={event => event.stopPropagation()}>
                            {props.children}
                    </div>
                </div>
            )
        }

    </React.Fragment>
)

}
