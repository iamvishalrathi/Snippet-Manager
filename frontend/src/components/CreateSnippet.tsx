import { useState } from "react";
import { useSnippetStore } from "../store/snippetStore";
import { TextField, Button, Box, Typography, Snackbar, Alert, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const CreateSnippet = () => {
    const createSnippet = useSnippetStore((state: { createSnippet: (snippet: any) => Promise<void> }) => state.createSnippet);
    const [snippetName, setSnippetName] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [language, setLanguage] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async () => {
        // Basic validation
        if (!snippetName || !code || !language) {
            setError("Please fill in all required fields.");
            return;
        }

        const tagsArray = tags.split(" ").filter(tag => tag); // Split by spaces and filter empty tags
        try {
            await createSnippet({ snippetName, code, language, tags: tagsArray });
            setSuccess(true);
            // Clear the form
            setSnippetName("");
            setCode("");
            setLanguage("");
            setTags("");
        } catch (err) {
            setError("Failed to create snippet.");
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3, border: "1px solid #ccc", borderRadius: "8px", boxShadow: "2px 2px 12px rgba(0, 0, 0, 0.1)" }}>
            <Typography variant="h5" component="h2" gutterBottom>Create a New Snippet</Typography>
            <TextField
                label="Snippet Name"
                value={snippetName}
                onChange={(e) => setSnippetName(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                multiline
                rows={4}
                fullWidth
                margin="normal"
                required
            />
            <FormControl fullWidth margin="normal" required>
                <InputLabel id="language-select-label">Language</InputLabel>
                <Select
                    labelId="language-select-label"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    label="Language"
                >
                    <MenuItem value="JavaScript">JavaScript</MenuItem>
                    <MenuItem value="Python">Python</MenuItem>
                    <MenuItem value="Java">Java</MenuItem>
                    <MenuItem value="C++">C++</MenuItem>
                    <MenuItem value="Ruby">Ruby</MenuItem>
                    <MenuItem value="Go">Go</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Tags (space-separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                fullWidth
            >
                Create Snippet
            </Button>

            {/* Snackbar for error/success messages */}
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
                <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
                <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    Snippet created successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CreateSnippet;
