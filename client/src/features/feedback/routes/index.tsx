import { Route, Routes } from "react-router-dom";
import { Feedback } from "./feedback/feedback";
import { CreateFeedback } from "./create-feedback/create-feedback";
import { EditFeedback } from "./edit-feedback/edit-feedback";
import { Feedbacks } from "./feedbacks";

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
