import React from 'react';
import Button from '@mui/material/Button';
import theme from '../../theme';

const Chartat3 = ({ onChartToggle }) => {
  const handleClick = (chartType) => {
    debugger
    onChartToggle(chartType);
  };

  return (
    <theme>
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>     
      <Button variant="contained" color="primary" onClick={() => handleClick('chart1')}>
        הצג גרף 
      </Button>
      <Button variant="contained" color="primary" onClick={() => handleClick('chart2')} style={{ marginLeft: '10px' }}>
        הצג דיאגרמה 
      </Button>
    </div>
    </theme>
  );
};

export default Chartat3;
