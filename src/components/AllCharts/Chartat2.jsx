import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Container, Box, Grid, CircularProgress } from '@mui/material';
import approvalService from '../../axios/approvalRequestAxios';
import { FillData3 } from '../../redux/actions/ApprovalRequestAction';

const Chartat2 = () => {
  const dispatch = useDispatch();
  const approvalList = useSelector((state) => state.approvalRequestReducer.ApprovalList);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state
  const color = useSelector((state) => state.colorReducer.colors);

  useEffect(() => {
    const fetchData = async () => {
      try {
        debugger
        const response = await approvalService.getAllApprovals();
        dispatch(FillData3(response));
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);  // Set loading to false on error as well
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (approvalList.length > 0) {
      const itemCounts = {};
      approvalList.forEach(item => {
        if (item.itemId in itemCounts) {
          itemCounts[item.itemId]++;
        } else {
          itemCounts[item.itemId] = 1;
        }
      });

      // Update data with colors based on index
      const chartData = Object.keys(itemCounts).map((itemId, index) => ({
        name: `ITEM ${itemId}`,
        value: itemCounts[itemId],
        color: color[index % color.length]  // Correctly use color based on index
      }));

      setData(chartData);
    }
  }, [approvalList, color]);

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box boxShadow={3} bgcolor="background.paper" p={2} style={{ height: '400px' }}>
            {loading ? (
              <CircularProgress color="primary" size={60} />  // Show loading spinner
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                    animationDuration={1000}  // Add animation duration
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chartat2;
