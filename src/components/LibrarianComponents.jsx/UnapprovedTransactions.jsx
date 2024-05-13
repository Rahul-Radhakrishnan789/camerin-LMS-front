import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axiosInstance';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import toast, { Toaster } from "react-hot-toast";

const UnapprovedTransactions = () => {
    const [transactions, setTransactions] = useState([]);

    console.log('first',transactions)

   
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/getallunapprovedtransactions');
                setTransactions(response?.data?.data);
                console.log(response)
            } catch (error) {
                console.error('Error fetching unapproved transactions:', error);
            }
        };
        useEffect(() => {
        fetchTransactions();
    }, []);

    const handleApprove = async (transactionId) => {
        try {
            await axios.put(`/approveTransaction/${transactionId}`);
            fetchTransactions();
            
  toast.success("Book Approved Successfully", {
    duration: 5000,
    style: {
      borderRadius: "10px",
      color: "#000",
    },
  });

        } catch (error) {
            console.error('Error approving transaction:', error);
            toast.error(error.response.data.message, {
                duration: 3000,
                style: {
                  borderRadius: "10px",
                  background: "#e24242",
                  color: "#fff",
                },
              });
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Unapproved Transactions
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Student Name</TableCell>
                            <TableCell>Book Name</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction?._id}>
                                <TableCell>{transaction?.studentid?.userFullName}</TableCell>
                                <TableCell>{transaction?.bookid?.title}</TableCell>
                                <TableCell>{transaction?.startDate.slice(0, 10)}</TableCell>
                                <TableCell>{transaction?.endDate.slice(0, 10)}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleApprove(transaction._id)}>
                                        Approve
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Toaster />
        </Box>
    );
};

export default UnapprovedTransactions;

