import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { Route } from "react-router-dom";

import { PatientList } from "../patients/list";
import { PatientEdit, PatientCreate } from "../patients/form";
import { recordToFullName } from "../patients/utils";

import {
  VisitCreate,
  SimpleVisitCreate,
  VisitEdit,
  SimpleVisitEdit,
  VisitsList,
  VisitsListWithParams,
} from "../visits";

import { theme } from "./theme";

const dataProvider = jsonServerProvider(
  `${import.meta.env.VITE_SERVER_HOST_BASE_URL}/api`
);

const App = () => (
  <Admin theme={theme} dataProvider={dataProvider}>
    <Resource
      name="patients"
      options={{ label: "Pacientes" }}
      list={PatientList}
      edit={PatientEdit}
      create={PatientCreate}
      icon={AccountBoxIcon}
      hasCreate
      hasEdit
      recordRepresentation={recordToFullName}
    >
      <Route path=":patientId/visits/:visitId" element={<VisitEdit />} />
      <Route path=":patientId/visits/create" element={<VisitCreate />} />
      <Route path=":patientId/visits" element={<VisitsListWithParams />} />
    </Resource>
    <Resource
      name="visits"
      options={{ label: "Consultas" }}
      list={VisitsList}
      edit={SimpleVisitEdit}
      create={SimpleVisitCreate}
      icon={EventNoteIcon}
      hasCreate
      hasEdit
    />
  </Admin>
);

export default App;
