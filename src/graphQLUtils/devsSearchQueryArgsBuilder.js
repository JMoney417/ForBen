const queryArgsFunctions = {
    devsByFirstName: (queryValue) => `(name:"${queryValue}")`,
    devsByLastName: (queryValue) => `(name:"${queryValue}")`,
    devsByFavLang: (queryValue) => `(language:"${queryValue}")`,
    devsByYearStarted: (queryValue) => `(year:${queryValue})`
}

export default queryArgsFunctions;