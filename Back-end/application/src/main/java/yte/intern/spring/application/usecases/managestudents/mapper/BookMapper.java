package yte.intern.spring.application.usecases.managestudents.mapper;


import org.mapstruct.Mapper;
import yte.intern.spring.application.usecases.managestudents.dto.BookDTO;
import yte.intern.spring.application.usecases.managestudents.entity.Book;

import java.util.List;


@Mapper(componentModel = "spring")
public interface BookMapper {

    BookDTO mapToDto(Book book);

    List<BookDTO> mapToDto(List<Book> bookList);

    Book mapToEntity(BookDTO bookDTO);

    List<Book> mapToEntity(List<BookDTO> bookDTOList);
}
