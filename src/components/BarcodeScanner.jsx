import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BarcodeScanner = ({ setItem }) => {
    console.log('🤣🤣BarcodeScanner component loaded');

    const [barcode, setBarcode] = useState('');
    const [scanning, setScanning] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (event) => {
 
            if (event.key === 'Enter') {
                if (barcode) {
                    fetchProductData(barcode);
                    setBarcode('');
                }
                setScanning(false);
            } else {
                if (!scanning) {
                    setBarcode('');
                    setScanning(true);
                }
                setBarcode((prevBarcode) => prevBarcode + event.key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [barcode, scanning]);

    const fetchProductData = async (barcode) => {
        try {
            const response = await axios.get(`https://foirstein-2-back-lifb.onrender.com/api/BorrowRequest/getItemById/${barcode}`);
            const productData = response.data;
            setItem(productData);
            navigate('/borrow');
        } catch (error) {
            console.error('Error fetching product data: ', error);
        }
    };

    return null;
};

export default BarcodeScanner;
