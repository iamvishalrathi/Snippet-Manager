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

    const [searchQuery, setSearchQuery] = useState('');

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
                _id: editingId,
                snippetName: updatedSnippet.name,
                code: updatedSnippet.code,
                language: updatedSnippet.languages,
                tags: updatedSnippet.tags.split(" "),
            });
            setEditingId(null);
            setUpdatedSnippet({ name: '', code: '', languages: '', tags: '' });
        }
    };

    const handleDelete = async (id: string) => {
        await deleteSnippet(id);
    };

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        // Call backend search if query is not empty
        if (query) {
            const response = await fetch(`http://localhost:5000/api/snippets?snippetName=${query}`);
            if (response.ok) {
                const data = await response.json();
                // Update your snippets state in store with filtered results

                useSnippetStore.getState().setSnippets(data);
            } else {
                // Handle error case
                console.error("Error fetching snippets");
            }
        } else {
            // If query is empty, fetch all snippets
            fetchSnippets();
        }
    };

    return (
        <Box margin={2}>
            {/* Search Bar */}
            <Grid container justifyContent="center" sx={{ marginBottom: 3 }}>
                <Grid item>
                    <TextField
                        label="Search Snippets"
                        // value={searchQuery} 
                        // onChange={handleSearch}
                        variant="outlined"
                        sx={{
                            width: '300px', // Set a fixed width
                        }}
                        InputProps={{
                            style: {
                                borderRadius: '10px', // Ensure rounded edges on the input
                            },
                        }}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={1.5}>
                {snippets.map((snippet) => (
                    <Grid item xs={12} sm={6} md={3} key={snippet._id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                {editingId === snippet._id ? (
                                    <Box>
                                        <TextField
                                            label="Snippet Name"
                                            value={updatedSnippet.name}
                                            onChange={(e) => setUpdatedSnippet({ ...updatedSnippet, name: e.target.value })}
                                            fullWidth
                                        />
                                        <br /><br />
                                        <TextField
                                            label="Code"
                                            value={updatedSnippet.code}
                                            onChange={(e) => setUpdatedSnippet({ ...updatedSnippet, code: e.target.value })}
                                            fullWidth
                                            multiline
                                            rows={4}
                                        />
                                        <br /><br />
                                        <TextField
                                            label="Language"
                                            value={updatedSnippet.languages}
                                            onChange={(e) => setUpdatedSnippet({ ...updatedSnippet, languages: e.target.value })}
                                            fullWidth
                                        />
                                        <br /><br />
                                        <TextField
                                            label="Tags (space separated)"
                                            value={updatedSnippet.tags}
                                            onChange={(e) => setUpdatedSnippet({ ...updatedSnippet, tags: e.target.value })}
                                            fullWidth
                                        />
                                        <br /><br />
                                        <Button onClick={handleSave} variant="contained" color="primary">Save Changes</Button>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Typography variant="h5" component="div">
                                            {snippet.snippetName}
                                        </Typography>
                                        <Box
                                            sx={{
                                                backgroundColor: '#f0f0f0',
                                                padding: 1,
                                                borderRadius: 1,
                                                maxHeight: 120,
                                                overflowY: 'auto',
                                                marginTop: 2
                                            }}
                                        >
                                            <TextField
                                                fullWidth
                                                multiline
                                                minRows={4}
                                                value={snippet.code}
                                                variant="outlined"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                sx={{ backgroundColor: 'transparent', '& .MuiOutlinedInput-root': { border: 'none' } }}
                                            />
                                        </Box>
                                        <Box sx={{ marginTop: 2 }}>
                                            <Typography variant="subtitle1">{snippet.language}</Typography>
                                        </Box>
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
                ))}
            </Grid>
        </Box>
    );
};

export default SnippetList;
