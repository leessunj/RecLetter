package com.springtowinter.springboottemplate.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class UserInfo {

  private String userId;
  private String userName;

  public UserInfo(User user) {
    if(user != null) {
      this.userId = user.getUserId();
      this.userName = user.getUserNickname();
    }
  }
}