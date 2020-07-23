exports.logError = (error, req, res, next) => {
    console.error(error.stack); //エラースタックをログ出力
    next(error); //errorを次のミドルウェア関数に渡す
}

const httpStatus = require("http-status-codes");

//404でレスポンス
exports.respondNoResourceFound = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.send(`${errorCode} | お探しのページは見つかりませんでした。 `);
};

//全てのエラーをキャッチして、ステータスコード500でレスポンス
exports.respondInternalError = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${error.atack}`);
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};

exports.PageNotFoundError = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.render("error");
};

exports.internalServerError = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${error.stack}`);
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is taking a nap!`);
}