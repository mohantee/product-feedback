import { Route, Routes } from "react-router-dom";
import { Feedbacks } from "./feedbacks";
import { Feedback } from "./feedback";
import { CreateFeedback } from "./create-feedback";
import { EditFeedback } from "./edit-feedback";

export function FeedbackRoutes() {
  return (
    <Routes>
      <Route path="" element={<Feedbacks />} />
      <Route path=":id" element={<Feedback />} />
      <Route path="create" element={<CreateFeedback />} />
      <Route path="edit" element={<EditFeedback />} />
    </Routes>
  );
}
