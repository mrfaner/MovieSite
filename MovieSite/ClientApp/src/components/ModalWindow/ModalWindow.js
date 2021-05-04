import React from "react";
import "./Modal.css";

export function ModalWindow (props){


return(
    <React.Fragment>
        {/*<img className="menuItemIcon center" src={UserIcon} onClick={() => prsetIsActive(true)} alt="UserIcon"/>*/}
        {/*<label className="menuItemTitle center">Profile</label>*/}
        {
            props.active && (
                <div className="modal" onMouseDown={() => props.setActive(false)}>
                    {/*<div className= {`modal-body ${props.isActive ? 'active' : null}`}*/}
                    {/*     onClick={event => event.stopPropagation()}>*/}
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
