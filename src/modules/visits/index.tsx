import React from "react";
import {
  InfiniteList,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  useRecordContext,
  ReferenceInput,
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
import CreateIcon from "@mui/icons-material/Create";

import { useParams, Link } from "react-router-dom";
import { formatDateStr, parseDate } from "../common/utils";

const filters = [
  <ReferenceInput source="patientId" label="Paciente" reference="patients" />,
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
      <TextField source="diagnosis" label="Dianósticos" />
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
      startIcon={<EditIcon />}
    />
  );
};
const CreateVisitButton = ({ patientId }: IEditVisitButtonProps) => {
  return (
    <Button
      component={Link}
      to={`/patients/${patientId}/visits/create`}
      color="primary"
      label="Create"
      startIcon={<CreateIcon />}
    />
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
    <DateInput
      source="date"
      label="Fecha"
      validate={required()}
      format={formatDateStr}
      parse={parseDate}
    />
    <TextInput
      source="reasons"
      label="Motivos de consulta"
      multiline
      rows={5}
    />
    <TextInput source="weight" label="Peso" type="number" parse={Number} />
    <TextInput
      source="headCircunference"
      label="PC"
      title="Perímetro cefálico"
      type="number"
      parse={Number}
    />
    <TextInput source="height" label="Talla" type="number" parse={Number} />
    <TextInput
      source="bloodPressure"
      label="TA"
      title="Tensión arterial"
      type="number"
      parse={Number}
    />
    <TextInput
      source="temp"
      label="Temp."
      title="Temperatura"
      type="number"
      parse={Number}
    />
    <TextInput
      source="results"
      label="Resultados de análisis y estúdios"
      multiline
      rows={4}
    />
    <TextInput source="diagnosis" label="Diagnósticos" multiline rows={4} />
    <TextInput source="treatment" label="Tratamiento" multiline rows={6} />
    <TextInput
      source="nonPathologicalBg"
      label="Antecedentes no patalógicos"
      multiline
      rows={3}
    />
    <TextInput
      source="pathologicalBg"
      label="Antecedentes patalógicos"
      multiline
      rows={3}
    />
    <TextInput
      source="actualMedicines"
      label="Medicamentos que usa"
      multiline
      rows={3}
    />
    <BooleanInput source="isAllergic" label="Alergias" />
    <TextInput source="allergicTo" label="Alergias a" multiline rows={3} />
    <TextInput source="vaccination" label="Vacunación" multiline rows={3} />
    <TextInput source="surgeries" label="Cirugías" multiline rows={3} />
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
        <TextInput disabled source="id" />
        <ReferenceInput source="patientId" reference="patients" />
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
        <TextInput disabled source="id" />
        <ReferenceField source="patientId" reference="patients" />
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
        <ReferenceField source="patientId" reference="patients" />
        <CommonFields />
      </SimpleForm>
    </Create>
  );
}

export default VisitsList;
