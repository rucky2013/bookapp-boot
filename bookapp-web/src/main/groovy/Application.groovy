package ch.bfh.swos.bookapp

import org.hibernate.annotations.GenericGenerator
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.context.web.SpringBootServletInitializer
import org.springframework.context.annotation.Configuration
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.data.rest.core.config.Projection
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration
import org.springframework.format.annotation.DateTimeFormat

import javax.persistence.*

@EnableAutoConfiguration
class Application extends RepositoryRestMvcConfiguration {

    @Override
    protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.setBasePath("/api")
        config.exposeIdsFor(Book.class)
        config.exposeIdsFor(Author.class)
        config.setReturnBodyOnCreate(true)
        config.setReturnBodyOnUpdate(true)
    }

    static void main(String[] args) {
        SpringApplication.run Application, args
    }
}

@Configuration
public class WebConfig extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        application.sources(Application.class)
        return super.configure(application)
    }
}

@RepositoryRestResource(path = "books") interface BookRepository extends PagingAndSortingRepository<Book, String> {}
@RepositoryRestResource(path = "authors") interface AuthorRepository extends PagingAndSortingRepository<Author, String> {}

@Projection(name = "inlineAuthor", types = Book.class) interface InlineAuthor {
    String getId();
    String getTitle();
    Date getReleasedate();
    Author getAuthor();
}

@Entity
class Book {
    @Id @GeneratedValue(generator = "uuid") @GenericGenerator(name = "uuid", strategy = "uuid") String id
    String title
    @DateTimeFormat(iso=DateTimeFormat.ISO.DATE) Date releasedate
    @ManyToOne @JoinColumn Author author
}

@Entity
class Author {
    @Id @GeneratedValue(generator = "uuid") @GenericGenerator(name = "uuid", strategy = "uuid") String id
    String firstname
    String lastname
}