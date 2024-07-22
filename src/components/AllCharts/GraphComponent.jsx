

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Container } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import RatingNoteService from '../../axios/RatingNoteAxios';
import { FillData7 } from '../../redux/actions/RatingNoteAction';

const GraphComponent = () => {
  const [localData, setLocalData] = useState([]);
  const myList = useSelector((state) => state.RatingNoteReducer.RatingNoteList);
  const colors = useSelector((state) => state.colorReducer.colors);
  const dispatch = useDispatch();

  useEffect(() => {
    
    const fetchgraph = async () => {
      if (myList.length > 0) {
        setLocalData(myList);
      }
       else {
        try {
          debugger
          const response = await RatingNoteService.getAllRatingNote();
          setLocalData(response);
          dispatch(FillData7(response));
        } 
        catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchgraph();
  }, [myList, dispatch]);

  const formatData = () => {
    const grouped = {};
    const count = {};

    localData.forEach((item) => {
      if (!grouped[item.itemId]) {
        grouped[item.itemId] = item.rating;
        count[item.itemId] = 1;
      } else {
        grouped[item.itemId] += item.rating;
        count[item.itemId]++;
      }
    });

    Object.keys(grouped).forEach((key) => {
      grouped[key] /= count[key];
    });

    const formatted = Object.keys(grouped).map((key) => ({
      itemId: key,
      averageRating: Number(grouped[key].toFixed(2)),
    }));

    return formatted;
  };

  const chartData = formatData();

  return (
    <Container>
      <ResponsiveContainer width="90%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="itemId" />
          <YAxis 
            domain={[0, 5]} 
            ticks={[1, 2, 3, 4, 5]} 
            // Removed the label prop to hide the label from the side
          />
          <Tooltip
            formatter={(value) => [`ממוצע דירוגים: ${value}`, '']}
            labelFormatter={(label) => `ITEM ${label}`}
          />
          <Legend
            formatter={() => 'ממוצע דירוגים'}
          />
          <Bar dataKey="averageRating">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default GraphComponent;
