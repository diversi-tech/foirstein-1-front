import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Container, Box, Grid } from '@mui/material';
import userService from '../../axios/userAxios';
import { FillData } from '../../redux/actions/userAction';

const ActivityChart2 = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userReducer.userList || []);
  const [data, setData] = useState([]);
  const color = useSelector((state) => state.colorReducer.colors);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.getAllUsers();
        dispatch(FillData(response.data));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userList.length === 0) {
      fetchData();
    } else {
      setData(formatData(userList));
    }
  }, [dispatch, userList]);

  useEffect(() => {
    setData(formatData(userList));
  }, [userList]);

  const formatData = (data) => {
    const itemCounts = {};
    data.forEach(item => {
      const createdAt = new Date(item.createdAt);
      const month = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}`;
      if (itemCounts[month]) {
        itemCounts[month]++;
      } else {
        itemCounts[month] = 1;
      }
    });

    return Object.keys(itemCounts).map((month, index) => ({
      name: month,
      value: itemCounts[month],
      color: color[index % color.length]  // Use colors based on the index
    }));
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box boxShadow={3} bgcolor="background.paper" p={2} style={{ height: '300px' }}>
            <ResponsiveContainer width="90%" height="90%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ActivityChart2;
