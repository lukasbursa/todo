import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tasks from "./components/Tasks";
import NewTask from "./components/NewTask";
import Filters from "./components/Filters";
import Task from "../types/task";
import { Filter } from "../types/filter";

function App() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [notCompletedCount, setNotCompletedCount] = useState(0);

  useEffect(() => {
    const notCompletedTasks = allTasks.filter((oneTask) => {
      return oneTask.isCompleted === false;
    });
    setNotCompletedCount(notCompletedTasks.length);
    if (filter === "all") {
      setFilteredTasks(allTasks);
    } else if (filter === "completed") {
      setFilteredTasks(allTasks.filter((oneTask) => oneTask.isCompleted));
    } else {
      setFilteredTasks(allTasks.filter((oneTask) => !oneTask.isCompleted));
    }
  }, [allTasks, filter]);

  const newTaskHandler = (text: string) => {
    const id = new Date().valueOf(); // nemusí být unikátní, pokud někdo přidá 2 tasky v 1 ms (v ostré verzi aplikace by bylo vhodné generovat unikátní id jinak)
    setAllTasks([...allTasks, { id: id, text: text, isCompleted: false }]);
    if (filter === "completed") setFilter("all"); // změní filter na "all", aby šel vidět nově přidaný úkol
  };

  const completedHandler = (id: number) => {
    const updatedTasks = allTasks.map((oneTask) =>
      oneTask.id === id
        ? { ...oneTask, isCompleted: !oneTask.isCompleted }
        : oneTask
    );
    setAllTasks(updatedTasks);
  };

  const editHandler = (id: number, newText: string) => {
    const updatedTasks = allTasks.map((oneTask) =>
      oneTask.id === id ? { ...oneTask, text: newText } : oneTask
    );
    setAllTasks(updatedTasks);
  };

  const deleteHandler = (id: number) => {
    const filteredTasks = allTasks.filter((oneTask) => oneTask.id !== id);
    setAllTasks(filteredTasks);
  };

  const deleteCompletedTasks = () => {
    const notCompletedTasks = allTasks.filter(
      (oneTask) => !oneTask.isCompleted
    );
    setAllTasks(notCompletedTasks);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={10} lg={8} xl={6} className="my-5">
          <h1 className="text-center mb-3">To Do App</h1>
          <NewTask newTaskHandler={newTaskHandler} /> d
          <Tasks
            tasks={filteredTasks}
            deleteHandler={deleteHandler}
            completeHandler={completedHandler}
            editHandler={editHandler}
          />
          <Filters
            notCompletedCount={notCompletedCount}
            filter={filter}
            setFilter={setFilter}
            isCompleted={allTasks.length > notCompletedCount}
            deleteCompletedTasks={deleteCompletedTasks}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
