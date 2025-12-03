var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//トップページ
router.get("/", async function (req, res, next) {
  const blogs = await prisma.blog.findMany();
  res.render("index", { blogs });
});

//新規投稿
router.post("/", async function (req, res, next) {
  await prisma.blog.create({
    data: {
      title: req.body.title,
      date: req.body.date,
      content: req.body.content,
    },
  });
  res.redirect("/");
});

//検索
router.post("/search", async function (req, res, next) {
  const keyword = req.body.keyword;
  const blogs = await prisma.blog.findMany({
    where: {
      OR: [
        { title: { contains: keyword } },
        { content: { contains: keyword } },
      ],
    },
  });
  res.render("search", { blogs });
});

module.exports = router;
