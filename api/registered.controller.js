import RegisteredDAO from '../dao/registeredDAO.js';

export default class RegisteredController{

    static async apiUpdateRegistered(req, res, next){
        try {
            const RegisteredResponse = await RegisteredDAO.updateRegistered(
                req.body._id,
                req.body.registered
            )

            var { error } = RegisteredResponse
            if (error){
                res.status(500).json({ error })
            }

            // if (FavoritesResponse.modifiedCount === 0) {
            //     throw new Error ("Unable to update favorites.")
            // }
            res.json({status: "success"});
        } catch (e){
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetRegistered(req, res, next){
        try{
            let id = req.params.userId;
            let registered = await RegisteredDAO.getRegistered(id);
            if (!registered) {
                res.status(404).json({ error: "not found "});
                return;
            }
            res.json(registered);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e})
        }
    }

    // // for getting a single class given its specifc ID value
    // static async apiGetRegisteredById(req, res, next){
    //     try{ 
    //         // request object passes in an ID value which chould match unique ID value for movie
    //         let id = req.params.id || {}
    //         //let a_class = await ClassesDAO.getClassById(id);
    //         let registered = await RegisteredDAO.getRegisteredById(id);
    //         if(!registered){
    //             res.status(404).json({error: "not found" });
    //             return;
    //         }
    //         res.json(registered);
    //     } catch(e) {
    //         console.log(`API, ${e}`);
    //         res.status(501).json({ error: e});
    //     }
    // }

    // static async apiDeleteRegistered(req, res, next){
    //     try { 
    //         const registeredId = req.query.id 
    //         const userId = req.body.user_id //just to make sure that the person deleting the review is the same one who created it  
    //         console.log(registeredId) 
    //         const registeredResponse = await RegisteredDAO.deleteRegistered( 
    //             registeredId, 
    //           userId, 
    //         ) 
    //         res.json({ status: registeredResponse }) 
    //       } catch (e) { 
    //         res.status(500).json({ error: e.message }) 
    //       } 
    // }

}