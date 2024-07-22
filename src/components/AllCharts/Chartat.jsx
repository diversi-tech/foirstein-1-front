import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import approvalService from '../../axios/approvalRequestAxios';
import { FillData3 } from '../../redux/actions/ApprovalRequestAction';

const Chartat = () => {
  const aList = useSelector((state) => state.approvalRequestReducer.ApprovalList) || []; // הגדרת ברירת מחדל במקרה של undefined
  const dispatch = useDispatch();
  const color = useSelector((state) => state.colorReducer.colors);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (aList.length === 0) {
      const fetchData = async () => {
        try {
          const data1 = await approvalService.getAllApprovals();
          dispatch(FillData3(data1)); 
          setData(data1);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchData();
    }
  }, [dispatch, aList]);

  useEffect(() => {
    if (aList.length > 0) {
      const itemCounts = {};
      let colorIndex = 0;

      aList.forEach(item => {
        if (item.itemId in itemCounts) {
          itemCounts[item.itemId].count++;
        } else {
          itemCounts[item.itemId] = { count: 1, fill: color[colorIndex % color.length] };
          colorIndex++;
        }
      });

      const chartData = Object.keys(itemCounts).map(itemId => ({
        itemId: itemId,
        count: itemCounts[itemId].count,
        fill: itemCounts[itemId].fill
      }));

      setData(chartData);
    }
  }, [aList]);

  // Filter out non-integer values for YAxis ticks
  const integerTicks = data.map(entry => entry.count).filter(count => Number.isInteger(count));

  return (
    <ResponsiveContainer width="90%" height={300} margin="150%">
      <BarChart data={data} margin={{  right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="itemId" />
        <YAxis tickCount={integerTicks.length > 5 ? 5 : integerTicks.length} />
        <Tooltip
          content={({ payload }) => {
            if (payload.length === 0) return null;
            const { value } = payload[0];
            return (
              <div className="custom-tooltip">
                <p>כמות: <b>{value}</b></p>
              </div>
            );
          }}
        />
        <Legend
          formatter={() => 'כמות'}
        />
        <Bar dataKey="count">
          {data.map((entry, index) => (
            <Bar key={`bar-${index}`} dataKey="count" fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chartat;
