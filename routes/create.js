// routes/create.js
var express = require("express");
var router = express.Router();

const { PrismaClient } = require("@prisma/client"); // 前回と同じ呼び方
const prisma = new PrismaClient();

// 新規作成フォームの表示
router.get("/", function (req, res, next) {
  res.render("create");
});

// フォーム送信後の処理
router.post("/", async function (req, res, next) {
  try {
    await prisma.student.create({
      data: {
        id: Number(req.body.id), // IDを自分で入力するスタイルなら残す
        name: req.body.name,
        studentNum: Number(req.body.studentNum),
        grade: Number(req.body.grade),
      },
    });
    // 作成できたら一覧ページへ戻る
    res.status(201).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating student");
  }
});

module.exports = router;
