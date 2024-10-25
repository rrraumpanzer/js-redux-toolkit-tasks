import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// BEGIN (write your solution here)
import {fetchTasks, addTask, removeTask, selectors} from '../slices/tasksSlice';
// END

const Tasks = () => {
  const dispatch = useDispatch();
  // BEGIN (write your solution here)
  const tasks = useSelector(selectors.selectAll)
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  
  const handleAddTask = (name) => {
    dispatch(addTask(name));
  }
  const handleRemoveTask = (id) => {
    dispatch(removeTask(id));
  }
  
  // END

  return tasks && (
    <div className="mt-3">
      <ul className="list-group">
        {tasks.map(({ id, name }) => (
          <li key={id} className="list-group-item d-flex">
            <span className="mr-auto">{name}</span>
            <button type="button" className="close" onClick={() => handleRemoveTask(id)}>
              <span>&times;</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
