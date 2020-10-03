package yte.intern.spring.application.usecases.managestudents.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Email;

@Getter
@Setter
@ToString
public class BookDTO {
    private String fullname;
    @Email
    private String email;
    private String tcKimlikNo;
    private String registrationDate;
}
