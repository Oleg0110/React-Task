const { Router } = require("express");
const router = Router();

router.get("/:lang", async (req, res) => {
   try {
      const { lang } = req.params
      if (!lang) {
         return res.status(400).json({ error: "invalid data" })
      }



      res.status(200).json(require(`../translations/${lang}.json`))
      return

   } catch (error) {
      res.status(500).json({ error: "internal server error" })
   }
})

module.exports = router;