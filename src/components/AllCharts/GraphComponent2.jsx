import React, { useState, useEffect } from 'react';
import RatingNoteService from '../../axios/RatingNoteAxios';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Container, Box, Grid, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import { FillData7 } from '../../redux/actions/RatingNoteAction';
import { useDispatch, useSelector } from 'react-redux';

const GraphComponent2 = () => {
  const [mydata, setmydata] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state
  const myList = useSelector((state) => state.RatingNoteReducer.RatingNoteList);
  const dispatch = useDispatch();
  const color = useSelector((state) => state.colorReducer.colors);

  useEffect(() => {
    const fetchgraph = async () => {
      if (myList.length > 0) {
        setmydata(myList);
        setLoading(false);  // Set loading to false when data is available
      } else {
        try {
          const response = await RatingNoteService.getAllRatingNote();
          setmydata(response);
          dispatch(FillData7(response));
          setLoading(false);  // Set loading to false after fetching data
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);  // Set loading to false on error as well
        }
      }
    };
    fetchgraph();
  }, [myList, dispatch]);

  const formatData = () => {
    const grouped = mydata.reduce((acc, item) => {
      if (!acc[item.itemId]) {
        acc[item.itemId] = { totalRating: item.rating, count: 1 };
      } else {
        acc[item.itemId].totalRating += item.rating;
        acc[item.itemId].count += 1;
      }
      return acc;
    }, {});

    return Object.keys(grouped).map((key, index) => ({
      name: `ITEM ${key}`,
      value: Number((grouped[key].totalRating / grouped[key].count).toFixed(2)),  // חישוב ממוצע דירוג
      color: color[index % color.length],  // צבע לפי אינדקס
    }));
  };

  const chartData = formatData();

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box boxShadow={3} bgcolor="background.paper" p={3} style={{ height: '400px' }}>
              {loading ? (
                <CircularProgress color="primary" size={60} />  // Show loading spinner
              ) : (
                <ResponsiveContainer width="90%" height="90%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                      animationDuration={1000}  // Add animation duration
                    >
                      {chartData.map((entry, index) => (
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
    </ThemeProvider>
  );
};

export default GraphComponent2;
