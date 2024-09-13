import React, { useCallback, useState } from "react";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import { Box, Button, IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Snackbar from "@mui/material/Snackbar";

import { Header } from "../../layout";
import { IClient } from "../../../interfaces/Client";
import { Spinner } from "../../common";
import CreateDialog from "./dialogs/CreateUpdateDialog";
import DeleteDialog from "./dialogs/DeleteDialog";
import { useGetClients, useSendEmails } from "../../../api/apiHooks";

interface AdminUiPageProps {}

const AdminUiPage: React.FC<AdminUiPageProps> = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editableClient, setEditableClient] = useState<IClient | undefined>(
    undefined
  );
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
  const [snackbarClient, setSnackbarClient] = useState<IClient | null>(null);

  const { clients, isLoadingClients, refetchClients } = useGetClients();
  const { sendEmailsMutationAsync } = useSendEmails();

  const onEditClick = useCallback(
    (editClientModel: IClient) => {
      setEditableClient(editClientModel);
      setDialogOpen(true);
    },
    [setDialogOpen]
  );

  const onCreateButtonClick = useCallback(() => {
    setDialogOpen(true);
  }, [setDialogOpen]);

  const onSendEmails = useCallback(() => {
    setSnackbarClient({});
    sendEmailsMutationAsync();
  }, [setDialogOpen]);

  const onCloseClick = useCallback(() => {
    setEditableClient(undefined);
    setDialogOpen(false);
    refetchClients();
  }, [setDialogOpen]);

  const onDeleteCloseClick = useCallback(() => {
    setDeleteId(undefined);
    refetchClients();
  }, [setDeleteId]);

  const onSnackbarClose = useCallback(() => {
    setSnackbarClient(null);
  }, [setSnackbarClient]);

  if (isLoadingClients) return <Spinner />;

  const columns: GridColDef[] = [
    { field: "id", headerName: "id", sortable: false },
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
      sortable: false,
    },
    { field: "lastName", headerName: "Last Name", width: 150, sortable: false },
    {
      field: "receiverEmail",
      headerName: "Receiver Email",
      width: 150,
      sortable: false,
    },
    {
      field: "template.content",
      headerName: "Template content",
      width: 150,
      sortable: false,
      renderCell: (params) => params?.row?.template?.content,
    },
    {
      field: "template.marketingData",
      headerName: "Template marketingData",
      width: 150,
      sortable: false,
      renderCell: (params) => params?.row?.template?.marketingData,
    },
    {
      field: "templateName",
      headerName: "Template name",
      width: 150,
      sortable: false,
      renderCell: (params) => params?.row?.template?.name,
    },
    {
      field: "option",
      headerName: "",
      sortable: false,
      minWidth: 50,
      renderCell: (params) => (
        <Box display={"flex"}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onEditClick(params.row);
            }}
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setDeleteId(params?.id as any);
            }}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Stack width={"100%"}>
      <Header />
      <Stack alignItems={"center"} justifyContent={"center"} pt={"50px"}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={!!snackbarClient}
          message={`You successfully sent notifications!`}
          key={"topcenter"}
          onClose={onSnackbarClose}
          autoHideDuration={3000}
        />
        <DataGrid
          rows={clients?.data}
          columns={columns}
          hideFooterPagination
          hideFooter
          disableColumnMenu
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          slots={{
            toolbar: () => (
              <GridToolbarContainer>
                <Button onClick={onSendEmails} sx={{ alignSelf: "start" }}>
                  Send Notifications
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <Button onClick={onCreateButtonClick} sx={{ alignSelf: "end" }}>
                  + Create Client
                </Button>
              </GridToolbarContainer>
            ),
          }}
          sx={{
            ".MuiDataGrid-row": {
              cursor: "pointer",
            },
          }}
        />
      </Stack>

      {dialogOpen && (
        <CreateDialog clientModel={editableClient} onClose={onCloseClick} />
      )}
      {deleteId && <DeleteDialog id={deleteId} onClose={onDeleteCloseClick} />}
    </Stack>
  );
};
export default AdminUiPage;
