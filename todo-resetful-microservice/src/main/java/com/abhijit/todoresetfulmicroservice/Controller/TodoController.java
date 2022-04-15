package com.abhijit.todoresetfulmicroservice.Controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.abhijit.todoresetfulmicroservice.Bean.Todo;
import com.abhijit.todoresetfulmicroservice.Service.TodoService;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class TodoController {
	@Autowired
	private TodoService todoService;

	@GetMapping(value = "/users/{name}/todos")
	public List<Todo> listAllTodos(@PathVariable String name) {
		return todoService.findAll();
	}

	@GetMapping(value = "/users/{name}/todos/{id}")
	public Todo listTodo(@PathVariable String name, @PathVariable int id) {
		return todoService.findById(id);
	}

	@PutMapping(value = "/users/{name}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String name, @PathVariable int id, @RequestBody Todo todo) {
		Todo todoUpdated = todoService.save(todo);

		return new ResponseEntity<Todo>(todo, HttpStatus.OK);
	}

	@PostMapping("/users/{username}/todos")
	public ResponseEntity<Void> updateTodo(@PathVariable String username, @RequestBody Todo todo) {

		Todo createdTodo = todoService.save(todo);

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdTodo.getId())
				.toUri();

		return ResponseEntity.created(uri).build();
	}

	@DeleteMapping(value = "/users/{name}/todos/{id}")
	public ResponseEntity<Void> deleteTodos(@PathVariable String name, @PathVariable int id) {

		Todo todo = todoService.delete(name, id);
		if (todo != null) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}

	}

}
