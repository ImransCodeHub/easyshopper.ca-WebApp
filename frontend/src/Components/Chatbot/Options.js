import React from "react";

// For future implementation
const Options = (props) => {
    const options = [
        {
        text: "Orders",
        handler: props.actionProvider.handleOrdersList,
        id: 1,
        },
        { text: "Products", handler: () => {}, id: 2 },
        { text: "Payments", handler: () => {}, id: 3 },
        { text: "Help", handler: () => {}, id: 4 },
    ];
    
    const optionsMarkup = options.map((option) => (
        <button
        className="option-button"
        key={option.id}
        onClick={option.handler}
        >
        {option.text}
        </button>
    ));
    
    return <div className="options-container">{optionsMarkup}</div>;
    }

export default Options;