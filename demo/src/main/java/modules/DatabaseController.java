package modules;

import org.springframework.beans.factory.annotation.Autowired;
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

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.PUT)
    public List<Employee> edit(@PathVariable long id, @RequestBody Employee employee){
        eRepository.save(employee);
        return eRepository.findAll();
    }

    @DeleteMapping(path= "/delete/{id}")
    public List<Employee> delete(@PathVariable long id){
        eRepository.deleteById(id);
        return eRepository.findAll();
    }

}
