import React from "react";

import "./SherbotOptions.css";
import { ChatResponse } from "../ChatResponse";
//options component that will guide the user to possible options.

const SherbotOptions = (props) => {
    const options = [

        {
            text: ChatResponse.Yes,
            handler: props.actionProvider.handleYes,
            id: 1,
        },
    ];;


    const optionsMarkup = options.map((option) => (
        <button 
        className="sherbot-option-button"
        key={option.id}
        onClick={option.handler}>
            {option.text}
        </button>
    ));

    return <div className="sherbot-options-container">{optionsMarkup}</div>
};



export default SherbotOptions;