package yte.intern.spring.application.usecases.managestudents.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import yte.intern.spring.application.usecases.common.MessageResponse;
import yte.intern.spring.application.usecases.managestudents.dto.BookDTO;
import yte.intern.spring.application.usecases.managestudents.dto.StudentDTO;
import yte.intern.spring.application.usecases.managestudents.entity.Book;
import yte.intern.spring.application.usecases.managestudents.entity.Student;
import yte.intern.spring.application.usecases.managestudents.mapper.BookMapper;
import yte.intern.spring.application.usecases.managestudents.mapper.StudentMapper;
import yte.intern.spring.application.usecases.managestudents.service.ManageStudentService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/students")
public class ManageStudentController {


    private final StudentMapper studentMapper;
    private final ManageStudentService manageStudentService;
    private final BookMapper bookMapper;

    @GetMapping
    public List<StudentDTO> listAllStudents() {
        List<Student> students = manageStudentService.listAllStudents();

        return studentMapper.mapToDto(students);
    }

    @GetMapping("/{studentNumber}")
    public StudentDTO getStudentByStudentNumber(@PathVariable String studentNumber) {
        Student student = manageStudentService.getStudentByStudentNumber(studentNumber);

        return studentMapper.mapToDto(student);
    }

    @PostMapping
    public MessageResponse addStudent(@RequestBody StudentDTO studentDTO) {
        Student student = studentMapper.mapToEntity( studentDTO);
        return manageStudentService.addStudent(student);
    }

    @PutMapping("/{studentNumber}")
    public MessageResponse updateStudent(@PathVariable String studentNumber, @RequestBody StudentDTO studentDTO) {
        Student student = studentMapper.mapToEntity(studentDTO);
        return manageStudentService.updateStudent(studentNumber, student);
    }

    @DeleteMapping("/{studentNumber}")
    public MessageResponse deleteStudentByStudentNumber(@PathVariable String studentNumber){
        return manageStudentService.deleteStudent(studentNumber);
    }

    @GetMapping("/{studentNumber}/books")
    public List<BookDTO> getStudentBooks(@PathVariable String studentNumber) {
        List<Book> books = manageStudentService.getStudentBooks(studentNumber);
        return bookMapper.mapToDto(books);
    }

    @PostMapping("/{studentNumber}/books")
    public MessageResponse addBookToStudent(@PathVariable String studentNumber, @RequestBody BookDTO bookDTO) {
        return manageStudentService.addBookToStudent(studentNumber, bookMapper.mapToEntity(bookDTO));
    }
}
