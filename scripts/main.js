(function (window) {
    'use strict';
    let FORM_SELECTOR = '[data-coffee-order="form"]';
    let PAYMENT_SELECTOR = '[data-coffee-order="payment"]';
    let CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    let App = window.App;
    let Truck = App.Truck;
    let DataStore = App.DataStore;
    let FormHandler = App.FormHandler;
    let Validation = App.Validation;
    let CheckList = App.CheckList;
    let Payment = App.Payment;
    let myTruck = new Truck("ncc-1701", new DataStore());
    window.myTruck = myTruck;
    let checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    let formHandler = new FormHandler(FORM_SELECTOR);
    let paymentHandler = new FormHandler(PAYMENT_SELECTOR);
    let myPayment = new Payment(PAYMENT_SELECTOR);

    formHandler.addSubmitHandler(data => {
        myTruck.createOrder.call(myTruck, data);
        checkList.addRow.call(checkList, data);
    });
    paymentHandler.addSubmitHandler(data =>{
        myPayment.Pay.call(myPayment,data);
    });

    formHandler.addInputHandler(Validation.isCompanyEmail);
    
})(window);