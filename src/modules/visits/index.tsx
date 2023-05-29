import React from "react";
import {
  InfiniteList,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  useRecordContext,
  ReferenceInput,
  SelectInput,
  BooleanInput,
  TextInput,
  DateInput,
  required,
  EditButton,
  SimpleForm,
  Edit,
  Create,
  Button,
} from "react-admin";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useParams, Link } from "react-router-dom";
import { formatDateStr, parseDate } from "../common/utils";
import { Grid } from "@mui/material";

const filters = [
  <ReferenceInput source="patientId" label="Paciente" reference="patients">
    <SelectInput label="Paciente" validate={required()} fullWidth />
  </ReferenceInput>,
];

interface VisitsDataGridProps {
  editButton: React.ReactNode;
}
function VisitsDataGrid({ editButton }: VisitsDataGridProps) {
  return (
    <Datagrid>
      <ReferenceField
        source="patientId"
        reference="patients"
        label="Paciente"
      />
      <DateField source="date" label="Fecha" />
      <TextField source="reasons" label="Motivos de consulta" />
      <TextField source="diagnosis" label="Diagnósticos" />
      {editButton}
    </Datagrid>
  );
}

export function VisitsList() {
  return (
    <InfiniteList resource="visits" filters={filters}>
      <VisitsDataGrid editButton={<EditButton />} />
    </InfiniteList>
  );
}

interface IEditVisitButtonProps {
  patientId: string;
}
const EditVisitButton = ({ patientId }: IEditVisitButtonProps) => {
  const record = useRecordContext();
  return (
    <Button
      component={Link}
      to={`/patients/${patientId}/visits/${record.id}`}
      color="primary"
      label="Editar"
    >
      <EditIcon />
    </Button>
  );
};
const CreateVisitButton = ({ patientId }: IEditVisitButtonProps) => {
  return (
    <Button
      component={Link}
      to={`/patients/${patientId}/visits/create`}
      color="primary"
      label="Create"
    >
      <AddIcon />
    </Button>
  );
};
const BackToPatientButton = ({ patientId }: IEditVisitButtonProps) => {
  return (
    <Button
      component={Link}
      to={`/patients/${patientId}`}
      color="primary"
      label="Volver al paciente"
    >
      <ArrowBackIcon />
    </Button>
  );
};

export function VisitsListWithParams() {
  const { patientId } = useParams();
  return (
    <InfiniteList
      resource="visits"
      filter={{ patientId }}
      actions={<CreateVisitButton patientId={patientId!} />}
    >
      <VisitsDataGrid editButton={<EditVisitButton patientId={patientId!} />} />
    </InfiniteList>
  );
}

const CommonFields = () => (
  <>
    <Grid container spacing={2}>
      <Grid item md={12} xs={12}>
        <DateInput
          source="date"
          label="Fecha"
          validate={required()}
          format={formatDateStr}
          parse={parseDate}
          fullWidth
        />
      </Grid>
      <Grid item md={12} xs={12}>
        <TextInput
          source="reasons"
          label="Motivos de consulta"
          multiline
          rows={5}
          fullWidth
        />
      </Grid>
      <Grid item md={3} xs={6}>
        <TextInput source="weight" label="Peso" fullWidth />
      </Grid>
      <Grid item md={2} xs={6}>
        <TextInput
          source="headCircunference"
          label="PC"
          title="Perímetro cefálico"
          fullWidth
        />
      </Grid>
      <Grid item md={3} xs={4}>
        <TextInput source="height" label="Talla" fullWidth />
      </Grid>
      <Grid item md={2} xs={4}>
        <TextInput
          source="bloodPressure"
          label="TA"
          title="Tensión arterial"
          fullWidth
        />
      </Grid>
      <Grid item md={2} xs={4}>
        <TextInput source="temp" label="Temp." title="Temperatura" fullWidth />
      </Grid>
      <Grid item md={12} xs={12}>
        <TextInput
          source="results"
          label="Resultados de análisis y estúdios"
          multiline
          rows={4}
          fullWidth
        />
      </Grid>
      <Grid item md={12} xs={12}>
        <TextInput
          source="diagnosis"
          label="Diagnósticos"
          multiline
          rows={4}
          fullWidth
        />
      </Grid>
      <Grid item md={12} xs={12}>
        <TextInput
          source="treatment"
          label="Tratamiento"
          multiline
          rows={6}
          fullWidth
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextInput
          source="nonPathologicalBg"
          label="Antecedentes no patalógicos"
          multiline
          rows={3}
          fullWidth
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextInput
          source="pathologicalBg"
          label="Antecedentes patalógicos"
          multiline
          rows={3}
          fullWidth
        />
      </Grid>
      <Grid item md={12} xs={12}>
        <TextInput
          source="actualMedicines"
          label="Medicamentos que usa"
          multiline
          rows={3}
          fullWidth
        />
      </Grid>
      <Grid item md={12} xs={12}>
        <BooleanInput source="isAllergic" label="Alergias" />
        <TextInput
          source="allergicTo"
          label="Alergias a"
          multiline
          rows={3}
          fullWidth
        />
      </Grid>
      <Grid item md={12} xs={12}>
        <TextInput
          source="vaccination"
          label="Vacunación"
          multiline
          rows={3}
          fullWidth
        />
      </Grid>
      <Grid item md={12} xs={12}>
        <TextInput
          source="surgeries"
          label="Cirugías"
          multiline
          rows={3}
          fullWidth
        />
      </Grid>
    </Grid>
  </>
);

const VisitEditTitle = () => {
  const record = useRecordContext();
  return <span>Consulta {record ? `${record.id} "${record.date}"` : ""}</span>;
};

export function SimpleVisitEdit() {
  return (
    <Edit resource="visits" title={<VisitEditTitle />}>
      <SimpleForm>
        <TextInput disabled source="id" fullWidth />
        <ReferenceInput source="patientId" reference="patients" fullWidth />
        <CommonFields />
      </SimpleForm>
    </Edit>
  );
}

export function VisitEdit() {
  const { patientId, visitId } = useParams();
  return (
    <Edit
      resource="visits"
      id={visitId}
      redirect={`/patients/${patientId}/visits`}
      title={<VisitEditTitle />}
    >
      <SimpleForm>
        <ReferenceField source="patientId" reference="patients" />
        <TextInput disabled source="id" />
        <CommonFields />
      </SimpleForm>
    </Edit>
  );
}

export const SimpleVisitCreate = () => (
  <Create resource="visits">
    <SimpleForm>
      <ReferenceInput source="patientId" reference="patients" />
      <CommonFields />
    </SimpleForm>
  </Create>
);

export function VisitCreate() {
  const { patientId } = useParams();
  return (
    <Create
      record={{ patientId }}
      resource="visits"
      redirect={`/patients/${patientId}/visits`}
    >
      <SimpleForm>
        <BackToPatientButton patientId={patientId!} />
        <ReferenceField source="patientId" reference="patients" />
        <CommonFields />
      </SimpleForm>
    </Create>
  );
}

export default VisitsList;
