const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  const generateSystemMetric = (type) => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      timestamp: new Date().toISOString(),
      value: generateRandomNumber(1, 100)
    };
  };
  
  const generateReport = () => {
    const reportTypes = ['performance', 'security', 'usage', 'error'];
    const randomType = reportTypes[Math.floor(Math.random() * reportTypes.length)];
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      type: randomType,
      title: `${randomType.charAt(0).toUpperCase() + randomType.slice(1)} Report`,
      timestamp: new Date().toISOString(),
      summary: `Sample ${randomType} report summary`,
      status: Math.random() > 0.5 ? 'completed' : 'pending'
    };
  };
  
  export const generateDashboardData = () => {
    // Generate system metrics
    const systemMetrics = [];
    
    // Generate 5-10 system running metrics
    const systemRunningCount = generateRandomNumber(5, 10);
    for (let i = 0; i < systemRunningCount; i++) {
      systemMetrics.push(generateSystemMetric('system_running'));
    }
    
    // Generate 10-20 standard user metrics
    const standardUserCount = generateRandomNumber(10, 20);
    for (let i = 0; i < standardUserCount; i++) {
      systemMetrics.push(generateSystemMetric('standard_user'));
    }
    
    // Generate 15-30 data record metrics
    const dataRecordCount = generateRandomNumber(15, 30);
    for (let i = 0; i < dataRecordCount; i++) {
      systemMetrics.push(generateSystemMetric('data_record'));
    }
    
    // Generate reports
    const reports = [];
    const reportCount = generateRandomNumber(5, 10);
    for (let i = 0; i < reportCount; i++) {
      reports.push(generateReport());
    }
    
    return {
      systemMetrics,
      reports
    };
  };
  