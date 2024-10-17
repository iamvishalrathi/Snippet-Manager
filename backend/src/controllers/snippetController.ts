import { Request, Response } from "express";
import Snippet from "../models/Snippet";

// Create Snippet
export const createSnippet = async (req: Request, res: Response) => {
    const { snippetName, code, language, tags } = req.body;
    // console.log(tags);
    try {
        const newSnippet = new Snippet({ snippetName, code, language, tags });
        // console.log(newSnippet);
        await newSnippet.save();
        res.status(201).json(newSnippet);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: "Unknown error occurred" });
        }
    }
};

// Get Snippets (with optional filters)
export const getSnippets = async (req: Request, res: Response) => {
    const { snippetName, code, language, tags } = req.query;
    let filters: any = {};

    if (snippetName) filters.snippetName = { $regex: snippetName, $options: "i" };
    if (code) filters.code = { $regex: code, $options: "i" };
    if (language) filters.language = language;
    if (tags) filters.tags = { $in: tags };

    try {
        const snippets = await Snippet.find(filters);
        res.status(200).json(snippets);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: "Unknown error occurred" });
        }
    }
};

// Update Snippet
export const updateSnippet = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { snippetName, code, language, tags } = req.body;
    try {
        const updatedSnippet = await Snippet.findByIdAndUpdate(id, { snippetName, code, language, tags }, { new: true });
        if (!updatedSnippet) {
            return res.status(404).json({ message: "Snippet not found" });
        }
        res.status(200).json(updatedSnippet);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: "Unknown error occurred" });
        }
    }
};

// Delete Snippet
export const deleteSnippet = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedSnippet = await Snippet.findByIdAndDelete(id);
        if (!deletedSnippet) {
            return res.status(404).json({ message: "Snippet not found" });
        }
        res.status(204).send();
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: "Unknown error occurred" });
        }
    }
};