import browserBackEventHandler from './browserBackEventHandler';

let modalCount = 0; // used to keep track of modals rendered on page, and to select correct modal in DOM
const rootElemStyles = getComputedStyle(document.querySelector(`:root`));


function showModal(modalCssStylesAsString=null, classesToAssignModal=[], contentHTML=null, parentElem=document.body){
    if(!(contentHTML && (typeof contentHTML === `string`) && contentHTML.trim())){
        return new Error(`Modal must have inner content. So please provide contentHTML`);
    }

    modalCount++;

    const styleElement = `
        <style class="modal-styles" data-modal-number="${ modalCount }">  
            .modal-bg[data-modal-number='${ modalCount }']{
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;

                height: 100%;
                background: black;
    
                z-index: 1000;
                opacity: 0;
                cursor: pointer;

                transition: all 0.3s;
            }
            .modal-bg[data-modal-number='${ modalCount }'].open{ opacity: 0.65; }


            .modal[data-modal-number='${ modalCount }']{
                position: ${ parentElem === document.body ? `fixed` : `absolute` };
                top: 0;
                left: auto;
                right: 0;
                bottom: 0;
                height: 100%;

                background: white
                color: black;

                z-index: 1001;
                opacity: 0;
                overflow: scroll;

                transition: all 0.3s;
            }
            .modal[data-modal-number='${ modalCount }'].open{ opacity: 1; }

            .modal[data-modal-number='${ modalCount }'] .close-button-wrapper{
                text-align: right;
                padding: 20px 50px;
            }
            .modal[data-modal-number='${ modalCount }'] .close-button-wrapper *{
                cursor: pointer;
            }
            .modal[data-modal-number='${ modalCount }'] .modal-content{
                padding:20px  50px;
            }           
        </style>
    `;

    // If parentElem === document.body, we display modal as position:fixed and on full screen,
    // else we render modal as position:absolute and change it's parentElement to position:relative so that modal can be displayed inside it's parentElement
    if(parentElem !== document.body) parentElem.style.setProperty(`position`, `relative`, `important`);

    const modalDiv = document.createElement(`div`);
    modalDiv.dataset.modalNumber = modalCount;
    modalDiv.classList.add(`modal`);

    if(classesToAssignModal && Array.isArray(classesToAssignModal) && classesToAssignModal.length){
        classesToAssignModal.forEach((classToAssign) => modalDiv.classList.add(classToAssign));
    }

    if(modalCssStylesAsString && (typeof modalCssStylesAsString === `string`) && modalCssStylesAsString.trim()){
        modalDiv.setAttribute(`style`, modalCssStylesAsString);
    }
    

    const blackColorToUse = rootElemStyles.getPropertyValue(`--black2`);
    modalDiv.innerHTML = `
        <section class="modal-content">${ contentHTML }</section>
    `;

    parentElem.insertAdjacentElement(`afterbegin`, modalDiv);
    parentElem.insertAdjacentHTML(`afterbegin`, styleElement);


    if(parentElem === document.body){
        const modalBg = document.createElement(`div`);
        
        modalBg.dataset.modalNumber = modalCount;
        modalBg.classList.add(`modal-bg`);
        parentElem.insertAdjacentElement(`afterbegin`, modalBg);
 
        // doing this extra step so that the css transition can kick in when class is added, and it looks smoother
        setTimeout(modalBg.classList.add(`open`), 500);
    }
    
    // doing this extra step so that the css transition can kick in when class is added, and it looks smoother
    setTimeout(modalDiv.classList.add(`open`), 500);
    return modalCount;
}

function hideModal(modalNumber){
    if(modalNumber){
        const styleElemToDelete = document.querySelector(`style[data-modal-number='${ modalNumber }']`),
            modalToDelete = document.querySelector(`.modal[data-modal-number='${ modalNumber }']`),
            modalBgToDelete = document.querySelector(`.modal-bg[data-modal-number='${ modalNumber }']`);
        
        if(styleElemToDelete && modalToDelete){
            // not directly removing the element from DOM so that the css transition can kick in after class is removed, and it looks smoother
            modalToDelete.classList.remove(`open`);
            modalToDelete.addEventListener(`transitionend`, () => {
                if(styleElemToDelete) styleElemToDelete.remove();
                if(modalToDelete) modalToDelete.remove();
                if(modalBgToDelete) modalBgToDelete.remove();
            });
        }
    }
}

function hideAllModals(){
    const modalsToDelete = document.querySelectorAll(`.modal`);

    if(modalsToDelete && modalsToDelete.length){

        modalsToDelete.forEach((modal) => {
            // not directly removing the element from DOM so that the css transition can kick in after class is removed, and it looks smoother
            modal.classList.remove(`open`);
            modal.addEventListener(`transitionend`, () => {
                const modalNumber = modal.dataset.modalNumber,
                    modalBgToDelete = document.querySelector(`.modal-bg[data-modal-number='${ modalNumber }']`),
                    styleElemToDelete = document.querySelector(`style[data-modal-number='${ modalNumber }']`);

                if(modal) modal.remove();
                if(modalBgToDelete) modalBgToDelete.remove();
                if(styleElemToDelete) styleElemToDelete.remove();
            });
        });
    }
}


export default {
    show: showModal,
    hide: hideModal,
    hideAll: hideAllModals
}