import { useSnippetStore } from "../store/snippetStore";
import { useEffect, useState } from "react";
import { Card, CardContent, Typography, TextField, Chip, Box, Grid, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Snippet } from "../types/Snippet";

const SnippetList = () => {
    const snippets = useSnippetStore((state: { snippets: any[] }) => state.snippets);
    const fetchSnippets = useSnippetStore((state: { fetchSnippets: () => Promise<void> }) => state.fetchSnippets);

    const editSnippet = useSnippetStore(state => state.editSnippet);
    const deleteSnippet = useSnippetStore(state => state.deleteSnippet);

    const [editingId, setEditingId] = useState<string | null>(null);
    const [updatedSnippet, setUpdatedSnippet] = useState({
        name: '',
        code: '',
        languages: '',
        tags: ''
    });

    useEffect(() => {
        fetchSnippets();
    }, []);

    const handleEdit = async (id: string, snippet: Snippet) => {
        setEditingId(id);
        setUpdatedSnippet({
            name: snippet.snippetName,
            code: snippet.code,
            languages: snippet.language,
            tags: snippet.tags.join(" "),
        });
    };

    const handleSave = async () => {
        if (editingId) {
            await editSnippet(editingId, {
                _id: editingId,                      // Ensure the ID is set here
                snippetName: updatedSnippet.name,    // Map to the correct property
                code: updatedSnippet.code,
                language: updatedSnippet.languages,   // Assuming languages is a single string; you might need to convert it
                tags: updatedSnippet.tags.split(" "), // Convert string of tags to an array
            });
            setEditingId(null); // Close the edit form
            setUpdatedSnippet({ name: '', code: '', languages: '', tags: '' }); // Reset form
        }
    };

    // await editSnippet(id, updatedSnippet); // Call editSnippet with both parameters

    const handleDelete = async (id: string) => {
        await deleteSnippet(id); // Call deleteSnippet with ID
    };

    return (
        <Grid margin={2} container spacing={2}>
            {snippets.map((snippet) => (
                <Grid item xs={12} sm={6} md={3} key={snippet._id}>
                    <Card key={snippet._id} sx={{ marginBottom: 2 }}>
                        <CardContent>
                            {editingId === snippet._id ? (
                                //row
                                <Box>
                                    <TextField
                                        label="Snippet Name"
                                        value={updatedSnippet.name}
                                        onChange={(e) => setUpdatedSnippet({ ...updatedSnippet, name: e.target.value })}
                                    />
                                    <br />
                                    <br />
                                    <TextField
                                        label="Code"
                                        value={updatedSnippet.code}
                                        onChange={(e) => setUpdatedSnippet({ ...updatedSnippet, code: e.target.value })}
                                    />
                                    <br />
                                    <br />
                                    <TextField
                                        label="Language"
                                        value={updatedSnippet.languages}
                                        onChange={(e) => setUpdatedSnippet({ ...updatedSnippet, languages: e.target.value })}
                                    />
                                    <br />
                                    <br />
                                    <TextField
                                        label="Tags (space separated)"
                                        value={updatedSnippet.tags}
                                        onChange={(e) => setUpdatedSnippet({ ...updatedSnippet, tags: e.target.value })}
                                    />
                                    <br />
                                    <br />
                                    <Button onClick={handleSave}>Save Changes</Button>
                                </Box>
                            ) : (
                                //col
                                <Box>
                                    {/* Snippet Heading */}
                                    < Typography variant="h5" component="div">
                                        {snippet.snippetName}
                                    </Typography>
                                    {/* Code Display (TextArea) */}
                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={4}
                                        value={snippet.code}
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ marginTop: 2 }}
                                    />

                                    {/* Languages */}
                                    <Box sx={{ marginTop: 2 }}>
                                        <Typography variant="subtitle1">{snippet.language}</Typography>
                                    </Box>

                                    {/* Tags */}
                                    <Box sx={{ marginTop: 2 }}>
                                        <Typography variant="subtitle1">Tags:</Typography>
                                        {snippet.tags.map((tag: string, index: number) => (
                                            <Chip key={index} label={tag} sx={{ marginRight: 1, marginTop: 1 }} />
                                        ))}
                                    </Box>
                                    <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
                                        <IconButton onClick={() => handleEdit(snippet._id, snippet)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(snippet._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

            ))
            }
        </Grid >
    );
};
export default SnippetList;