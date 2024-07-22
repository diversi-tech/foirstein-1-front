import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import UsageChart from './UsageChart';
import UsageChart2 from './UsageChart2';
import UsageChart3 from './UsageChart3';
import ActivityChart from './ActivityChart ';
import ActivityChart2 from './ActivityChart2';
import ActivityChart3 from './ActivityChart3';
import GraphComponent from './GraphComponent';
import GraphComponent2 from './GraphComponent2';
import GraphComponent3 from './GraphComponent3';
import Chartat from './Chartat';
import Chartat2 from './Chartat2';
import Chartat3 from './Chartat3';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '20px',
  },
  topCharts: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  bottomCharts: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '20px',
  },
  chartSection: {
    textAlign: 'center',
    padding: '20px',
  },
  chartTitle: {
    marginBottom: '20px',
  },
});

const Charts = () => {
  const classes = useStyles();
  const [currentUsageChart, setCurrentUsageChart] = useState('chart1');
  const [currentActivityChart, setCurrentActivityChart] = useState('c1');
  const [currentGraphComponent, setcurrentGraphComponent] = useState('d1');
  const [currentChartat, setcurrentChartat] = useState('chart1');

  const handleUsageChartToggle = (chartType) => {
    setCurrentUsageChart(chartType);
  };

  const handleActivityChartToggle = (chartType) => {
    setCurrentActivityChart(chartType);
  };

  const handleGraphComponentToggle = (chartType) => {
    setcurrentGraphComponent(chartType);
  };

  const handleChartatToggle = (chartType) => {
    setcurrentChartat(chartType);
  };

  return (
    <div className={classes.container}>
      <div className={classes.topCharts}>
        <div className={classes.chartSection}>
          <h2 className={classes.chartTitle}>סטטיסטיקת שימוש באתר</h2>
          <div>
            {currentUsageChart === 'chart1' ? <UsageChart/> : null}
            {currentUsageChart === 'chart2' ? <UsageChart2 /> : null}
          </div>
          <UsageChart3 onChartToggle={handleUsageChartToggle} />
        </div>
        <div className={classes.chartSection}>
          <h2 className={classes.chartTitle}>כמות נרשמים לפי חודשים</h2>
          <div>
            {currentActivityChart === 'c1' ? <ActivityChart /> : null}
            {currentActivityChart === 'c2' ? <ActivityChart2 /> : null}
          </div>
          <ActivityChart3 onChartToggle={handleActivityChartToggle} />
        </div>
      </div>

      <div className={classes.topCharts}>
        <div className={classes.chartSection}>
          <h2 className={classes.chartTitle}>ממוצע הדירוגים לפי פריטים</h2>
          <div>
          {currentGraphComponent === 'd1' ? <GraphComponent /> : null} 
            {currentGraphComponent === 'd2' ? <GraphComponent2 /> : null}
          </div>
          <GraphComponent3 onChartToggle={handleGraphComponentToggle} />
        </div>
        <div className={classes.chartSection}>
          <h2 className={classes.chartTitle}>סכום פריטים שהושאלו</h2>
          <div>
            {currentChartat === 'chart1' ? <Chartat /> : null}
            {currentChartat === 'chart2' ? <Chartat2 /> : null}
          </div>
          <Chartat3 onChartToggle={handleChartatToggle} />

        </div> 
      </div>
    </div>
  );
};

export default Charts;
