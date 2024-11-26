export const generateDummyLicenseData = () => {
  const currentDate = new Date();
  
  // Sample data arrays
  const reportNames = ["Security Analysis", "Threat Report", "Vulnerability Assessment", "Incident Report", "Risk Analysis"];
  const origins = ["External Source", "Internal Audit", "Third Party", "Automated Scan", "Manual Review"];
  const categories = ["Critical", "High", "Medium", "Low", "Informational"];
  
  return Array.from({ length: 36 }, (_, index) => ({
    sr_no: index + 1,
    report_name: `${reportNames[Math.floor(Math.random() * reportNames.length)]} #${Math.random().toString(36).substr(2, 4)}`,
    origin: origins[Math.floor(Math.random() * origins.length)],
    upload_date: new Date(currentDate.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    category: categories[Math.floor(Math.random() * categories.length)],
    license_id: `RPT-${Math.random().toString(36).substr(2, 9)}`,
    allocated_to: index % 3 === 0 ? `analyst${index}@security.com` : null,
    valid_from: currentDate.toISOString().split('T')[0],
    valid_till: new Date(currentDate.setMonth(currentDate.getMonth() + 12)).toISOString().split('T')[0],
    status: Math.random() > 0.5 ? "1" : "0",
    is_reserved: Math.random() > 0.7,
    plugins: index % 2 === 0 ? [{
      plugin_id: `PLG-${Math.random().toString(36).substr(2, 6)}`
    }] : []
  }));
};
