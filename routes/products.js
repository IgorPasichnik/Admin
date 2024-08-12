const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { all, add, remove, edit, product } = require("../controllers/products");

router.get("/", auth, all);
router.get("/:id", auth, product);
router.post("/add", auth, add);
router.delete("/remove/:id", auth, remove);
router.put("/edit/:id", auth, edit);

module.exports = router;
