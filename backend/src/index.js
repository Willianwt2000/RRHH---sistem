"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var data_1 = require("./data/data");
var jsonwebtoken_1 = require("jsonwebtoken");
var js_sha512_1 = require("js-sha512");
var cors_1 = require("cors");
var port = 8000;
var app = (0, express_1.default)();
app.use((0, cors_1.default)()); // Permite solicitudes desde el frontend
app.use(express_1.default.json());
var appRouter = express_1.default.Router({});
app.use("/account/login/", appRouter); //Router
app.listen(port, function () {
    console.log("Server listening at port http://localhost:".concat(port));
});
var saveToken = function (token) {
    data_1.listOfTokens.push({
        tokenId: data_1.listOfTokens.length + 1,
        userId: token.userId,
        token: token.token,
        creationDate: Date.now().toString(),
        expiresIn: "",
        active: true,
    });
};
var genToken = function (userdata) {
    var tokenJWT = jsonwebtoken_1.default.sign({
        userid: userdata.id,
        username: userdata.username,
        password: userdata.password,
    }, "SECRET_KEY", { expiresIn: "1d" });
    var token = {
        userId: userdata.id,
        token: tokenJWT,
    };
    return token;
};
// const saveCookie = (token: Token) => {};
appRouter.post("/", function (req, res) {
    try {
        var username_1 = String(req.body.username);
        var password = String(req.body.password);
        console.log(password);
        console.log(username_1);
        if (!username_1) {
            res.status(400).json({
                success: false,
                message: "Username is required.",
            });
            return;
        }
        if (!password) {
            res.status(400).json({
                success: false,
                message: "Password is required.",
            });
            return;
        }
        var user = data_1.listOfAccount.find(function (user) { return user.username === username_1; });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User: ".concat(username_1, " not found!"),
            });
            return;
        }
        if (!user.active) {
            res.status(404).json({
                success: false,
                message: "Please, contact with the IT manager.",
            });
            return;
        }
        if (user.password !== password) {
            res.status(401).json({
                success: false,
                message: "Credentials incorrect.",
            });
            return;
        }
        var hashedPassword = (0, js_sha512_1.sha512)(password);
        var token = genToken({
            id: user.id,
            username: username_1,
            password: hashedPassword,
        });
        saveToken(token);
        //   saveCookie(token);
        //Cookie
        //   const setCookie = (name: string, value: string, expired: number) => {
        //     let newDate = new Date();
        //     newDate.setTime(newDate.getTime() + (expired*24*60*60*1000));
        //     const caducidad = `Caducidad = ${newDate.toUTCString()}`
        //     document.cookie = `${name} + "=" ,${value} + "=", ${caducidad}`
        //   }
        //   const getCookie = () => {
        //   console.log( document.cookie)
        //   }
        //   getCookie()
        //clear session
        //   const sessionData = () => {
        //     let sessionData = sessionStorage;
        //     sessionData.clear();
        //     sessionData.setItem("username", user.username);
        //     sessionData.setItem("name", user.name);
        //     sessionData.setItem("token", token.token);
        //   };
        //   sessionData();
        res.status(200).json({
            success: true,
            message: "Access Granted!",
            token: token.token
        });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
    ;
});
