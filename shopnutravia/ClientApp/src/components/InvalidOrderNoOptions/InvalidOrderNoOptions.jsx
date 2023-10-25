import React from "react";

import "./InvalidOrderNoOptions.css";
import { ChatResponse } from "../ChatResponse";
//options component that will guide the user to possible options.

const InvalidOrderNoOptions = (props) => {
    const options = [

        {
            text: ChatResponse.Yes,
            handler: props.actionProvider.handleReenterOrderNo,
            id: 1,
        },
        {
            text: ChatResponse.CustomerSupport,
            handler: props.actionProvider.handleCustomerSupport,
            id: 2,
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



export default InvalidOrderNoOptions;