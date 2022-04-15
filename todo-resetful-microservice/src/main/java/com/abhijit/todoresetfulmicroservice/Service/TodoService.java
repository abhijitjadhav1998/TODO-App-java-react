package com.abhijit.todoresetfulmicroservice.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.abhijit.todoresetfulmicroservice.Bean.Todo;

@Service
public class TodoService {
	private static List<Todo> todos = new ArrayList<>();
	private static int idCounter = 0;

	static {
		todos.add(new Todo(++idCounter, "AJ", "Learn to Dance 2", false, new Date()));
		todos.add(new Todo(++idCounter, "AJ", "Learn about Microservices 2", false, new Date()));
		todos.add(new Todo(++idCounter, "AJ", "Learn about Angular", false, new Date()));
	}

	public List<Todo> findAll() {
		return todos;
	}

	public Todo delete(String name, int id) {
		Todo todo = findById(id);
		if (todo != null) {
			todos.remove(todo);
			return todo;
		} else
			return null;
	}
/*
 * Unused method can be user in further
 * 
	private Todo findByIdAndName(int id, String name) {
		for (Todo todo : todos) {
			if (todo.getId() == id && todo.getUserName().equals(name)) {
				return todo;
			}
		}
		return null;
	}
	*/

	public Todo findById(int id) {
		for (Todo todo : todos) {
			if (todo.getId() == id) {
				return todo;
			}
		}
		return null;
	}

	public Todo save(Todo todo) {
		if (todo.getId() == -1 || todo.getId() == 0) {
			todo.setId(++idCounter);
			todos.add(todo);
		} else {
			deleteById(todo.getId());
			todos.add(todo);
		}
		return todo;
	}

	private Todo deleteById(int id) {
		Todo todo = findById(id);
		if (todo != null) {
			todos.remove(todo);
			return todo;
		} else
			return null;
		
	}

}
