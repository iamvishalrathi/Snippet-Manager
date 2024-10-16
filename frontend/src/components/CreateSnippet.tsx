import { useState } from "react";
import { useSnippetStore } from "../store/snippetStore";
import { TextField, Button, Box } from "@mui/material";
import { Snippet } from "../types/Snippet";

const CreateSnippet = () => {
    const createSnippet = useSnippetStore((state: { createSnippet: (snippet: any) => Promise<void> }) => state.createSnippet);
    const [snippetName, setSnippetName] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [language, setLanguage] = useState<string>("");
    const [tags, setTags] = useState<string>("");

    const handleSubmit = async () => {
        const tagsArray = tags.split(" "); // Split by spaces
        console.log(tagsArray); // Output: ["tag1", "tag2", "tag3"]
        let x = await createSnippet({ snippetName, code, language, tags: tagsArray});
        // console.log(x);
    };

    return (
        <Box>
            <TextField label="Snippet Name" value={snippetName} onChange={(e) => setSnippetName(e.target.value)} />
            <TextField label="Code" value={code} onChange={(e) => setCode(e.target.value)} multiline rows={4} />
            <TextField label="Language" value={language} onChange={(e) => setLanguage(e.target.value)} />
            <TextField label="Tags" value={tags} onChange={(e) => setTags(e.target.value)} />
            <Button onClick={handleSubmit}>Create Snippet</Button>
        </Box>
    );
};

export default CreateSnippet;