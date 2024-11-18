import React from 'react'
const ToDoCard = () => {
  let isCompleted = true;
  const cardColor = isCompleted ? "notCompleted" : "completed";
  return (
    <div className={`todo-card ${cardColor}`}>
      <div className='todo-head'>
        <div className={`todo-date ${cardColor}`}>Date</div>
        <div>
          <form>
            <input type='checkbox' name='status'/>
          </form>
        </div>
      </div>
      <div className={`todo-content ${cardColor}`}>
        welcome to the to do page
      </div>
    </div>
  )
}
export default ToDoCard