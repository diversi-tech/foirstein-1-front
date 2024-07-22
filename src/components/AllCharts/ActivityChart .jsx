// imp        );
//             }}
//           />
//           <Legend
//             formatter={() => 'כמות'}
//           />
//           <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ActivityChart;ort React, { useEffect, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useSelector, useDispatch } from 'react-redux';
// import { FillData } from '../../redux/actions/userAction';
// import userService from '../../axios/userAxios';

// const ActivityChart = () => {
//   const dispatch = useDispatch();
//   const [list,setList]=useState([])
//   const userList = useSelector((state) => state.userReducer.userList)  // הגדרת ברירת מחדל במקרה של undefined

//   useEffect(() => {
//     const fetchData = async () => {
//       debugger
//     if (userList.length == 0) { 
//         try {
//           const data1 = await userService.getAllUsers();
//           setList(data1);
//           dispatch(FillData(list)); // ודא שאתה שולח את הנתונים הנכונים כאן
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         }
//       }
//     else{
//       setList(userList);
//     }
//   };
//   fetchData();
//   }, [dispatch, userList]);

//   const processData = () => {
//     const months = {};
//     list.forEach((user) => {
//       const createdAt = new Date(user.createdAt);
//       const month = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}`;
//       if (months[month]) {
//         months[month].count++;
//         months[month].users.push(user.username);
//       } else {
//         months[month] = { count: 1, users: [user.username] };
//       }
//     });

//     return Object.keys(months).map((month) => ({
//       month,
//       count: months[month].count,
//       usernames: months[month].users.join(', ')
//     }));
//   };

//   const chartData = processData();

//   return (
//     <div style={{ width: '90%', height: 300, margin: '1%' }}>
//       <ResponsiveContainer>
//         <LineChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip
//             content={({ payload }) => {
//               if (payload.length === 0) return null;
//               const { value } = payload[0];
//               return (
//                 <div className="custom-tooltip">
//                   <p>כמות: <b>{value}</b></p>
//                 </div>
//       
import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { FillData } from '../../redux/actions/userAction';
import userService from '../../axios/userAxios';
// import { FillData4 } from '../../redux/actions/userAction';
const ActivityChart = () => {
  const dispatch = useDispatch();
  const f = useSelector((state) => state.userReducer.userList)  // הגדרת ברירת מחדל במקרה של undefined
  useEffect(() => {
    if (f.length === 0) {
      const fetchData = async () => {
        try {
          debugger
          const data1 = await userService.getAllUsers();
          dispatch(FillData(data1)); // ודא שאתה שולח את הנתונים הנכונים כאן
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchData();
    }
  }, [dispatch, f]);
  const processData = () => {
    const months = {};
    f.forEach((user) => {
      const createdAt = new Date(user.createdAt);
      const month = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}`;
      if (months[month]) {
        months[month].count++;
        months[month].users.push(user.username);
      } else {
        months[month] = { count: 1, users: [user.username] };
      }
    });
    return Object.keys(months).map((month) => ({
      month,
      count: months[month].count,
      usernames: months[month].users.join(', ')
    }));
  };
  const chartData = processData();
  return (
    <div style={{ width: '90%', height: 300, margin: '1%' }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
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
          <Line type="monotone" dataKey="count" stroke="#8884D8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default ActivityChart;