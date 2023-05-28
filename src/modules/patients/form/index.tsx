import {
  Edit,
  SimpleForm,
  DateInput,
  TextInput,
  Create,
  SelectInput,
  required,
  useRecordContext,
} from "react-admin";

import { parseDate, formatDateStr } from "../../common/utils";
import { ConsultasButton } from "../components";

const genderChoices = [
  { id: "M", name: "M" },
  { id: "F", name: "F" },
];

const scholarLevel = [
  { id: "N", name: "Ninguno" },
  { id: "I", name: "Inicial" },
  { id: "S", name: "Secundaria" },
  { id: "T", name: "Técnico" },
  { id: "U", name: "Universitaria" },
  { id: "M", name: "Post-grado" },
];

const growthStatusChoices = [
  { id: "A", name: "Adecuado" },
  { id: "I", name: "No adecuado" },
];

const CommonFields = () => (
  <>
    {/* <ReferenceInput source="userId" reference="users" /> */}
    <TextInput
      source="firstName"
      fullWidth
      label="Nombres"
      validate={required()}
    />
    <TextInput source="lastName" fullWidth label="Apellidos" />
    <DateInput
      source="birthDate"
      label="Fecha de nacimiento"
      format={formatDateStr}
      parse={parseDate}
      fullWidth
    />
    <SelectInput
      source="gender"
      label="Sexo"
      fullWidth
      choices={genderChoices}
    />
    <TextInput source="nationalId" label="Cédula" fullWidth />
    <TextInput
      source="address"
      label="Dirección"
      multiline
      fullWidth
      rows={3}
    />
    <TextInput source="phoneNumber" label="Número de teléfono" fullWidth />
    <SelectInput
      source="scholarLevel"
      fullWidth
      resettable
      choices={scholarLevel}
    />
    <TextInput source="email" label="E-Mail" fullWidth type="email" />
    <TextInput source="accompaniedBy" label="Nombre acompañante" fullWidth />
    <TextInput
      source="insuranceCompany"
      label="Compañía de seguros"
      fullWidth
    />
    <TextInput source="doctorName" label="Nombre del médico" fullWidth />
    <TextInput
      source="reasons"
      label="Motivos de consulta"
      multiline
      fullWidth
      rows={4}
    />
    <TextInput
      source="summary"
      label="Resumen del historial médico"
      multiline
      fullWidth
      rows={5}
    />
    <SelectInput
      source="growthStatus"
      label="Crecimiento y desarrollo"
      fullWidth
      choices={growthStatusChoices}
    />
  </>
);

const PatientEditTitle = () => {
  const record = useRecordContext();
  return (
    <span>
      Paciente {record ? `"${record.firstName} ${record.lastName}"` : ""}
    </span>
  );
};

export const PatientEdit = () => (
  <Edit title={<PatientEditTitle />}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ConsultasButton />
      <CommonFields />
      <ConsultasButton />
    </SimpleForm>
  </Edit>
);

export const PatientCreate = () => (
  <Create>
    <SimpleForm>
      <CommonFields />
    </SimpleForm>
  </Create>
);
