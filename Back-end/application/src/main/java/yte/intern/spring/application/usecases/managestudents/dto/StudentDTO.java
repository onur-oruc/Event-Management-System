package yte.intern.spring.application.usecases.managestudents.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.FutureOrPresent;


@Getter
@Setter
public class StudentDTO {

    @FutureOrPresent
    private String startDate;
    @FutureOrPresent
    private String endDate;

    private String address;
    private Long quota;
    private String studentNumber; // event name
    private String lat;
    private String lng;
    private Long numParticipants;
}
