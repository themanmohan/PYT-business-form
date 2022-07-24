module.exports = (packageName=null) => {
    if(packageName && typeof packageName === `string` && packageName.trim()) return console.log(`[[ Not loaded in app ]] ${ packageName }`);
    else return console.log(`[[ Unidentified package not loaded in app ]]`);
}