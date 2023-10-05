import { FormEventHandler } from "react";
import Form from "react-bootstrap/Form";

interface FormElements extends HTMLFormControlsCollection {
  newTask: HTMLInputElement;
}
interface NewTaskForm extends HTMLFormElement {
  readonly elements: FormElements;
}

interface Props {
  newTaskHandler: (text: string) => void;
}

const NewTask: React.FC<Props> = (props) => {
  const handleSubmit: FormEventHandler<NewTaskForm> = (event) => {
    event.preventDefault();
    props.newTaskHandler(event.currentTarget.elements.newTask.value);
    event.currentTarget.elements.newTask.value = "";
  };

  return (
    <Form className="mb-3" onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        className="p-3"
        placeholder="What needs to be done?"
        name="newTask"
      />
    </Form>
  );
};

export default NewTask;
