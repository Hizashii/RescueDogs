export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    
    return {
      provide: {
        api: {
          /**
           * Submit a new dog report
           * @param {FormData} formData The form data containing report information
           * @returns {Promise} Promise for the API response
           */
          async submitReport(formData) {
            try {
              const response = await fetch('/api/reports', {
                method: 'POST',
                body: formData
              });
              
              if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to submit report');
              }
              
              return await response.json();
            } catch (error) {
              console.error('API Error:', error);
              throw error;
            }
          },
          
          /**
           * Get all reports (admin only)
           * @returns {Promise} Promise for the API response
           */
          async getReports() {
            try {
              const response = await fetch('/api/reports', {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}` 
                }
              });
              
              if (!response.ok) {
                throw new Error('Failed to fetch reports');
              }
              
              return await response.json();
            } catch (error) {
              console.error('API Error:', error);
              throw error;
            }
          },
          
          /**
           * Update report status (admin only)
           * @param {string} reportId The ID of the report to update
           * @param {string} status The new status value
           * @returns {Promise} Promise for the API response
           */
          async updateReportStatus(reportId, status) {
            try {
              const response = await fetch(`/api/reports/${reportId}/status`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ status })
              });
              
              if (!response.ok) {
                throw new Error('Failed to update report status');
              }
              
              return await response.json();
            } catch (error) {
              console.error('API Error:', error);
              throw error;
            }
          }
        }
      }
    };
  });