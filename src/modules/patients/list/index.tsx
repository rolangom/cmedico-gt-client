import {
  InfiniteList,
  Datagrid,
  TextField,
  DateField,
  TextInput,
  EditButton,
} from "react-admin";
import { ConsultasButton } from "../components";

const filters = [
  <TextInput source="lastName" label="Apellidos" alwaysOn />,
  <TextInput source="firstName" label="Nombres" alwaysOn />,
];

export function PatientList() {
  return (
    <InfiniteList resource="patients" filters={filters}>
      <Datagrid>
        <TextField source="lastName" label="Apellidos" />
        <TextField source="firstName" label="Nombres" />
        <TextField source="gender" label="Sexo" />
        <TextField
          source="insuranceCompany"
          label="ARS"
          title="Compañía de Seguros"
        />
        <DateField source="modifiedAt" label="Últ. modificación" />
        <EditButton />
        <ConsultasButton />
      </Datagrid>
    </InfiniteList>
  );
}

export default PatientList;
