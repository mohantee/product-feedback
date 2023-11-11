import { useParams } from "react-router-dom";

export function Feedback() {
  const { id } = useParams();
  return <h1>Feedback {id}</h1>;
}
