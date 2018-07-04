package modules;

import lombok.Data;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class Employee {

    @Id
    @GeneratedValue (strategy= GenerationType.SEQUENCE)
    private long id;

    private String firstName;
    private String surname;
    private String accountNumber;

    public long getId(){
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }



    private Employee() {}

    public Employee(String firstName, String surname, String accountNumber) {
        this.firstName = firstName;
        this.surname = surname;
        this.accountNumber = accountNumber;
    }
}
