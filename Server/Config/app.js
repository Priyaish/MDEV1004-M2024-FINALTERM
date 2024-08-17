"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
let JWTStrategy = passport_jwt_1.default.Strategy;
let ExtractJWT = passport_jwt_1.default.ExtractJwt;
const building_1 = __importDefault(require("../Models/building"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = __importDefault(require("./db"));
mongoose_1.default.connect(db_1.default.remoteURI);
mongoose_1.default.connection.on('connected', () => {
    console.log(`Connected to MongoDB Atlas`);
});
const index_1 = __importDefault(require("../Routes/index"));
const building_2 = __importDefault(require("../Routes/building"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
const memorystore_1 = __importDefault(require("memorystore"));
const MemoryStore = (0, memorystore_1.default)(express_session_1.default);
app.use((0, express_session_1.default)({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({ checkPeriod: 86400000 }),
    secret: db_1.default.secret,
    saveUninitialized: false,
    resave: false
}));
const passport_1 = __importDefault(require("passport"));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
let jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: db_1.default.secret
};
let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const building = yield building_1.default.findById(jwt_payload.id).exec();
        if (building) {
            return done(null, building);
        }
        return done(null, false);
    }
    catch (error) {
        return done(error, null);
    }
}));
passport_1.default.use(strategy);
app.use('/api', index_1.default);
app.use('/api/building', passport_1.default.authenticate('jwt', { session: false }), building_2.default);
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.end('error - please use /api as a route prefix for your API requests');
});
exports.default = app;
//# sourceMappingURL=app.js.map