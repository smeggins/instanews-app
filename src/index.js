$(function() {
    console.log( `work you miserable piece of slag!` );

    if (constants.main === 1) {
    let logoimg = constants.logo;
    const mainContainer = $(`#INWrapper`);
    let header = $(`header`);
    let footer = $(`footer`);

    header.append(`<div id="logoContainer"></div>`);
    $(`#logoContainer`).append(`<img id="logo"></img>`);
    $(`#logo`).attr(`src`, logoimg);

    header.append(`<div id="selectorContainer"></div>`);
    const selectorContainer = $(`#selectorContainer`);
    selectorContainer.append(`<p>Choose a section:</p>`);
    selectorContainer.append(`<select id="selector"></select>`);
    
    for (let i = 0; i < constants.sectionOptions.length; i++){
        let selector = $(`#selector`);
        selector.append(function() {
            if (constants.sectionOptions[i] === `Sections`){
                return $(`<option class="option">${constants.sectionOptions[i]}</option>`)
                .attr(`value`, ``)
                .attr(`disabled`, `true`)
                .attr(`selected`, `selected`)
            }
            else{
            return $(`<option class="option">${constants.sectionOptions[i]}</option>`)
                .attr(`value`, `${constants.sectionOptions[i]}`)
            }
        })

    }

    footer.append(`<p>@ Copyright 2016 INSTANEWS</p>`)



    }






});
const constants = {
    logo: `../assets/images/nyt-logo.svg`,
    main: 1,
    sectionOptions: [`Sections`, `world`, `U.S.`, `Politics`, `N.Y.`, `Business`, `Opinion`, `Tech`, `Science`, `Health`, `Sports`, `Arts`, `Books`, `Style`, `Food`, `Travel`, `Magazine`, `T Magazine`, `Real Estate`, `Video`]
}


