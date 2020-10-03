package yte.intern.spring.application.usecases.managestudents.mapper;

import org.mapstruct.Mapper;
import yte.intern.spring.application.usecases.managestudents.dto.StudentDTO;
import yte.intern.spring.application.usecases.managestudents.entity.Student;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StudentMapper {

    Student mapToEntity(StudentDTO studentDTO);

    StudentDTO mapToDto(Student student);

    List<Student> mapToEntity(List<StudentDTO> studentDTOList);

    List<StudentDTO> mapToDto(List<Student> studentList);
}



