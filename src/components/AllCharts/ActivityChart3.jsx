import React from 'react';
import Button from '@mui/material/Button';

const ActivityChart3 = ({ onChartToggle }) => {
  const handleClick = (chartType) => {
    debugger
    onChartToggle(chartType);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>     
     <Button variant="contained" color="primary" onClick={() => handleClick('c1')}>
        הצג גרף 
      </Button>
      <Button variant="contained" color="primary" onClick={() => handleClick('c2')} style={{ marginLeft: '10px' }}>
        הצג דיאגרמה 
      </Button>
    </div>
  );
};

export default ActivityChart3;
