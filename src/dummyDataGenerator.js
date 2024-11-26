export const generateDummyLicenseData = () => {
    const currentDate = new Date();
    
    return Array.from({ length: 20 }, (_, index) => ({
      license_id: `LIC-${Math.random().toString(36).substr(2, 9)}`,
      allocated_to: index % 3 === 0 ? `user${index}@example.com` : null,
      valid_from: currentDate.toISOString().split('T')[0],
      valid_till: new Date(currentDate.setMonth(currentDate.getMonth() + 12)).toISOString().split('T')[0],
      status: Math.random() > 0.5 ? "1" : "0",
      is_reserved: Math.random() > 0.7,
      plugins: index % 2 === 0 ? [{
        plugin_id: `PLG-${Math.random().toString(36).substr(2, 6)}`
      }] : []
    }));
  };
  