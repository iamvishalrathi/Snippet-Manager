import express from "express";
import { createSnippet, getSnippets, updateSnippet, deleteSnippet } from "../controllers/snippetController";

const router = express.Router();

// CRUD routes
router.post("/snippets", createSnippet);
router.get("/snippets", getSnippets);
router.put("/snippets/:id", updateSnippet);
router.delete("/snippets/:id", deleteSnippet);

export default router;