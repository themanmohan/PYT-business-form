let currentCounter = 1;

export default (browserBackEventHandler) => {
    // https://stackoverflow.com/questions/8980255/how-do-i-retrieve-if-the-popstate-event-comes-from-back-or-forward-actions-with

    window.history.pushState({ counter: currentCounter }, ``, window.location.href + `#`);
    window.addEventListener(`popstate`, eventHandler);

    
    function eventHandler(e){
        if(!e.state || (e.state.counter <= currentCounter)){
            // Back button pressed
            browserBackEventHandler();
        }
    
        currentCounter++;
    
        window.removeEventListener(`popstate`, eventHandler);
    }
}