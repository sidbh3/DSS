export const generateDashboardData = () => {
  const currentDate = new Date();
  const reportTypes = {
    Generated: [
      "Automated Analysis",
      "System Generated Report", 
      "AI Detection Report",
      "Pattern Analysis",
      "Behavioral Report",
    ],
    OSINT: [
      "Social Media Analysis",
      "Public Domain Intel",
      "Dark Web Report", 
      "Network Trace",
      "Open Source Intel",
    ],
    Confidential: [
      "Classified Report",
      "Private Investigation",
      "Internal Breach Report",
      "Sensitive Data Analysis", 
      "Restricted Access Report",
    ],
    Exception: [
      "Anomaly Detection",
      "Policy Violation",
      "Security Exception",
      "Compliance Deviation",
      "Risk Override",
    ],
  };

  const origins = [
    "External Source",
    "Internal Audit", 
    "Third Party",
    "Automated Scan",
    "Manual Review",
  ];
  
  const categories = ["Critical", "High", "Medium", "Low", "Informational"];
  
  // Generate system metrics data
  const systemMetrics = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    type: ['system_running', 'standard_user', 'data_record'][Math.floor(Math.random() * 3)]
  }));

  // Generate report data
  const generateDataForType = (type) => {
    return Array.from({ length: 9 }, (_, index) => ({
      sr_no: index + 1,
      report_name: `${reportTypes[type][Math.floor(Math.random() * reportTypes[type].length)]} #${Math.random().toString(36).substr(2, 4)}`,
      origin: origins[Math.floor(Math.random() * origins.length)],
      upload_date: new Date(currentDate.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      category: categories[Math.floor(Math.random() * categories.length)],
      type: type,
    }));
  };

  return {
    systemMetrics,
    reports: [
      ...generateDataForType("Generated"),
      ...generateDataForType("OSINT"), 
      ...generateDataForType("Confidential"),
      ...generateDataForType("Exception"),
    ]
  };
};
