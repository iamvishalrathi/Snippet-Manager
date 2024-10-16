"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const snippetController_1 = require("../controllers/snippetController");
const router = express_1.default.Router();
// CRUD routes
router.post("/snippets", snippetController_1.createSnippet);
router.get("/snippets", snippetController_1.getSnippets);
router.put("/snippets/:id", snippetController_1.updateSnippet);
router.delete("/snippets/:id", snippetController_1.deleteSnippet);
exports.default = router;
