const { Router } = require("express");
const router = Router();
const User = require("../models/user")
const Project = require("../models/project")

router.post("/add-to-project", async (req, res) => {
  try {
      const  {userId,projectId,state} = req.body

      if (!userId && !projectId && !state) {
       return res.status(400).json({ error: "invalid data" })
      }

      const userData = await User.findOne({_id:userId, 'projects.projectId':projectId})

      if(userData){
        const userArrState = userData.projects.find(({projectId}) => projectId === projectId)
        
        if (userArrState.projectId) {
          return res.status(400).json({ error: "invalid data" })
         }
      }

    const updateUser = await User.findOneAndUpdate(
       {_id:userId},
       {$addToSet:{projects: [{projectId,state}],notification:[{projectId,text:'notification-1'}]}},
       {new:true}
      )

      res.status(200).json(updateUser)

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

   const projectName = await Project.findOne({_id:projectId})
   
   const updateUser = await User.findOneAndUpdate(
      {_id:userId, 'projects.projectId': projectId},
      {$pull:{projects:{projectId:projectId}},
      $addToSet:{notification:[{projectId,text:'notification-2',projectName: projectName.title }]}},
      {new:true}
    )

res.status(200).json(updateUser._id)

} catch (error) {
  
}
})

module.exports = router;