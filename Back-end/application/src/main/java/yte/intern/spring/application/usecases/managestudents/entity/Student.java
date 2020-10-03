package yte.intern.spring.application.usecases.managestudents.entity;

import lombok.Getter;
import lombok.Setter;
import yte.intern.spring.application.usecases.common.entity.BaseEntity;

import javax.persistence.*;
import java.util.Set;

// event
@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "STUDENT_SEQ")
public class Student extends BaseEntity {

    @Column(name="START_DATE")
    private String startDate;

    @Column(name="END_DATE")
    private String endDate;

    @Column(name="ADDRESS")
    private String address;

    @Column(name="QUOTA")
    private Long quota;

    @Column(name = "STUDENT_NUMBER", unique = true)
    private String studentNumber; // event name

    @Column(name="LAT")
    private String lat;

    @Column(name="LNG")
    private String lng;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "student")
    private Set<Book> books;

    private Long numParticipants;

    public boolean hasSpace() {
        return numParticipants < quota;
    }

    public void setNumParZero() {
        numParticipants = new Long(0);
    }

    public void incNumPar() {
        numParticipants++;
    }

}
