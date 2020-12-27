import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { Formik, Form } from 'formik';

import { useUpdateProfileMutation } from '../../generated/graphql';
import InputElement from '../InputElement';

interface Values {
  phoneNumber: React.ReactText;
  country: string;
  city: string;
  relationship: string;
}

interface Props {
  id: string;
  open: boolean;
  handleClose: () => void;
  phoneNumber?: number | null;
  country?: string | null;
  city?: string | null;
  relationship?: string | null;
}

const EditProfileDialog: React.FC<Props> = ({
  id,
  open,
  handleClose,
  phoneNumber,
  country,
  city,
  relationship,
}) => {
  const [updateProfile, { loading }] = useUpdateProfileMutation();

  const fields = [
    {
      label: 'Phone number',
      type: 'tel',
      name: 'phoneNumber',
      validate: (value: string): string | undefined => {
        let errorMessage;
        if (
          (!/^[+0-9]+$/.test(value) || Number(value) < 100000) &&
          value.length !== 0
        )
          errorMessage = 'Phone number must be a number!';
        return errorMessage;
      },
    },
    {
      label: 'Country',
      type: 'text',
      name: 'country',
      validate: (value: string): string | undefined => {
        let errorMessage;
        if (!/^[A-Za-z]+$/.test(value) && value.length !== 0)
          errorMessage =
            'Country can not be empty and must include letters only!';
        return errorMessage;
      },
    },
    {
      label: 'City',
      type: 'text',
      name: 'city',
      validate: (value: string): string | undefined => {
        let errorMessage;
        if (!/^[A-Za-z]+$/.test(value) && value.length !== 0)
          errorMessage = 'City can not be empty and must include letters only!';
        return errorMessage;
      },
    },
    {
      label: 'Relationship',
      type: 'select',
      name: 'relationship',
      isSelect: true,
      items: [
        {
          value: '',
          label: 'Unknown',
        },
        {
          value: 'Single',
          label: 'Single',
        },
        {
          value: 'In relationship',
          label: 'In relationship',
        },
        {
          value: 'Married',
          label: 'Married',
        },
        {
          value: 'Divorced',
          label: 'Divorced',
        },
      ],
    },
  ];

  const initialValues = {
    phoneNumber: phoneNumber || '',
    country: country || '',
    city: city || '',
    relationship: relationship || '',
  };

  const handleSubmit = async ({
    phoneNumber,
    ...values
  }: Values): Promise<void> => {
    const updatedValues = {
      phoneNumber: Number(phoneNumber) || null,
      ...Object.keys(values).reduce(
        (acc, value) => ({ ...acc, [value]: values[value] || null }),
        {},
      ),
    };

    await updateProfile({
      variables: { data: { id, ...updatedValues } },
    });

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit profile</DialogTitle>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {({ dirty, isValid }) => (
          <Form>
            <DialogContent>
              {fields.map((field) => (
                <InputElement key={field.name} {...field} />
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                disabled={!dirty || !isValid}
                variant="contained"
                color="primary"
                type="submit"
              >
                {loading ? (
                  <CircularProgress size={24} color="secondary" />
                ) : (
                  'Edit'
                )}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditProfileDialog;
