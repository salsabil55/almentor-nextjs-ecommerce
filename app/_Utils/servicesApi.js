import axiosClient from "./axiosClient"; // Adjust the path as necessary

// Example using Axios
const getLatestServices = (lng) => {
  return axiosClient
    .get(`services?populate=*&locale=${lng}`)
    .then((response) => response.data) // Return the data from the response
    .catch((error) => {
      console.error("Error fetching latest services:", error);
      throw error; // Rethrow the error for handling in the calling function
    });
};

const getServicesById = (id, lng) => {
  return axiosClient
    .get(`/services/${id}?populate=*&locale=${lng}`) // Ensure this endpoint is correct
    .then((response) => response.data) // Return the data from the response
    .catch((error) => {
      console.error("Error fetching latest services:", error);
      throw error; // Rethrow the error for handling in the calling function
    });
};

const getServicesByCategory = (Category) => {
  return axiosClient
    .get(`/services?filters[Category][$eq]=${Category}&populate=*`) // Adjust if the category filter needs to access the name
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching services by category:", error);
      throw error;
    });
};

const updateBookedService = (id, payload) => {
  return axiosClient.put(`/services/${id}`, payload);
};

export default {
  getLatestServices,
  getServicesById,
  getServicesByCategory,
  updateBookedService,
};
