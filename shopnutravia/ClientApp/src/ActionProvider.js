import { createClientMessage } from 'react-chatbot-kit';
import { ChatResponse } from "./components/ChatResponse";
// ActionProvider starter code
class ActionProvider {
    constructor(createChatBotMessage,  setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }
    //function to render message and widgets when gaming sherbot option is clicked
    handleYes = () => {
        const message1 = this.createChatBotMessage(
            "Can we please have your name so we can properly address you?",
            //{
            //    widget: "gamingLinks",
            //    withAvator: false,
            //}
        );

        const message2 = createClientMessage(ChatResponse.Yes);
        this.updateChatbotState(message2);
        this.updateChatbotState(message1);
        ChatResponse.Step = 1;
    };
    askEmailAdd = () => {
        const message1 = this.createChatBotMessage(
            `Hello ${ChatResponse.Name}, what is your email address?`
        );
        this.updateChatbotState(message1);
    }
    handleInvalidEmail = () => {
        const message1 = this.createChatBotMessage(
            'Info! Please enter a valid Email Address.'
        );
        this.updateChatbotState(message1);
    }
    askOrderNo = () => {
        const message1 = this.createChatBotMessage('Thank you.');
        const message2 = this.createChatBotMessage('In order to verify your purchase, what was the order number?');
        const message3 = this.createChatBotMessage('Hint: It looks something like this (123-1234567-1234567)');
        const message4 = this.createChatBotMessage('If you are having trouble finding it, this link will take you to your order history: https://www.amazon.com/gp/css/order-history');
        this.updateChatbotState(message1);
        this.updateChatbotState(message2);
        this.updateChatbotState(message3);
        this.updateChatbotState(message4);
    }
    handleVerifiedOrderNo = () => {
        const message1 = this.createChatBotMessage('Thank You, Your order has been verified.');
        const message2 = this.createChatBotMessage('Please click the button below to leave a review on amazon.',
            {
                widget: "submitReview",
                withAvator: false,
            }); 
        const message3 = this.createChatBotMessage('Be sure not to close this page in your browser, doing so may cause delay in processing your claim.');
        const message4 = this.createChatBotMessage('Once you submit your review, return here to claim your gift :)');
        this.updateChatbotState(message1);
        this.updateChatbotState(message2);
        this.updateChatbotState(message3);
        this.updateChatbotState(message4);
        ChatResponse.Step = 5;
    }
    handleInvalidOrderNo = () => {
        const message1 = this.createChatBotMessage('It appears we may be missing your order number.');
        const message2 = this.createChatBotMessage('If you received your supplements within the last 7 days, we may not have received confirmation yet.');
        const message3 = this.createChatBotMessage('If your order number is correct, we may be having a technical issue with the verification.If so, please submit a ticket to our customer service center and customer support will respond promptly.');
        const message4 = this.createChatBotMessage('Do you want to re-enter your order?',
            {
                widget: "invalidOrderNo",
                withAvator: false,
            }
        );
        this.updateChatbotState(message1);
        this.updateChatbotState(message2);
        this.updateChatbotState(message3);
        this.updateChatbotState(message4);
    }
    handleOrderNoHasClaimed = () => {
        const message1 = this.createChatBotMessage('Order No. has already been used to claim Free Gift. Please check your email.');
        this.updateChatbotState(message1);
    }
    handleReenterOrderNo = () => {
        const message1 = createClientMessage(ChatResponse.Yes);
        const message2 = this.createChatBotMessage('Please enter your Order No.');
        this.updateChatbotState(message1);
        this.updateChatbotState(message2);
    }
    handleCustomerSupport = () => {
        const message1 = createClientMessage(ChatResponse.CustomerSupport);
        const message2 = this.createChatBotMessage('Please email us at help@shopnutra.com so we can better assist you.');
        this.updateChatbotState(message1);
        this.updateChatbotState(message2);
    }
    handleSubmitReview = () => {
        const message1 = createClientMessage(ChatResponse.SubmitReview);
        const message2 = this.createChatBotMessage('Please click the button below to claim your gift.',
            {
                widget: "claimGift",
                withAvator: false,
            }
        );
        this.updateChatbotState(message1);
        this.updateChatbotState(message2);
        if (ChatResponse.SKU.length > 0) {
            for (var i = 0; i < ChatResponse.SKU.length; i++) {
                //window.open(`https://www.amazon.com/product-reviews/${ChatResponse.SKU[i]}`, '_blank', 'noreferrer');
                window.open(`https://www.amazon.com/review/create-review?&asin=${ChatResponse.SKU[i]}`, '_blank', 'noreferrer');
            }
        }
    }
    handleClaimGift = () => {
        //API Check if review is submitted
        const message1 = createClientMessage(ChatResponse.ClaimGift);
        this.updateChatbotState(message1);
        fetch(`api/Gift/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: ChatResponse.Email,
                OrderNo: ChatResponse.OrderNo,
                Name: ChatResponse.Name,
            })
        })
        .then(response => response.text())
        .then(result => {
            result = JSON.parse(result);
            if (!result) return;
            
            const message2 = this.createChatBotMessage('Your gift card has been emailed to your email provided [email address] Please allow up to 15 min for this to show in your inbox, if you do not see it, please check spam / junk.');
            const message3 = this.createChatBotMessage("Are you here to claim your free giftcard?",
                {
                    widget: "sherbotOptions",
                    withAvator: false,
                });
            
            this.updateChatbotState(message2); 
            this.updateChatbotState(message3); 
            ChatResponse.Step = 0;
            ChatResponse.Name = "";
            ChatResponse.Email = "";
            ChatResponse.OrderNo = "";
            ChatResponse.SKU = [];
        })
        .catch(error => console.log('error', error));
        
    }
    updateChatbotState(message) {
        // NOTE: This function is set in the constructor, and is passed in 
        //from the top level Chatbot component. The setState function here     
        // actually manipulates the top level state of the Chatbot, so it's 
        //important that we make sure that we preserve the previous state.
        this.setState(prevState => ({
            ...prevState, messages: [...prevState.messages, message]
        }))
    }
}

export default ActionProvider;