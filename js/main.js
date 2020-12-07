'use strict';

const todoControl = document.querySelector('.todo-control'),
headerInput = document.querySelector('.header-input'),
todoList = document.querySelector('.todo-list'),
todoCompleted = document.querySelector('.todo-completed');

const todoData = JSON.parse(localStorage.getItem('todo')) || [];

const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  
  todoData.forEach(function(item) {
    console.log(item);
    const listItem = document.createElement('li');
    listItem.classList.add('todo-item');

    listItem.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
    '<div class="todo-buttons">' +
    '<button class="todo-remove"></button>' +
    '<button class="todo-complete"></button>' +
    '</div>';
    

    if (item.completed) {
      todoCompleted.append(listItem);
    } else {
      todoList.append(listItem);
    }

    const buttonTodoComplete = listItem.querySelector('.todo-complete');
    buttonTodoComplete.addEventListener('click', function() {
      item.completed = !item.completed;
      render();
    });
    const buttonTodoRemove = listItem.querySelector('.todo-remove');
    buttonTodoRemove.addEventListener('click', function() {
      todoData.splice(todoData.indexOf(item), 1);
      listItem.remove();
      render();
    });
  });
  localStorage.setItem('todo', JSON.stringify(todoData));
};



todoControl.addEventListener('submit', function(event) {
  event.preventDefault();

  const newTodo = {
    value: headerInput.value,
    completed: false
  };

  
  if (headerInput.value !== '') {
    todoData.push(newTodo);
    render();
    headerInput.value = '';
  }
});
render();
