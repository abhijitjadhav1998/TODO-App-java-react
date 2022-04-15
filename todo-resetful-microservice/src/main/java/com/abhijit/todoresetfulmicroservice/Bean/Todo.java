package com.abhijit.todoresetfulmicroservice.Bean;

import java.util.Date;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
@Entity
public class Todo {
	@Id
	@GeneratedValue
	private Integer id;
	private String userName;
	private String description;
	private boolean status;
	private Date targetDate;

	

	public Todo() {
		super();
	}

	public Todo(int id, String userName, String description, boolean status, Date targetDate) {
		super();
		this.id = id;
		this.userName = userName;
		this.description = description;
		this.status = status;
		this.targetDate = targetDate;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Date getTargetDate() {
		return targetDate;
	}

	public void setTargetDate(Date targetDate) {
		this.targetDate = targetDate;
	}

	@Override
	public int hashCode() {
		return Objects.hash(description, id, status, targetDate, userName);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Todo other = (Todo) obj;
		return Objects.equals(description, other.description) && id == other.id && status == other.status
				&& Objects.equals(targetDate, other.targetDate) && Objects.equals(userName, other.userName);
	}
	

}
