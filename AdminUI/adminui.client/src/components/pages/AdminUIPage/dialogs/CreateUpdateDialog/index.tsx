import React from "react";
import { Field, Form, Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField } from "@mui/material";
import { IClient } from "../../../../../interfaces/Client";
import CustomDialog from "../../../../common/Dialog";
import {
  useAddClientMutation,
  useEditClientMutation,
} from "../../../../../api/apiHooks";

interface CreateUpdateDialogProps {
  clientModel?: IClient;
  onClose: () => void;
}

const CreateUpdateDialog: React.FC<CreateUpdateDialogProps> = ({
  clientModel,
  onClose,
}) => {
  const { addClientMutationAsync, isLoadingAddClient } = useAddClientMutation();
  const { editClientMutationAsync, isLoadingEditClient } =
    useEditClientMutation();

  const isEditMode = !!clientModel;
  const title = isEditMode ? "Edit Client" : "Create Client";
  const submitButtonText = isEditMode ? "Edit" : "Create";

  return (
    <CustomDialog open={true} onClose={onClose} title={title}>
      Client information
      <Formik
        initialValues={
          {
            firstName: clientModel?.firstName || "",
            id: clientModel?.id || "",
            lastName: clientModel?.lastName || "",
            plainTextContent: clientModel?.plainTextContent || "",
            receiverEmail: clientModel?.receiverEmail || "",
            template: {
              content: clientModel?.template?.content || "",
              id: clientModel?.template?.id || "",
              marketingData: clientModel?.template?.marketingData || "",
              name: clientModel?.template?.name || "",
            },
          } as IClient
        }
        onSubmit={async (values) => {
          try {
            if (isEditMode) {
              try {
                await editClientMutationAsync(values);
              } catch (error) {
                console.log(error);
              }
            } else {
              try {
                await addClientMutationAsync(values);
              } catch (error) {
                console.log(error);
              }
            }
            onClose();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {() => (
          <Form>
            <Stack width={"350px"} gap={"15px"}>
              <Field
                as={TextField}
                name={"firstName"}
                label="First Name"
                variant="outlined"
                fullWidth
              />
              <Field
                as={TextField}
                name={"lastName"}
                label="Last Name"
                variant="outlined"
                fullWidth
              />
              <Field
                as={TextField}
                name={"plainTextContent"}
                label="Plain Text Content"
                variant="outlined"
                fullWidth
              />
              <Field
                as={TextField}
                name={"receiverEmail"}
                label="Receiver Email"
                variant="outlined"
                fullWidth
              />
              <Field
                as={TextField}
                name={"template.content"}
                label="Temlpate name"
                variant="outlined"
                fullWidth
              />
              <Field
                as={TextField}
                name={"template.marketingData"}
                label="Temlpate marketing data"
                variant="outlined"
                fullWidth
              />
              <Field
                as={TextField}
                name={"template.name"}
                label="Temlpate name"
                variant="outlined"
                fullWidth
              />
              <Box
                display={"flex"}
                width={"100%"}
                justifyContent={"flex-end"}
                pt={"30px"}
              >
                <LoadingButton
                  loading={isLoadingAddClient || isLoadingEditClient}
                  type={"submit"}
                  variant={"contained"}
                >
                  {submitButtonText}
                </LoadingButton>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </CustomDialog>
  );
};

export default CreateUpdateDialog;
