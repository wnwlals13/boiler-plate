//백엔드 시작점
const express = require("express");
const app = express();
const port = 5000;

const config = require("./config/dev");

const { User } = require("./models/User");

const bodyParser = require("body-parser");
//application/x-ww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!~~~!!!!");
});

app.post("/register", (req, res) => {
  // 회원가입 정보를 client에서 가져와 데이터베이스에 넣는다.
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
