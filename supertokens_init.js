import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session/index.js";
import EmailPassword from "supertokens-node/recipe/emailpassword/index.js";
import MongoClient from "./database/db.js"
import userSanitizer from "./database/userSanitizer.js"
import variables from "./env_variables.js"

// console.log(await MongoClient)
// // /* Initializing the supertokens library. */
supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: variables.SupertokensConnctionUri,
        apiKey: variables.SuperTokenApiKey,
    },
    // development config
    appInfo: {
        // learn more about this on https://supertokens.com/docs/session/appinfo
        appName: "Courage_portfolio",
        apiDomain: "http://localhost:3000/",
        websiteDomain: "http://localhost:3000/",
        apiBasePath: "/supertokens",
        websiteBasePath: "/auth",
    },


    recipeList: [
        EmailPassword.init({
            signUpFeature: {
                formFields: [{
                        id: "firstName",
                        optional: true,
                    },
                    {
                        id: "lastName",
                        optional: true,
                    },
                    {
                        id: "mobileContact",
                        optional: true,
                    },
                    {
                        id: "country",
                        optional: true,
                    },
                ],
            },
            emailDelivery: {
                override: originalImplementation => {
                    return {
                        ...originalImplementation,
                        sendEmail: async function(input) {
                            if (input.type === "PASSWORD_RESET") {
                                return originalImplementation.sendEmail({
                                    ...input,
                                    passwordResetLink: input.passwordResetLink.replace(
                                        "http://localhost:3000/auth/reset-password",
                                        "http://localhost:3000/app/reset-password"
                                    ),
                                });
                            }
                            return originalImplementation.sendEmail(input);
                        },
                    };
                },
            },
            override: {
                apis: originalImplementation => {
                    return {
                        ...originalImplementation,
                        signUpPOST: async function(input) {
                            if (originalImplementation.signUpPOST === undefined) {
                                throw Error("Should never come here");
                            }
                            // First we call the original implementation of signUpPOST.
                            let response = await originalImplementation.signUpPOST(input);

                            if (response.status === "OK") {


                                /* Saving the user data to the database. */
                                let formFields = input.formFields;
                                let sanitizedUserData = await userSanitizer(formFields);
                                let client = await MongoClient()
                                const database = client.db('databaseName');
                                const users = database.collection('users');
                                await users.insertOne(sanitizedUserData);










                            }
                            return response;
                        },
                    };
                },
            },
        }), // initializes signin / sign up features

        Session.init(), // initializes session features
    ],
});
