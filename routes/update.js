// routes/update.js
var express = require("express");
var router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 編集用フォームの表示
router.get("/", function (req, res, next) {
  res.render("update");
});

// フォーム送信後の処理
router.post("/", async function (req, res, next) {
  try {
    await prisma.student.update({
      where: {
        id: Number(req.body.id),
      },
      data: {
        name: req.body.name,
        studentNum: Number(req.body.studentNum),
        grade: Number(req.body.grade),
      },
    });

    res.status(200).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating student");
  }
});

module.exports = router;
