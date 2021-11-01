const { Router } = require("express");
const router = Router();
const Column = require("../models/dashboard-column")
const Task = require("../models/dashboard-task")
const Project = require("../models/project")
const User = require("../models/user")
const auth = require("../middleware/auth.middleware");

router.get("/:id", auth, async (req, res) => {
   try {
      const { id } = req.params

      if (!id) {
         return res.status(400).json({ error: "invalid data" })
      }

      const user = await User.findOne({_id:id})

      const projectsId = user.projects.map((data)=>{
        return data.projectId
      })

      const projects = await Project.find({ _id: projectsId})
      
      res.status(200).json(projects)

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})


router.post("/", auth, async (req, res) => {
   try {
      const { title, content, idUser,userEmail } = req.body

      if (!title && !content && !idUser && !userEmail) {
         return res.status(400).json({ error: "invalid input" })
      }

      const project = new Project({
        title,
        content,
        userOwner: idUser,
        userEmail: userEmail,
      })
      
      const pro =  await project.save()
      const projectId = pro._id

      await User.findOneAndUpdate(
        {_id:idUser},
        {$addToSet:{projects: [{projectId,state:'owner'}]}}
      )
   
      res.status(201).json(pro)
      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.patch("/title", auth, async (req, res) => {
   try {
      const { title, id } = req.body

      if (!title) {
         return res.status(400).json({ error: "invalid input" })
      }

      const changedProject = await Project.findOneAndUpdate(
         { _id: id },
         { $set: { title } },
         { new: true }
      )

      res.status(200).json(changedProject)
      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

router.patch("/content", auth, async (req, res) => {
   try {
      const { content, id } = req.body

      if (!content) {
         return res.status(400).json({ error: "invalid input" })
      }

      const changedProject = await Project.findOneAndUpdate(
         { _id: id },
         { $set: { content } },
         { new: true }
      )

      res.status(200).json(changedProject)
      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

// router.patch("/position", async (req, res) => {
//    try {
//       const { result } = req.body
//       if (!result.destination) return;

//       const [reorderedItem] = projects.splice(result.source.index, 1);
//       projects.splice(result.destination.index, 0, reorderedItem);

//       res.status(200).json(projects)

//       return
//    } catch (error) {
//       res.status(500).json({ error: "internal server error" })
//    }
// })

router.delete("/:id", auth, async (req, res) => {
   try {
      const { id} = req.params
      
      if (!id) {
         return res.status(400).json({ error: "invalid input" })
      }

      await User.updateMany({'projects.projectId': id},{$pull:{projects:{projectId:id}}})
      await Column.deleteMany({ projectOwner: id })
      await Task.deleteMany({ projectOwner: id })

      const deletedProject = await Project.findOneAndDelete(
         { _id: id }
      )

      res.status(200).json(deletedProject)
      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})




module.exports = router;