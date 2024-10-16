import { create } from 'zustand';
import { Snippet } from '../types/Snippet';

interface SnippetStore {
    snippets: Snippet[];
    fetchSnippets: () => Promise<void>;
    createSnippet: (snippet: Snippet) => Promise<void>;
    deleteSnippet: (id: string) => Promise<void>; // Expecting a string ID
    editSnippet: (id: string, updatedSnippet: Snippet) => Promise<void>; // Expecting a string ID and Snippet object
}

export const useSnippetStore = create<SnippetStore>((set) => ({
    snippets: [],
    fetchSnippets: async () => {
        const response = await fetch("http://localhost:5000/api/snippets");
        const snippets: Snippet[] = await response.json();
        set({ snippets });
    },
    createSnippet: async (snippet: Snippet) => {
        console.log(snippet);
        const response = await fetch("http://localhost:5000/api/snippets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(snippet),
        });
        const newSnippet: Snippet = await response.json();
        console.log(newSnippet);
        // set((state) => ({ snippets: [...state.snippets, newSnippet] }));
    },
    deleteSnippet: async (id: string) => {
        try {
            await fetch(`http://localhost:5000/api/snippets/${id}`, {
                method: 'DELETE',
            });
            set((state) => ({
                snippets: state.snippets.filter(snippet => snippet._id !== id),
            }));
        } catch (error) {
            console.error('Error deleting snippet:', error);
        }
    },
    editSnippet: async (id: string, updatedSnippet: Snippet) => {
        try {
            await fetch(`http://localhost:5000/api/snippets/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedSnippet), // Send updated snippet data
            });
            set((state) => ({
                snippets: state.snippets.map(snippet =>
                    snippet._id === id ? updatedSnippet : snippet
                ),
            }));
        } catch (error) {
            console.error('Error editing snippet:', error);
        }
    },
}));