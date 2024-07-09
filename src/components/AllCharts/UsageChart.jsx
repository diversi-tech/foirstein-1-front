import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FillLog } from '../../redux/actions/ActivityLogAction'; // ייבוא הפעולה החדשה
import ActivityLogService from '../../axios/ActivityLogAxios';

// סטטיסטיקת שימוש באתר
const UsageChart = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const List = useSelector(state => state.activityLogReducer.activityLogList); // קבלת הנתונים מה-Redux
  const dispatch = useDispatch();
  const color = useSelector((state) => state.colorReducer.colors);

  // פונקציה לשליפת נתונים
  const fetchData = async () => {
    try {
      debugger
      const myData = await ActivityLogService.getAllActivityLog(); // קריאה לשירות החדש
      setData(myData);
      destroyChart();
      dispatch(FillLog(myData)); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (List.length > 0) {
      setData(List);
    } else {
      fetchData();
    }
  }, [List]);

  const destroyChart = () => {
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }
  };

  // פונקציה ליצירת צבע אקראי
  const getRandomColor = (index) => {
    return color[index % color.length];
  };

  // עיבוד הנתונים לפורמט שנתמך ע"י recharts
  const usersRowCount = {};

  data.forEach(entry => {
    const { userId1 } = entry;
    if (!usersRowCount[userId1]) {
      usersRowCount[userId1] = 0;
    }
    usersRowCount[userId1]++;
  });

  // המרת הנתונים לפורמט המתאים ל- recharts
  const chartData = Object.keys(usersRowCount).map((userId1, index) => ({
    userId: userId1,
    כמות: usersRowCount[userId1],
    color: getRandomColor(index) // צבע אקראי לכל userId
  }));

  // החזרת הקומפוננטה עם הגרף
  return (
    <ResponsiveContainer width="90%" height={300}>
    <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="userId" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="כמות" stackId="a">
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UsageChart;
