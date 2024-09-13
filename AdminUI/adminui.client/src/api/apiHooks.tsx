import { useMutation, useQuery } from "react-query";
import {
  addClient,
  deleteClient,
  editClient,
  getClients,
  sendEmails,
} from "./api";
import { IClient } from "../interfaces/Client";

const useAddClientMutation = () => {
  const {
    mutate: addClientMutation,
    mutateAsync: addClientAsync,
    isLoading: isLoadingAddClient,
    error: errorAddClient,
  } = useMutation({
    mutationFn: async (clientModel: IClient) => await addClient(clientModel),
  });

  return {
    addClientMutation,
    addClientMutationAsync: addClientAsync,
    isLoadingAddClient,
    errorAddClient,
  };
};

const useEditClientMutation = () => {
  const {
    mutate: editClientMutation,
    mutateAsync: editClientAsync,
    isLoading: isLoadingEditClient,
    error: errorEditClient,
  } = useMutation({
    mutationFn: async (clientModel: IClient) => await editClient(clientModel),
  });

  return {
    editClientMutation,
    editClientMutationAsync: editClientAsync,
    isLoadingEditClient,
    errorEditClient,
  };
};

const useGetClients = () => {
  const {
    data: clients,
    isLoading: isLoadingClients,
    error: iserrorClients,
    isRefetching: isRefetchingClients,
    refetch: refetchClients,
  } = useQuery({
    queryKey: ["getClient"],
    queryFn: () => getClients(),
  });

  return {
    clients,
    isLoadingClients,
    iserrorClients,
    isRefetchingClients,
    refetchClients,
  };
};

const useDeleteClientMutation = () => {
  const {
    mutate: deleteClientMutation,
    mutateAsync: deleteClientAsync,
    isLoading: isLoadingDeleteClient,
    error: errorDeleteClient,
  } = useMutation({
    mutationFn: async (id: string) => await deleteClient(id),
  });

  return {
    deleteClientMutation,
    deleteClientMutationAsync: deleteClientAsync,
    isLoadingDeleteClient,
    errorDeleteClient,
  };
};

const useSendEmails = () => {
  const {
    mutate: sendEmailsMutation,
    mutateAsync: sendEmailsAsync,
    isLoading: isLoadingSendEmails,
    error: errorSendEmails,
  } = useMutation({
    mutationFn: async () => await sendEmails(),
  });

  return {
    sendEmailsMutation,
    sendEmailsMutationAsync: sendEmailsAsync,
    isLoadingSendEmails,
    errorSendEmails,
  };
};

export {
  useAddClientMutation,
  useEditClientMutation,
  useGetClients,
  useDeleteClientMutation,
  useSendEmails,
};
