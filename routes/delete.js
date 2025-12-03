// routes/delete.js
var express = require("express");
var router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 削除フォームの表示
router.get("/", function (req, res, next) {
  res.render("delete");
});

// フォーム送信後：1件削除
router.post("/", async function (req, res, next) {
  try {
    await prisma.student.delete({
      where: {
        id: Number(req.body.id),
      },
    });

    res.status(204).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting student");
  }
});

// 🔷 達成度確認：全件削除
router.get("/all", async function (req, res, next) {
  try {
    await prisma.student.deleteMany({}); // 全削除
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting all students");
  }
});

module.exports = router;
