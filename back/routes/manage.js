const { Router } = require("express");
const router = Router();
const User = require("../models/user")

router.post("/add-to-project", async (req, res) => {
  try {
      const  {userId,projectId,state} = req.body

      if (!userId && !projectId && !state) {
       return res.status(400).json({ error: "invalid data" })
      }

      // const user = await User.findOne({_id:userId, 'projects.projectId':projectId})
      // if(!!user === true){
      //   const userArrState = user.projects.find((found)=> found.projectId === projectId)
      //   console.log(userArrState);
      //   const userState = userArrState.find((find)=> find === state)

      //   if (!!userState === true) {
      //     return res.status(400).json({ error: "invalid data" })
      //    }
      // }

      await User.findOneAndUpdate(
       {_id:userId},
       {$addToSet:{projects: [{projectId,state}]}}
      )

      res.status(200)

  } catch (error) {
      res.status(500).json({ error: "internal server error" })
  }
})

router.delete('/:userId/:projectId',async (req,res)=>{
try {
  const {userId, projectId} = req.params

  if (!userId && !projectId ) {
    return res.status(400).json({ error: "invalid data" })
   }

   const us = await User.updateOne({_id:userId, 'projects.projectId': projectId},{$pull:{projects:{projectId:projectId}}})
console.log(us);

res.status(200)

} catch (error) {
  
}
})

module.exports = router;