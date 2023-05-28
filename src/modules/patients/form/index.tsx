import {
  Edit,
  SimpleForm,
  DateInput,
  TextInput,
  Create,
  SelectInput,
  required,
  useRecordContext,
  WithRecord,
} from "react-admin";

import { parseDate, formatDateStr, calculateAge } from "../../common/utils";
import { ConsultasButton } from "../components";
import { Grid, TextField } from "@mui/material";

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
    <Grid container spacing={2}>
      <Grid item md={4} xs={12}>
        <TextInput
          source="firstName"
          label="Nombres"
          fullWidth
          validate={required()}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <TextInput source="lastName" fullWidth label="Apellidos" />
      </Grid>
      <Grid item md={4} xs={12}>
        <TextInput source="nationalId" label="Cédula" fullWidth />
      </Grid>

      <Grid item md={6} xs={9}>
        <DateInput
          source="birthDate"
          label="Fecha de nacimiento"
          format={formatDateStr}
          parse={parseDate}
          fullWidth
        />
      </Grid>
      <Grid item md={3} xs={3}>
        <WithRecord
          label="Edad"
          render={(record) => (
            <TextField
              label="Edad"
              value={record.birthDate ? calculateAge(record.birthDate) : "-"}
              disabled
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <SelectInput
          source="gender"
          label="Sexo"
          choices={genderChoices}
          fullWidth
        />
      </Grid>
      <Grid item md={12} xs={12}>
        <TextInput
          source="address"
          label="Dirección"
          multiline
          fullWidth
          rows={3}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <TextInput source="phoneNumber" label="Número de teléfono" fullWidth />
      </Grid>
      <Grid item md={4} xs={12}>
        <TextInput source="email" label="E-Mail" type="email" fullWidth />
      </Grid>
      <Grid item md={4} xs={12}>
        <SelectInput
          source="scholarLevel"
          label="Nivel escolar"
          resettable
          choices={scholarLevel}
          fullWidth
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextInput
          source="accompaniedBy"
          label="Nombre acompañante"
          fullWidth
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextInput
          source="insuranceCompany"
          label="Compañía de seguros"
          title="ARS"
          fullWidth
        />
      </Grid>
      <Grid item md={12} xs={12}>
        <TextInput source="doctorName" label="Nombre del médico" fullWidth />
      </Grid>
      <Grid item md={12} xs={12}>
        <TextInput
          source="reasons"
          label="Motivos de consulta"
          multiline
          fullWidth
          rows={4}
        />
      </Grid>
      <Grid item md={12} xs={12}>
        <TextInput
          source="summary"
          label="Resumen del historial médico"
          multiline
          fullWidth
          rows={5}
        />
      </Grid>
      <Grid item md={12} xs={12}>
        <SelectInput
          source="growthStatus"
          label="Crecimiento y desarrollo"
          fullWidth
          choices={growthStatusChoices}
        />
      </Grid>
    </Grid>
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
