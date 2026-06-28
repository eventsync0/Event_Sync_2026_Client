import { 
  List, Datagrid, TextField, EditButton,
  Edit, Create, SimpleForm, TextInput, required 
} from 'react-admin';

export const RoomList = () => (
  <List sort={{ field: 'id', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" label="Nom de la salle" />
      <EditButton />
    </Datagrid>
  </List>
);

export const RoomEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" label="Nom de la salle" validate={[required()]} fullWidth />
    </SimpleForm>
  </Edit>
);

export const RoomCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nom de la salle" validate={[required()]} fullWidth />
    </SimpleForm>
  </Create>
);