const router = require("express").Router();
const Celebrity = require("../models/Celebrity");

router.get("/celebrities", (req, res, next) => {
  console.log("I am celebrity!");
  Celebrity.find()
    .then((celebrities) => {
      console.log(celebrities);
      res.render("celebrities/index", { celebrities });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/celebrities/new", (req, res, next) => {
  res.render("celebrities/new");
});

router.get("/celebrities/:id", (req, res, next) => {
  console.log(req.params.id);
  const celebrityId = req.params.id;

  Celebrity.findById(celebrityId)
    .then((celebrity) => {
      console.log(celebrity);
      res.render("celebrities/show", { celebrity });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/celebrities", (req, res) => {
  console.log(req.body);
  let { name, occupation, catchPhrase } = req.body;

  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })
    .then((celebrity) => {
      console.log(`This celebrity was just created ${celebrity.name}`);
      res.redirect("/celebrities");
    })

    .catch((err) => {
      res.redirect("/celebrities/new");
    });
});



router.post("/celebrities/:id/delete", (req, res, next) => {
  
  const celebrityId= req.params.id;

  Celebrity.findByIdAndRemove(celebrityId)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
