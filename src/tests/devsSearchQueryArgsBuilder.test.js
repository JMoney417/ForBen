import queryArgsFunctions from "../graphQLUtils/devsSearchQueryArgsBuilder";

it(`should return appropriate args, given input`, async () => {
    const devsByFirstNameArgsFunction = queryArgsFunctions['devsByFirstName'];
    const devsByLastNameArgsFunction = queryArgsFunctions['devsByLastName'];
    const devsByFavLangArgsFunction = queryArgsFunctions['devsByFavLang'];
    const devsByYearStartedArgsFunction = queryArgsFunctions['devsByYearStarted'];
    const devsByFirstResult = devsByFirstNameArgsFunction('jason');
    expect(devsByFirstResult).toEqual(`(name:"jason")`);
    const devsByLastResult = devsByLastNameArgsFunction('monroe');
    expect(devsByLastResult).toEqual(`(name:"monroe")`);
    const devsByFavLangResult = devsByFavLangArgsFunction('Java');
    expect(devsByFavLangResult).toEqual(`(language:"Java")`);
    const devsByYearResult = devsByYearStartedArgsFunction('1999');
    expect(devsByYearResult).toEqual(`(year:1999)`);

})