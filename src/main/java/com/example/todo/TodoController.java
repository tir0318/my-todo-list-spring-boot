package com.example.todo;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TodoController {
    private final TodoItemRepository todoItemRepository;

    @GetMapping("/hello")
    public String hello() {
        return "Hello, Todo List!";
    }

    @PostMapping("/todo")
    public TodoItem addTodo(@RequestBody TodoItem item) {
        return todoItemRepository.save(item);
    }

    @GetMapping("/todos")
    public List<TodoItem> getAllTodos() {
        return todoItemRepository.findAll();
    }

    @PutMapping("/todo/{id}")
    public TodoItem updateTodo(@PathVariable Long id, @RequestBody TodoItem updatedItem) {
        if (todoItemRepository.existsById(id)) {
            updatedItem.setId(id);
            return todoItemRepository.save(updatedItem);
        }
        return null;
    }

    @DeleteMapping("/todo/{id}")
    public String deleteTodo(@PathVariable Long id) {
        if (todoItemRepository.existsById(id)) {
            todoItemRepository.deleteById(id);
            return "Todo item with ID " + id + " has been deleted.";
        }
        return "Todo item not found.";
    }
}