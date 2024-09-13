import axios from "axios";
import { IClient } from "../interfaces/Client";

// Base URL for the API
const baseURL = "https://localhost:7233/";

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get the list of clients
export const getClients = async () => {
  try {
    return axiosInstance.get("Clients/list");
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

// Function to add a new client
export const addClient = async (clientData: IClient) => {
  try {
    return axiosInstance.post("Clients/add", clientData);
  } catch (error) {
    console.error("Error adding client:", error);
    throw error;
  }
};

// Function to edit an existing client by ID
export const editClient = async (updatedData: IClient) => {
  try {
    return axiosInstance.put(`Clients/edit/${updatedData.id}`, updatedData);
  } catch (error) {
    console.error("Error editing client:", error);
    throw error;
  }
};

// Function to delete an existing client by ID
export const deleteClient = async (id: string) => {
  try {
    return axiosInstance.delete(`Clients/delete/${id}`);
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};

// sends email
export const sendEmails = async () => {
  try {
    return axiosInstance.post(`Email/send-email-event`);
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};
