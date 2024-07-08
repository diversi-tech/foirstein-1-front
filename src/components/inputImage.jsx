import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import {Typography} from '@mui/material'
const UploadImage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [preview, setPreview] = useState('');
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        setFileName(file.name);
        setPreview(URL.createObjectURL(file));
    }, []);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setFileName(file.name);
        setPreview(URL.createObjectURL(file));
    };
    const handleSubmit = async () => {
        debugger
        if (!selectedFile) {
            alert('לא נבחר קובץ');
            return;
        }
        const formData = new FormData();
        formData.append('userId',15);
        formData.append('PictureUrl', selectedFile);
        try {
            debugger
            const response = await axios.post('http://localhost:5211/api/Users/updatePic', formData);
            console.log(response.data);
            alert('התמונה עודכנה בהצלחה');
        } catch (error) {
            console.error('Error uploading the image:', error);
            alert('שגיאה בעדכון התמונה');
        }
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    return (
        <Box sx={{ textAlign: 'right', p: 2, direction: 'rtl' }}>
            <Typography variant="h4" mb={2}>עדכון תמונת פרופיל</Typography>
            <div {...getRootProps()} style={{ border: '2px dashed #007BFF', padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
                <input {...getInputProps()} />
                <Typography>גרור ושחרר תמונה כאן, או לחץ לבחירת תמונה</Typography>
            </div>
            <Box my={2}>
                <input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        העלאת תמונה
                    </Button>
                </label>
            </Box>
            {fileName && (
                <Box my={2}>
                    <TextField
                        label="שם הקובץ"
                        variant="outlined"
                        fullWidth
                        value={fileName}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
            )}
            {preview && (
                <Box my={2}>
                    <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '300px' }} />
                </Box>
            )}
            <Button variant="contained" color="secondary" onClick={handleSubmit}>
                אישור
            </Button>
        </Box>
    );
};
export default UploadImage;