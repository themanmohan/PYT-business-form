
const deltaConverterOptions = {
    encodeHtml: false,
    inlineStyles: true,
    multiLineParagraph: false,
    linkRel: `noreferrer noopener`,
    linkTarget: `_blank`,
    urlSanitizer: (str) => {
        const whiteList = /^((https?|s?ftp|file|blob|mailto|tel):|#|\/|data:image\/)/;

        let val = str;
        val = val.replace(/^\s*/gm, '');
        
        if(whiteList.test(val)) return val;
        else return 'http://' + val;
    }
};





export default deltaConverterOptions