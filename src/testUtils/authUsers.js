export const regularUser = {
    signInUserSession: {
        idToken: {
            payload: {
                "cognito:groups":['ROLES_USER']
            }
        }
    },
    attributes: {
        email: "testUser@email.com",
        password: "fakePassword123?"
    }
}

export const adminUser = {
    signInUserSession: {
        idToken: {
            payload: {
                "cognito:groups":['ROLES_ADMIN']
            }
        }
    },
    attributes: {
        email: "adminUser@email.com",
        password: "fakePassword123?"
    }
}