import { ChatResponse } from "./components/ChatResponse";
import validator from 'validator'
import requestOptions from "./RequestOptions";
class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse(message) {
        const lowerCaseMessage = message.toLowerCase();
        if (lowerCaseMessage.trim() === "") return;

        if (ChatResponse.Step === 3) {
            let orderNo = message.trim();

            fetch(`api/Gift/${orderNo}`)
                .then(response => response.text())
                .then(result => {
                    result = JSON.parse(result);
                    if (result.hasFreeGift && !result.hasClaimedGift) {//valid
                        fetch("https://ssapi.shipstation.com/orders?orderNumber=" + orderNo, requestOptions)
                            .then(response => response.text())
                            .then(result => {
                                result = JSON.parse(result);
                                var isValidOrderNo = result.total > 0;
                                if (isValidOrderNo) {
                                    if (result.orders[0].orderStatus === "shipped") {
                                        ChatResponse.OrderNo = orderNo;
                                        ChatResponse.Step = 4;
                                        let arrItems = result.orders[0].items;
                                        for (var i = 0; i < arrItems.length; i++) {
                                            ChatResponse.SKU.push(arrItems[i].sku);
                                        }
                                        this.actionProvider.handleVerifiedOrderNo();
                                    } else {
                                        this.actionProvider.handleInvalidOrderNo();
                                    }
                                        
                                } else {
                                    this.actionProvider.handleInvalidOrderNo();
                                }
                            })
                        .catch(error => console.log('error', error));
                    } else if (!result.hasFreeGift) {//Check Order No if correct
                        this.actionProvider.handleInvalidOrderNo();
                    }
                    else {
                        this.actionProvider.handleOrderNoHasClaimed();
                    }
                })
                .catch(error => console.log('error', error));

            
        }
        if (ChatResponse.Step === 2) {
            //if (validator.isEmail(message)) {
                ChatResponse.Email = message;
                ChatResponse.Step = 3;
                this.actionProvider.askOrderNo();
            //} else {
            //    this.actionProvider.handleInvalidEmail();
            //}
        }
        if (ChatResponse.Step === 1) {
            ChatResponse.Name = message;
            ChatResponse.Step = 2;
            this.actionProvider.askEmailAdd();
        }
    }
}

export default MessageParser;