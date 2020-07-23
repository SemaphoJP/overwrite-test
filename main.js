const express = require("express"),
    app = express();

const helmet = require("helmet");
app.use(helmet());
app.use(helmet.xssFilter());
const cookieParser = require("cookie-parser");
app.use(helmet.frameguard({ action : "sameorigin" }));

var bodyParser = require('body-parser');

//bosy-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("port", process.env.PORT || 3000);

//express-ejs-layoutモジュールをロード
const layouts = require("express-ejs-layouts");

let fs = require("fs");

//ejsの使用をアプリケーションに設定
app.set("view engine", "ejs");
//レイアウトモジュールの使用をアプリケーションに設定
app.use(layouts);

//コントローラーをロード
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const { json } = require("express");

//以下、ルーティング。Overwriteによるテンプレート取り扱い含む。
//理由: 様々なモジュールを読み込む必要があったため、main.js内に記述

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/index", homeController.showIndex);

app.get("/about", homeController.showAbout);

app.get("/overwrite", homeController.showOverwrite);

app.get("/roadmap", homeController.showRoadmap);

app.get("/template", (req, res) => {
    let tempExa = JSON.parse(fs.readFileSync("./textTemplate.json", "utf-8"));
    
    let tempID = req.query.name;
    
    let jsonText = tempExa[tempID];
    console.log(jsonText);

    return res.render("template", {
        title : jsonText["title"],
        type : jsonText["type"],
        textTemp : jsonText["text"]
    });
});


app.listen(app.get("port"), () => {
    console.log(`Server is running at http://localhost:${app.get("port")}`
    );
});


//jsonファイル使用のため
app.use(express.json());

//publicにある、静的ファイル使用のため
app.use("/public", express.static("public"));
app.use("/public/images", express.static("images"));

app.use(express.urlencoded({
    extended: false
    })
);

app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);
app.use(errorController.PageNotFoundError);
app.use(errorController.internalServerError);
