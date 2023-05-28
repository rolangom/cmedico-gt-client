import { useRecordContext, Button } from "react-admin";
import { Link } from "react-router-dom";
import EventNoteIcon from "@mui/icons-material/EventNote";

export const ConsultasButton = () => {
  const record = useRecordContext();
  return (
    <Button
      component={Link}
      to={`/patients/${record.id}/visits`}
      color="primary"
      label="Consultas"
      startIcon={<EventNoteIcon />}
    />
  );
};
