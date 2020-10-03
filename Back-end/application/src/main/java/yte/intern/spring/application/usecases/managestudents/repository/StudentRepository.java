package yte.intern.spring.application.usecases.managestudents.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.spring.application.usecases.managestudents.entity.Student;

import javax.transaction.Transactional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByStudentNumber(String studentNumber);

    @Transactional // ödev çözümü 2 - 20.dakika önemli
    void deleteByStudentNumber(String studentNumber);
}
