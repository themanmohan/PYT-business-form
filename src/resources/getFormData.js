export default function getFormData(form=null){
    console.log(form)
    // Returns an object that has all name:value pairs of a DOM Form element's children (inputs/textareas/radio/checkbox/select)

    // Does not support nested values that are usually derived when we set input element's name property as object[name]

    const formData = {}

    if (!form || (form.nodeName && form.nodeName.toLowerCase() !== `form`)) return Error(`Form element invalid/missing`);

    for(let index = 0; index < form.elements.length; index++){
        if(form.elements[index].name === ``) continue;

        switch(form.elements[index].nodeName.toLowerCase()){
            case `input`:
                switch(form.elements[index].type){
                    case `text`:
                    case `hidden`:
                    case `email`:
                    case `password`:
                    case `tel`:
                    case `number`:
                    case `date`:
                    case `color`:
                        if(form.elements[index].value.trim()) formData[form.elements[index].name] = form.elements[index].value;
                        break;
                }

            case `radio`:
            case `checkbox`:
                if(form.elements[index].checked){
                    if (form.elements[index].name in formData) formData[form.elements[index].name] = formData[form.elements[index].name] + ',' + form.elements[index].value;
                    else formData[form.elements[index].name] = form.elements[index].value;
                }
                break;

            case `textarea`:
                if(form.elements[index].value.trim()) formData[form.elements[index].name] = form.elements[index].value;
                break;

            case `select`:
                if(form.elements[index].value.trim()){
                    switch(form.elements[index].type){
                        case `select-one`:
                            formData[form.elements[index].name] = form.elements[index].value;
                            break;
                        case `select-multiple`:
                            const multi = [] 
                            for (let i = 0; i < form.elements[index].options.length; i++) {
                                if (form.elements[index].options[i].selected) {
                                    multi.push(form.elements[index].options[i].value)
                                    formData[form.elements[index].name] = multi.toString(); // remove toString() for array
                                }
                            }
                            break;
                    }
                }
                break;
        }
    }

    return formData
}