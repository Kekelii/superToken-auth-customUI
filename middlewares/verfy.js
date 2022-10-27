/* eslint-disable no-unreachable */
import Session from "supertokens-node/recipe/session/index.js";


export default async(req, res, next) => {
    //both scenarios check and redirect clint
    try {
        let session = await Session.getSession(req, res);

        if (session == undefined) {

            res.redirect('/app/signin')

        }
    } catch (err) {
        let Error = err.toString()
        res.redirect('/app/signin')
        next(Error)


    }


    // console.log(session)
    next()

}