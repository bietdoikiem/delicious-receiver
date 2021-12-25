"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/health-check', (_req, res) => {
    return res.status(200).json({
        message: `App is running well at port ${process.env.PORT}`,
    });
});
app.post('/', (req, res) => {
    console.log(req.body);
    return res.status(200).send();
});
app.post('/victims', (_req, res) => {
    return res.status(200).send();
});
app.listen(Number(process.env.PORT), () => {
    console.log(`Receiver Application is running at port ${process.env.PORT} in ${process.env.APP_ENV} environment`);
});
//# sourceMappingURL=app.js.map