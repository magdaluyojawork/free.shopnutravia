import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import SherbotOptions from "./components/SherbotOptions/SherbotOptions";
import SubmitReviewOptions from "./components/SubmitReviewOptions/SubmitReviewOptions";
import ClaimGiftOptions from "./components/ClaimGiftOptions/ClaimGiftOptions";
import InvalidOrderNoOptions from "./components/InvalidOrderNoOptions/InvalidOrderNoOptions";
import BotAvatar from "./components/BotAvatar";
//import TalkLinks from "./components/TalkLinks/TalkLinks";

const config = {
    botName: "Shopnutravia",
    initialMessages: [
        createChatBotMessage("Are you here to claim your free giftcard?", {
            widget: "sherbotOptions",
        }),
    ],
    //initialMessages property from the config is put into 
    //the chatbot's internal state in a property called "messages"

    customComponents: {
        botAvatar: (props) => <BotAvatar {...props} />,
    },

    customStyles: {
        botMessageBox: {
            backgroundColor: '#000000',
        },
        chatButton: {
            backgroundColor: '#000000',
        },
    },

    widgets: [
        {
            widgetName: "sherbotOptions",
            widgetFunc: (props) => <SherbotOptions {...props} />,
        },

        {
            widgetName: "submitReview",
            widgetFunc: (props) => <SubmitReviewOptions {...props} />,
        },

        {
            widgetName: "claimGift",
            widgetFunc: (props) => <ClaimGiftOptions {...props} />,
        },

        {
            widgetName: "invalidOrderNo",
            widgetFunc: (props) => <InvalidOrderNoOptions {...props} />,
        },


    ],
}

export default config;