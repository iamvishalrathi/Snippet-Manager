import { useSnippetStore } from "../store/snippetStore";
import { useEffect, useState } from "react";
import { Card, CardContent, Typography, TextField, Chip, Box, Grid, IconButton, Button, Checkbox, FormControlLabel } from '@mui/material';
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

    const [selectedSnippets, setSelectedSnippets] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectAll, setSelectAll] = useState(false);  // State for "Select All"

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

    const handleCheckboxChange = (id: string) => {
        setSelectedSnippets(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(item => item !== id)
                : [...prevSelected, id]
        );
    };

    const handleDeleteSelected = async () => {
        for (const id of selectedSnippets) {
            await deleteSnippet(id);
        }
        setSelectedSnippets([]);
        fetchSnippets();
    };

    // Handle select all/deselect all
    const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setSelectAll(checked);
        if (checked) {
            const allIds = snippets.map(snippet => snippet._id);
            setSelectedSnippets(allIds);
        } else {
            setSelectedSnippets([]);
        }
    };

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query) {
            const response = await fetch(`http://localhost:5000/api/snippets?snippetName=${query}`);
            if (response.ok) {
                const data = await response.json();
                useSnippetStore.getState().setSnippets(data);
            } else {
                console.error("Error fetching snippets");
            }
        } else {
            fetchSnippets();
        }
    };

    return (
        <Box margin={2}>
            {/* Search Bar with Select All Checkbox */}
            <Grid container spacing={20} justifyContent="center" alignItems="center" sx={{ marginBottom: 3 }}>
                <Grid item>
                    <TextField
                        label="Search Snippets"
                        value={searchQuery}
                        onChange={handleSearch}
                        variant="outlined"
                        sx={{ width: '300px' }}
                        InputProps={{
                            style: {
                                borderRadius: '10px',
                            },
                        }}
                    />
                </Grid>
                <Grid item sx={{ marginLeft: 2 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectAll}
                                onChange={handleSelectAllChange}
                                color="primary"
                            />
                        }
                        label="Select All"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={1.5}>
                {snippets.map((snippet) => (
                    <Grid item xs={12} sm={6} md={3} key={snippet._id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', marginBottom: 2, position: 'relative' }}>
                            {/* Checkbox for selecting snippets, moved to top right */}
                            <Box sx={{ position: 'absolute', top: 5, right: 5 }}>
                                <Checkbox
                                    checked={selectedSnippets.includes(snippet._id)}
                                    onChange={() => handleCheckboxChange(snippet._id)}
                                    color="primary"
                                />
                            </Box>
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
                                                backgroundColor: '#1e1e1e',
                                                color: '#c5c5c5',
                                                padding: 1,
                                                borderRadius: 1,
                                                maxHeight: 120,
                                                overflowY: 'auto',
                                                marginTop: 2,
                                                fontFamily: 'monospace',
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
                                                    style: {
                                                        color: '#c5c5c5',
                                                    },
                                                }}
                                                sx={{
                                                    backgroundColor: 'transparent',
                                                    '& .MuiOutlinedInput-root': { border: 'none' }
                                                }}
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

            {/* Delete Selected Button */}
            {selectedSnippets.length > 0 && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 100,
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDeleteSelected}
                    >
                        Delete Selected Snippets
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default SnippetList;
