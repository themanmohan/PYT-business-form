const defaultLoadingText = `LOADING...`;
let loaderCount = 0; // used to keep track of loaders rendered on page, and to select correct loader in DOM

function showLoader(loadingText=defaultLoadingText, parentElem=document.body){
    loaderCount++;

    const styleElement = `

        <style class="loader-styles" data-loader-number="${ loaderCount }">
            .loader[data-loader-number='${ loaderCount }']{
                position: ${ parentElem === document.body ? `fixed` : `absolute` };
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                height: 100%;
                padding: var(--whitespace);

                background: #bfbfbf;
                color: black;

                display: grid;
                align-items: center;
                align-content: center;
                justify-content: center;  

                text-align: center;
                z-index: 1000;
                opacity: 0;
                overflow: scroll;

                transition: all 0.3s;
            }
            .loader[data-loader-number='${ loaderCount }'].open{ opacity: 1; }

            .loader[data-loader-number='${ loaderCount }'] p{
                font-weight: 500;
                font-size: 1em;
            }
        </style>
    `;

    // If parentElem === document.body, we display loader as position:fixed and on full screen,
    // else we render loader as position:absolute and change it's parentElement to position:relative so that loader can be displayed inside it's parentElement
    if(parentElem !== document.body) parentElem.style.setProperty(`position`, `relative`, `important`);

    const loaderDiv = document.createElement(`div`);
    loaderDiv.dataset.loaderNumber = loaderCount;
    loaderDiv.classList.add(`loader`);
    loaderDiv.innerHTML = `<p>${ loadingText }</p>`;

    parentElem.insertAdjacentElement(`afterbegin`, loaderDiv);
    parentElem.insertAdjacentHTML(`afterbegin`, styleElement);

    loaderDiv.classList.add(`open`); // doing this extra step so that the css transition can kick in when class is added, and it looks smoother

    return loaderCount;
}

function hideLoader(loaderNumber){
    if(loaderNumber){
        const styleElemToDelete = document.querySelector(`style[data-loader-number='${ loaderNumber }']`),
            loaderToDelete = document.querySelector(`.loader[data-loader-number='${ loaderNumber }']`);
        
        if(styleElemToDelete && loaderToDelete){
            // not directly removing the element from DOM so that the css transition can kick in after class is removed, and it looks smoother
            loaderToDelete.classList.remove(`open`);
            loaderToDelete.addEventListener(`transitionend`, () => {
                if(styleElemToDelete) styleElemToDelete.remove();
                if(loaderToDelete) loaderToDelete.remove();
            });
        }
    }
}

function hideAllLoaders(){
    const loadersToDelete = document.querySelectorAll(`.loader`);

    if(loadersToDelete && loadersToDelete.length){

        loadersToDelete.forEach((loader) => {
            // not directly removing the element from DOM so that the css transition can kick in after class is removed, and it looks smoother
            loader.classList.remove(`open`);
            loader.addEventListener(`transitionend`, () => {
                const loaderNumber = loader.dataset.loaderNumber,
                    styleElemToDelete = document.querySelector(`style[data-loader-number='${ loaderNumber }']`);

                if(loader) loader.remove();
                if(styleElemToDelete) styleElemToDelete.remove();
            });
        });
    }
}

export default {
    show: showLoader,
    hide: hideLoader,
    hideAll: hideAllLoaders
}