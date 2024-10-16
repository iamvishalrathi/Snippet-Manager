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
exports.deleteSnippet = exports.updateSnippet = exports.getSnippets = exports.createSnippet = void 0;
const Snippet_1 = __importDefault(require("../models/Snippet"));
// Create Snippet
const createSnippet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { snippetName, code, language, tags } = req.body;
    try {
        const newSnippet = new Snippet_1.default({ snippetName, code, language, tags });
        yield newSnippet.save();
        res.status(201).json(newSnippet);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        }
        else {
            res.status(400).json({ message: "Unknown error occurred" });
        }
    }
});
exports.createSnippet = createSnippet;
// Get Snippets (with optional filters)
const getSnippets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, keyword, language, tags } = req.query;
    let filters = {};
    if (name)
        filters.snippetName = { $regex: name, $options: "i" };
    if (keyword)
        filters.code = { $regex: keyword, $options: "i" };
    if (language)
        filters.language = language;
    if (tags)
        filters.tags = { $in: tags };
    try {
        const snippets = yield Snippet_1.default.find(filters);
        res.status(200).json(snippets);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        }
        else {
            res.status(400).json({ message: "Unknown error occurred" });
        }
    }
});
exports.getSnippets = getSnippets;
// Update Snippet
const updateSnippet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { snippetName, code } = req.body;
    try {
        const updatedSnippet = yield Snippet_1.default.findByIdAndUpdate(id, { snippetName, code }, { new: true });
        if (!updatedSnippet) {
            return res.status(404).json({ message: "Snippet not found" });
        }
        res.status(200).json(updatedSnippet);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        }
        else {
            res.status(400).json({ message: "Unknown error occurred" });
        }
    }
});
exports.updateSnippet = updateSnippet;
// Delete Snippet
const deleteSnippet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedSnippet = yield Snippet_1.default.findByIdAndDelete(id);
        if (!deletedSnippet) {
            return res.status(404).json({ message: "Snippet not found" });
        }
        res.status(204).send();
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        }
        else {
            res.status(400).json({ message: "Unknown error occurred" });
        }
    }
});
exports.deleteSnippet = deleteSnippet;
