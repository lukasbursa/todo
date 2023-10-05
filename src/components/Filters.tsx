import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { Filter } from "../../types/filter";

interface Props {
  notCompletedCount: number;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  isCompleted: boolean;
  deleteCompletedTasks: () => void;
}

const Filters: React.FC<Props> = (props) => {
  return (
    <div className="d-flex align-items-center justify-content-end mt-3">
      <Badge bg="primary" className="d-flex me-auto">
        {props.notCompletedCount} items left
      </Badge>
      <div className="d-flex flex-wrap justify-content-end">
        <Button
          variant="link"
          className={`p-0 ms-3 ${
            props.filter === "all" && "text-secondary text-decoration-none"
          }`}
          onClick={() => props.setFilter("all")}
        >
          All
        </Button>
        <Button
          variant="link"
          className={`p-0 ms-3 ${
            props.filter === "notCompleted" &&
            "text-secondary text-decoration-none"
          }`}
          onClick={() => props.setFilter("notCompleted")}
        >
          Active
        </Button>
        <Button
          variant="link"
          className={`p-0 ms-3 ${
            props.filter === "completed" &&
            "text-secondary text-decoration-none"
          }`}
          onClick={() => props.setFilter("completed")}
        >
          Completed
        </Button>
        {props.isCompleted && (
          <Button
            size="sm"
            variant="danger"
            className="ms-3"
            onClick={props.deleteCompletedTasks}
          >
            Clear completed
          </Button>
        )}
      </div>
    </div>
  );
};

export default Filters;
