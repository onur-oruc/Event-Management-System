package yte.intern.spring.application.usecases.managestudents.entity;

import lombok.Getter;
import lombok.Setter;
import yte.intern.spring.application.usecases.common.entity.BaseEntity;

import javax.persistence.*;
import java.time.LocalDate;

// katılımcı
@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "BOOK_SEQ")
public class Book extends BaseEntity {
    // alttaki üçü gerekli - veri tabanıyla alakalı
   /* @Id
    @GeneratedValue
    private Long id;*/

    @Column(name= "FULL_NAME")
    private String fullname;

    @Column(name= "PUBLISH_DATE")
    private String email;

    @Column(name="TCKIMLIK_NO")
    private String tcKimlikNo;

    @Column(name="REG_DATE")
    private String registrationDate;


    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;
}
