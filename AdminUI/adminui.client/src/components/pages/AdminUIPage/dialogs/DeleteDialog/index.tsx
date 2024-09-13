import React, { useCallback } from "react";
import { LoadingButton } from "@mui/lab";
import CustomDialog from "../../../../common/Dialog";
import { useDeleteClientMutation } from "../../../../../api/apiHooks";

interface DeleteDialogProps {
  id: string;
  onClose: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ id, onClose }) => {
  const { deleteClientMutationAsync, isLoadingDeleteClient } =
    useDeleteClientMutation();

  const onDeleteClick = useCallback(async () => {
    try {
      await deleteClientMutationAsync(id);
      onClose();
    } catch (error) {
      console.log(error);
    }
  }, [id, deleteClientMutationAsync, onClose]);
  return (
    <CustomDialog
      open={true}
      onClose={onClose}
      title={"Are you sure you want to delete?"}
    >
      <LoadingButton
        variant={"contained"}
        loading={isLoadingDeleteClient}
        onClick={onDeleteClick}
      >
        Delete
      </LoadingButton>
    </CustomDialog>
  );
};

export default DeleteDialog;
