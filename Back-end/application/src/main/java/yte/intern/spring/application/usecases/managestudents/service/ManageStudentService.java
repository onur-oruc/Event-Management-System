package yte.intern.spring.application.usecases.managestudents.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yte.intern.spring.application.usecases.common.MessageResponse;
import yte.intern.spring.application.usecases.common.enums.MessageType;
import yte.intern.spring.application.usecases.managestudents.entity.Book;
import yte.intern.spring.application.usecases.managestudents.entity.Student;
import yte.intern.spring.application.usecases.managestudents.repository.BookRepository;
import yte.intern.spring.application.usecases.managestudents.repository.StudentRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ManageStudentService {

    private final StudentRepository studentRepository;
    private final BookRepository bookRepository;

    public MessageResponse addStudent(Student student) {
        if ( student.getStudentNumber() == null || student.getStudentNumber() == "" ) {
            return new MessageResponse("Failed to add event because the event name field was empty.", MessageType.ERROR);
        }
        //add student to database
        student.setNumParZero();
        student.setBooks(Set.of());
        studentRepository.save(student);
        return new MessageResponse(String.format("Successfully added the event called %s",student.getStudentNumber()) , MessageType.SUCCESS);
    }

    public List<Student> listAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentByStudentNumber(String studentNumber) {
        return studentRepository.findByStudentNumber(studentNumber);
    }



    public MessageResponse deleteStudent(String studentNumber) {
        studentRepository.deleteByStudentNumber(studentNumber);

        return new MessageResponse(String.format(" Successfully deleted the event called %s", studentNumber), MessageType.SUCCESS);
    }

    public MessageResponse updateStudent(String studentNumber, Student student) {

        Student studentFromDB = studentRepository.findByStudentNumber(studentNumber);

        if (studentFromDB != null)
        {
            if ( student.getQuota() != null && studentFromDB.getNumParticipants() > student.getQuota() ) {
                return new MessageResponse(String.format("The quota you tried to set is less than the current number of participants. Failed to update event with event name %s", studentNumber), MessageType.ERROR);
            }

            updateStudentField(student, studentFromDB);
            studentRepository.save(studentFromDB);

            return new MessageResponse(String.format("Successfully updated event with event name %s", studentNumber), MessageType.SUCCESS);
        }

        return new MessageResponse(String.format("Failed to update event with event name %s", studentNumber), MessageType.ERROR);
    }

    private void updateStudentField(Student student, Student studentFromDB) {

        if ( student.getStudentNumber() != null && !student.getStudentNumber().equals("") ) {
            studentFromDB.setStudentNumber(student.getStudentNumber());
        }
        if ( student.getAddress() != null && !student.getAddress().equals("") ) {
            studentFromDB.setAddress(student.getAddress());
        }
        if ( student.getQuota() != null && student.getQuota() > 0 ) {
            studentFromDB.setQuota(student.getQuota());
        }
        if ( student.getStartDate() != null ) {
            studentFromDB.setStartDate(student.getStartDate());
        }
        if ( student.getEndDate() != null ) {
            studentFromDB.setEndDate(student.getEndDate());
        }

    }

    public List<Book> getStudentBooks(String studentNumber) {
        Student student = studentRepository.findByStudentNumber(studentNumber);
        return new ArrayList<>(student.getBooks());
    }

    public MessageResponse addBookToStudent(String studentNumber, Book book) {
        Student student = studentRepository.findByStudentNumber(studentNumber);
        String tc = book.getTcKimlikNo();
        String em = book.getEmail();

        List<Book> books = getStudentBooks(studentNumber);

        for ( int i = 0; i < books.size(); i++) {

            if ( books.get(i).getTcKimlikNo().equals(tc)) {
                return new MessageResponse(String.format("FAILED: There is already someone with TC KIMLIK NO: %s", tc), MessageType.ERROR);
            }
            if ( books.get(i).getEmail().equals(em)) {
                return new MessageResponse(String.format("FAILED: There is already someone with EMAIL: %s", tc), MessageType.ERROR);
            }
        }

        if ( student.hasSpace() ) {

            student.incNumPar();
            book.setStudent(student);
            Book savedBook = bookRepository.save(book);
            student.getBooks().add(savedBook);
            studentRepository.save(student);

            return new MessageResponse(String.format("Successfully added participant to %s", studentNumber), MessageType.SUCCESS);
        }
        else {
            System.out.println("no :)");
            return new MessageResponse(String.format("Failed to add a new participant to %s", studentNumber), MessageType.ERROR);
        }

    }
}
