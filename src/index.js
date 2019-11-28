$(function() {
    console.log( `work you miserable piece of slag!` );

    
    let logoimg = constants.logo;
    let footer = $(`footer`);

    $(`#logoContainer`).append(`<img id="logo"></img>`);
    $(`#logo`).attr(`src`, logoimg);

    const selectorContainer = $(`#selectorContainer`);
    selectorContainer.append(`<p>Choose a section:</p>`);
    selectorContainer.append(`<select id="selector"></select>`);
    
    for (let i = 0; i < constants.sectionOptions.length; i++){
        let selector = $(`#selector`);
        let bagOfHolding;
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
                .attr(`id`, function() {
                    bagOfHolding = constants.sectionOptions[i].replace(/\./g, ``);
                    return bagOfHolding
                })
            }
        })
    }
    
        $(`#selector`).on(`change`, function() {
            let value = this.value
            $.ajax ({
                method: `GET`,
                url: `https://api.nytimes.com/svc/topstories/v2/${value}.json?api-key=${constants.APIKey}`,
            }).done(function(data) {
                // console.log(data)
                $(`a`).slideUp()
                $(`#selectionContainer`).html('')
                data.results
                    .slice(0, 12)
                    .forEach(function(x, i) { 
                        console.log(x)
                   const link = x.short_url;
                   const image = x.multimedia[3].url
                   const description = x.abstract;
                
                    apiStorage[`article${i}`] = {link, image, description}
                    constants.generateContent(link, image, description)
                })
                $(`a`).slideDown()
                console.log(apiStorage)
            })
        })
    

    footer.append(`<p><i class="icofont-copyright"></i> Copyright 2016 INSTANEWS</p>`)

});
const constants = {
    logo: `../assets/images/nyt-logo.svg`,
    main: 1,
    sectionOptions: [`Sections`, `arts`, `automobiles`, `books`, `business`, `fashion`, `food`, `health`, `home`, `insider`, `magazine`, `movies`, `national`, `obituaries`, `opinion`, `politics`, `realestate`, `science`, `sports`, `sundayreview`, `technology`, `theater`, `travel`, `upshot`, `world`],
    APIKey: `ufgUeOkNrPXMBGtACisXTApujh2aM5EG`,

    generateContent(link, image, description) {
        $(`#selectionContainer`).append(function() {
            return $(`<a></a>`)
                .hide()
                .attr(`href`, `${link}`)
                .attr(`class`, `grid-item`)
                .append(`<img src=${image}></img>`)
                .append(`<div class='shadowBox'>${description}</div>`)
        })
    }
    
};

let apiStorage = {}


