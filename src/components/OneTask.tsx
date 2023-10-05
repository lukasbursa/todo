import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BsTrashFill, BsPencilFill, BsCheckSquareFill } from "react-icons/bs";
import Task from "../../types/task";

interface Props {
  task: Task;
  deleteHandler: (id: number) => void;
  completeHandler: (id: number) => void;
  editHandler: (id: number, newText: string) => void;
}

const OneTask: React.FC<Props> = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [textValue, setTextValue] = useState<string>(props.task.text);

  const editTask = () => {
    props.editHandler(props.task.id, textValue);
    setIsEdit(false);
  };

  return (
    <ListGroup.Item>
      <Form.Check className="d-flex align-items-center m-0 px-0 py-2">
        <Form.Check.Input
          type="checkbox"
          checked={props.task.isCompleted}
          id={"task-" + props.task.id}
          className="m-0"
          onChange={() => props.completeHandler(props.task.id)}
        />
        {!isEdit && (
          <>
            <Form.Check.Label
              htmlFor={"task-" + props.task.id}
              className={`px-3 ${
                props.task.isCompleted
                  ? "text-decoration-line-through text-secondary"
                  : ""
              }`}
            >
              {props.task.text}
            </Form.Check.Label>
          </>
        )}
        {isEdit && (
          <Form.Control
            type="text"
            className="mx-3"
            value={textValue}
            onChange={(event) => setTextValue(event.target.value)}
            id={"edit-" + props.task.id}
          />
        )}
        <div className="ms-auto d-flex">
          {!isEdit && (
            <Button
              variant="link"
              className="p-0"
              onClick={() => setIsEdit(true)}
            >
              <BsPencilFill className="text-primary" size={20} />
            </Button>
          )}
          {isEdit && (
            <Button variant="link" className="p-0" onClick={editTask}>
              <BsCheckSquareFill className="text-success" size={20} />
            </Button>
          )}
          <Button
            variant="link"
            className="ms-2 p-0"
            onClick={() => props.deleteHandler(props.task.id)}
          >
            <BsTrashFill className="text-danger" size={20} />
          </Button>
        </div>
      </Form.Check>
    </ListGroup.Item>
  );
};

export default OneTask;
