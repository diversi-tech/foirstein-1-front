import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Container, Box, Grid } from '@mui/material';
import { FillLog } from '../../redux/actions/ActivityLogAction'; // ייבוא הפעולה החדשה
import ActivityLogService from '../../axios/ActivityLogAxios';

const UsageChart2 = () => {
  const [chartData, setChartData] = useState([]);
  const dispatch = useDispatch();
  const activityData = useSelector(state => state.activityLogReducer.activityLogList);
  const userData = useSelector(state => state.userReducer.userList);
  const color = useSelector((state) => state.colorReducer.colors);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const activityResponse = await ActivityLogService.getAllActivityLog();
        dispatch(FillLog(activityResponse));
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    };

    if (activityData.length === 0) {
      fetchActivityData();
    }
  }, [dispatch, activityData.length]);

  useEffect(() => {
    if (activityData.length > 0 && userData.length > 0) {
      processData();
    }
  }, [activityData, userData]);

  const processData = () => {
    const usersRowCount = {};
    activityData.forEach(entry => {
      const { userId } = entry;
      if (!usersRowCount[userId]) {
        usersRowCount[userId] = 0;
      }
      usersRowCount[userId]++;
    });

    const formattedData = Object.keys(usersRowCount).map((userId, index) => {
      const user = userData.find(u => u.userId === userId);
      const username = user ? `${user.firstName} ${user.lastName}` : `User ${userId}`;
      return {
        name: username,
        value: usersRowCount[userId],
        color: color[index % color.length]  // צבע לפי אינדקס
      };
    });

    setChartData(formattedData);
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box boxShadow={3} bgcolor="background.paper" p={3} style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.map((entry, index) => (
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

export default UsageChart2;
