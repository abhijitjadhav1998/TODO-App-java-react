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
import com.abhijit.todoresetfulmicroservice.Repository.TodoJpaRepository;
import com.abhijit.todoresetfulmicroservice.Service.TodoService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TodoJPAController {
	
	@Autowired
	private TodoJpaRepository todoJpaRepository;

	@GetMapping(value = "/jpa/users/{name}/todos")
	public List<Todo> listAllTodos(@PathVariable String name) {
		return todoJpaRepository.findByUserName(name);
	}

	@GetMapping(value = "/jpa/users/{name}/todos/{id}")
	public Todo listTodo(@PathVariable String name, @PathVariable int id) {
		return todoJpaRepository.findById(id).get();
	}

	@PutMapping(value = "/jpa/users/{name}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String name, @PathVariable int id, @RequestBody Todo todo) {
		todo.setUserName(name);
		Todo todoUpdated = todoJpaRepository.save(todo);
		return new ResponseEntity<Todo>(todo, HttpStatus.OK);
	}

	@PostMapping("/jpa/users/{username}/todos")
	public ResponseEntity<Void> createTodo(@PathVariable String username, @RequestBody Todo todo) {
		todo.setUserName(username);
		Todo createdTodo = todoJpaRepository.save(todo);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdTodo.getId())
				.toUri();

		return ResponseEntity.created(uri).build();
	}

	@DeleteMapping(value = "/jpa/users/{name}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String name, @PathVariable int id) {
		todoJpaRepository.deleteById(id);
		return ResponseEntity.noContent().build();

	}
	@PutMapping(value = "/jpa/users/{name}/todos/{id}/incomplete")
	public ResponseEntity<Todo> markAsInComplete(@PathVariable String name, @PathVariable int id) {
		Todo todo = todoJpaRepository.findById(id).get();
		todo.setStatus(false);
		todo = todoJpaRepository.save(todo);
		return new ResponseEntity<Todo>(todo, HttpStatus.OK);
	}
	@PutMapping(value = "/jpa/users/{name}/todos/{id}/complete")
	public ResponseEntity<Todo> markAsComplete(@PathVariable String name, @PathVariable int id) {
		Todo todo = todoJpaRepository.findById(id).get();
		todo.setStatus(true);
		todo = todoJpaRepository.save(todo);
		return new ResponseEntity<Todo>(todo, HttpStatus.OK);
	}

	@GetMapping(value = "/jpa/users/{name}/activetodos")
	public List<Todo> listActiveTodos(@PathVariable String name) {
		return todoJpaRepository.findByUserNameAndStatus(name,false);
	}
	@GetMapping(value = "/jpa/users/{name}/completedtodos")
	public List<Todo> listCompletedTodos(@PathVariable String name) {
		return todoJpaRepository.findByUserNameAndStatus(name,true);
	}

}
