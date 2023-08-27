import express from "express";

const router = express.Router();

router.get('/', function (req, res) {
  res.end("Hello World!")
});
router.get('/error', function (req, res) {
  throw new Error('error test')
});

export default router