$(function() {
    
    let logoimg = constants.logo;
    let footer = $(`footer`);

    $(`.loader`).hide();
    $(`.logoContainer`).append(function() {
       return  $(`<img class="logo" id="logo"></img>`)
                    .attr(`src`, logoimg)
    });

    const selectorContainer = $(`.selectorContainer`);
    selectorContainer.append(`<p>Choose a section:</p>`);
    selectorContainer.append(`<select class="selector"></select>`);
    
    for (let i = 0; i < constants.sectionOptions.length; i++) {
        let selector = $(`.selector`);
        let bagOfHolding;
        selector.append(function() {
            
            if (constants.sectionOptions[i] === `Sections`) {
                return $(`<option class="option">${constants.sectionOptions[i]}</option>`)
                .attr(`value`, ``)
                .attr(`disabled`, `true`)
                .attr(`selected`, `selected`)
            }

            else {
                return $(`<option class="option">${constants.sectionOptions[i]}</option>`)
                    .attr(`value`, `${constants.sectionOptions[i]}`)
                    .attr(`id`, function() {
                        bagOfHolding = constants.sectionOptions[i].replace(/\./g, ``);
                        return bagOfHolding
                });
            }
        })
    }
    
        $(`.selector`).on(`change`, function() {
            let value = this.value;
            $(`.loader`).show();
            $.ajax ({
                method: `GET`,
                url: `https://api.nytimes.com/svc/topstories/v2/${value}.json?api-key=${constants.APIKey}`,
            }).done(function(data) {
                $(`a`).slideUp()
                $(`.articlesContainer`).html(``)
                data.results
                    .slice(0, 12)
                    .forEach(function(x, i) { 
                        let link, image, description;
                    if (x.short_url) {
                        link = x.short_url;
                    }
                    if (x.multimedia[2] && $(window).width() <= 599) {
                        image = x.multimedia[2].url
                    }
                    else if (x.multimedia[3] && $(window).width() <= 1249) {
                        image = x.multimedia[3].url
                    }
                    else if (x.multimedia[4] && $(window).width() >= 1250) {
                        image = x.multimedia[4].url
                    }
                    else {
                        image = `../assets/images/nytimeslogo.svg`
                    }
                    if (x.abstract) {
                        description = x.abstract;
                    }
                    else {
                        description = `click on this image to read this article and more on the NYC Times website`
                    }
                   
                
                    apiStorage[`article${i}`] = {link, image, description}
                    constants.generateContent(link, image, description)
                    })
                    $(`a`).slideDown()
                    $(`header`).attr(`id`, `headerSelected`)
                    $(`.logoContainer`).attr(`id`, `logoContainerSelected`)
                    $(`.selectorContainer`).attr(`id`, `selectorContainerSelected`)
                    $(`.selector`).attr(`id`, `selectorSelected`)
                    $(`footer`).attr(`id`, `footerSelected`)
                    

                // console.log(apiStorage)
            })
            .fail(function() {
                constants.onFail()
            })
            .always(function() {
                $(`.loader`).hide();
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
        $(`.articlesContainer`).append(function() {
            return $(`<a></a>`)
                .hide()
                .attr(`href`, `${link}`)
                .attr(`class`, `grid-item`)
                .attr(`style`, `background-image: url('${image}')`)
                .append(function () {
                    return $(`<div class='shadowBox'></div>`)
                    .append(`<p class='article'>${description}</p>`)
                })
        })
    },

    onFail() {
        $(`.articlesContainer`).append(function() {
            return $(`<p>Could not generate content. Please try again later. If the issue persists, contact the website administrator.</p>`)
                .attr(`class`, `failToLoad`)
        })
    },
    
};

let apiStorage = {}


