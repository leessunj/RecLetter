package com.sixcube.recletter.user.exhandler;

import com.sixcube.recletter.auth.exception.EmailAlreadyExistsException;
import com.sixcube.recletter.user.exception.EmailNotVerifiedException;
import com.sixcube.recletter.user.exception.IdAlreadyExistsException;
import com.sixcube.recletter.user.exception.WrongPasswordException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice(basePackages = "com.sixcube.recletter.user.controller")
public class UserExceptionHandler {

  private void makeErrorMessage(StringBuilder errorMessage, Exception e) {
    StackTraceElement[] stackTrace = e.getStackTrace();

    if (stackTrace.length > 0) {
      StackTraceElement topFrame = stackTrace[0];
      String className = topFrame.getClassName();
      String methodName = topFrame.getMethodName();

      errorMessage.append(className).append(".").append(methodName).append(": ");
    }
  }

  @ExceptionHandler(EmailNotVerifiedException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  protected ResponseEntity<String> emailNotVerifiedExceptionHandler(EmailNotVerifiedException e) {
    StringBuilder errorMessage = new StringBuilder();

    makeErrorMessage(errorMessage, e);

    errorMessage.append("이메일 인증이 완료되지 않았습니다.");
    return ResponseEntity.badRequest().body(errorMessage.toString());
  }

  @ExceptionHandler(IdAlreadyExistsException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  protected ResponseEntity<String> idAlreadyExistsExceptionHandler(IdAlreadyExistsException e) {
    StringBuilder errorMessage = new StringBuilder();

    makeErrorMessage(errorMessage, e);

    errorMessage.append("이미 존재하는 아이디입니다.");
    return ResponseEntity.badRequest().body(errorMessage.toString());
  }

  @ExceptionHandler(WrongPasswordException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  protected ResponseEntity<String> wrongPasswordExceptionHandler(WrongPasswordException e) {
    StringBuilder errorMessage = new StringBuilder();

    makeErrorMessage(errorMessage, e);

    errorMessage.append("기존 비밀번호를 잘못 입력하였습니다.");
    return ResponseEntity.badRequest().body(errorMessage.toString());
  }
}
