import { Auth } from "aws-amplify";

export const getDevelopers = () => {
    Auth.currentSession().getAccessToken().getJwtToken();
    return  fetch("https://tech-services-1000201953.uc.r.appspot.com/developers")
    .then(res=>res.json());
}

export const postDeveloper = (developer) => {
    return fetch("https://tech-services-1000201953.uc.r.appspot.com/developer", {
        method: 'POST',
        headers: { 'Content-Type':'application/json'},
        body: JSON.stringify(developer)
    }).then(res => res.json());
}

export const putDeveloper = (developer) => {
    return  fetch("https://tech-services-1000201953.uc.r.appspot.com/developer", {
        method: 'PUT',
        headers: { 'Content-Type':'application/json'},
        body: JSON.stringify(developer)
    }).then(res => res.json());
}