let variables = {
    Port: process.env.PORT || 3000,
    DbPassword: process.env.DbPassword || "yourDb Password",
    SupertokensConnctionUri: "supertokens uri",
    SuperTokenApiKey: process.env.SuperTokenApiKey || "your api key"
};

export default variables;