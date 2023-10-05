import ListGroup from "react-bootstrap/ListGroup";
import OneTask from "./OneTask";
import Task from "../../types/task";

interface Props {
  tasks: Task[];
  deleteHandler: (id: number) => void;
  completeHandler: (id: number) => void;
  editHandler: (id: number, newText: string) => void;
}

const Tasks: React.FC<Props> = (props) => {
  return (
    <ListGroup>
      {props.tasks.map((oneTask) => {
        return (
          <OneTask
            key={oneTask.id}
            task={oneTask}
            deleteHandler={props.deleteHandler}
            completeHandler={props.completeHandler}
            editHandler={props.editHandler}
          />
        );
      })}
    </ListGroup>
  );
};

export default Tasks;
