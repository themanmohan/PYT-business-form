import { Notyf } from 'notyf';


const stylesheet = document.createElement(`link`);
stylesheet.setAttribute(`rel`, `stylesheet`);
stylesheet.setAttribute(`type`, `text/css`);
stylesheet.setAttribute(`href`, `https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css`);
document.head.insertAdjacentElement(`afterbegin`, stylesheet);


const notyf = new Notyf({
    duration: 3500,
    position: { x: `right`, y: `top` },
    dismissible: true,
    types: [
        {
            type: `success`,
            className: `success-toast`,
            ripple: true,
            background: `#0F9834`,
            icon: {
                className: `success-toast-icon`,
                tagName: `i`,
            },
            message: `Success`
        },
        {
            type: `error`,
            className: `error-toast`,
            ripple: true,
            background: `#FF0222`,
            icon: {
                className: `error-toast-icon`,
                tagName: `i`,
            },
            message: `Something went wrong`,
            dismissible: false
        },
        {
            type: `info`,
            className: `info-toast`,
            ripple: true,
            background: `#BDE5F8`,
            icon: {
                className: `info-toast-icon`,
                tagName: `i`,
            },
            message: `Info`
        },
        {
            type: `warning`,
            className: `warning-toast`,
            ripple: true,
            background: `#FEEFB3`,
            icon: {
                className: `warning-toast-icon`,
                tagName: `i`,
            },
            message: `Warning`,
            dismissible: false
        },
    ]
});


const commonTasks = (config=null, configuration=null) => {
    if(configuration && Object.keys(configuration).length) config = Object.assign(config, configuration);

    notyf.open(config);
}


/**
 * @function
 * @description Show error toast alert (using notyf.js)
 * @param {Object} configuration Configuration object to override default options. Check {@link https://github.com/caroso1222/notyf}
 */
const showErrorToast = (configuration=null) => {
    let config = { type: `error` };
    commonTasks(config, configuration);
}


/**
 * @function
 * @description Show success toast alert (using notyf.js)
 * @param {Object} configuration Configuration object to override default options. Check {@link https://github.com/caroso1222/notyf}
 */
const showSuccessToast = (configuration=null) => {
    let config = { type: `success` };
    commonTasks(config, configuration);
}


/**
 * @function
 * @description Show warning toast alert (using notyf.js)
 * @param {Object} configuration Configuration object to override default options. Check {@link https://github.com/caroso1222/notyf}
 */
const showWarningToast = (configuration=null) => {
    let config = { type: `warning` };
    commonTasks(config, configuration);
}


/**
 * @function
 * @description Show info toast alert (using notyf.js)
 * @param {Object} configuration Configuration object to override default options. Check {@link https://github.com/caroso1222/notyf}
 */
const showInfoToast = (configuration=null) => {
    let config = { type: `info` };
    commonTasks(config, configuration);
}


export default {
    error: showErrorToast,
    success: showSuccessToast,
    warning: showWarningToast,
    info: showInfoToast
}