package com.abhijit.todoresetfulmicroservice.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abhijit.todoresetfulmicroservice.Bean.Todo;

@Repository	
public interface TodoJpaRepository extends JpaRepository<Todo, Integer> {
	List<Todo> findByUserName(String userName);

	List<Todo> findByUserNameAndStatus(String name,boolean status);
}
