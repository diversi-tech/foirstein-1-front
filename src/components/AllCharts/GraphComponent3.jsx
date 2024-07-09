import React from 'react';
import Button from '@mui/material/Button';

const GraphComponent3 = ({ onChartToggle }) => {
  const handleClick = (chartType) => {
     
    onChartToggle(chartType);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
      <Button variant="contained" color="primary" onClick={() => handleClick('d1')}>
        הצג גרף 
      </Button>
      <Button variant="contained" color="primary" onClick={() => handleClick('d2')} style={{ marginLeft: '10px' }}>
        הצג דיאגרמה 
      </Button>
    </div>
  );
};

export default GraphComponent3;
