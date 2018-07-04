package modules;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping(value = "/api/employees")
public class DatabaseController {
    private EmployeeRepository eRepository;

    @Autowired
    public DatabaseController(EmployeeRepository repository) {
        this.eRepository = repository;
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Employee> getAllAccounts(){
        eRepository.findAll();
        return eRepository.findAll();
    }
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public List<Employee> create(@RequestBody Employee employee){
        eRepository.save(employee);
        return eRepository.findAll();
    }

    @DeleteMapping(path= "/delete/{id}")
    public List<Employee> delete(@PathVariable long id){
        eRepository.deleteById(id);
        return eRepository.findAll();
    }

//    @Override
//    public void run(String... strings) throws Exception {
//        this.eRepository.save(new Employee("Joe", "Biden", 5));
//        this.eRepository.save(new Employee("President", "Obama", 8));
//        this.eRepository.save(new Employee("Crystal",  "Mac", 34));
//        this.eRepository.save(new Employee("James", "Henry", 33));
//    }
}
