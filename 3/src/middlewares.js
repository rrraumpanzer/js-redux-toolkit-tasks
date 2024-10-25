const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("dispatching", action);
  const result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

const addDate = (store) => (next) => (action) => {
  // BEGIN (write your solution here)
  if (action.type === 'TASK_ADD') {
    const currentDate = new Date().toLocaleDateString('ru-RU');
    const addText = {
      ...action,
      payload: {
        task: {
          ...action.payload.task,
          text: `Задача на ${currentDate}: ${action.payload.task.text}`
        }
      }
    };
    return next(addText);
  }
  return next(action);
  // END
};

export default { logger, addDate };
