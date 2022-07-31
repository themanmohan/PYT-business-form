const mediaToBeDeleted = {},
    mediaDeleteButtons = document.querySelectorAll(`.remove-media`);

let clickedCategory = null,
    clickedMediaID = null;

exports.setup = () => {
    if(mediaDeleteButtons && mediaDeleteButtons.length){
        mediaDeleteButtons.forEach((btn) => {
            btn.addEventListener(`click`, (e) => {
                clickedCategory = btn.dataset.mediaCategory;
                clickedMediaID = btn.dataset.mediaId;

                if(!mediaToBeDeleted[clickedCategory]){
                    mediaToBeDeleted[clickedCategory] = [];
                }

                if(mediaToBeDeleted[clickedCategory].includes(clickedMediaID)){

                    mediaToBeDeleted[clickedCategory].splice(mediaToBeDeleted[clickedCategory].indexOf(clickedMediaID), 1);
                    if(mediaToBeDeleted[clickedCategory].length < 1){
                        delete mediaToBeDeleted[clickedCategory];
                    }

                    btn.classList.remove(`add-media-back-btn`);
                    btn.classList.add(`remove-media`);
                    btn.innerHTML = `delete`;
                }
                else{
                    mediaToBeDeleted[clickedCategory].push(clickedMediaID);
                    btn.classList.remove(`remove-media`);
                    btn.classList.add(`add-media-back-btn`);
                    btn.innerHTML = `add back`
                }
                
                clickedCategory = null;
            });
        });
    }
}


exports.getMediaToBeDeletedObj = () => mediaToBeDeleted;