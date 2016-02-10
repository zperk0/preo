var messagesAlert = {
    notify : [
        {         
            content:_tr("Your order is running 15 mins late"),
            name:_tr("Late Order"),
            type: 'ORDER_NOTIFY'
        },
        {
            content:_tr("Your order is on its way"),
            name:_tr("En-route"),
            type: 'ORDER_NOTIFY'
        },
        {          
            content:_tr("There is a problem with your order. Please call us"),
            name:_tr("Call us"),
            type: 'ORDER_NOTIFY'
        }
    ],
    reject:[
        {
            content:_tr("Your address is out of our delivery zone"),
            name:_tr("Out of zone"),
            type: 'ORDER_REJECT'
        },
        {
            content:_tr("Sorry, that item is out of stock"),
            name:_tr("Out of stock"),
            type: 'ORDER_REJECT'
        },
        {
            content:_tr("Sorry, Your order has been rejected. Please call us"),
            name:_tr("Call us"),
            type: 'ORDER_REJECT'
        }
    ]
};