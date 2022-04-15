package com.abhijit.todoresetfulmicroservice.jwt.resource;

import java.io.Serializable;

public class  JwtTokenRequest implements Serializable {
  
  private static final long serialVersionUID = -5616176897013108345L;

  private String username;
    private String password;
    /*
     * {
    "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbjI4bWludXRlcyIsImV4cCI6MTY0OTY5NTE2OCwiaWF0IjoxNjQ5MDkwMzY4fQ.2BincSYQsZ7YOEjXvmJvQ0xAtImite3iub3YeiMc-53EmB5MtjA_0Y0XMCi9C6UIU-T0RyKzULTPTi558OBIBQ"
}
     */

    public JwtTokenRequest() {
        super();
    }

    public JwtTokenRequest(String username, String password) {
        this.setUsername(username);
        this.setPassword(password);
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

