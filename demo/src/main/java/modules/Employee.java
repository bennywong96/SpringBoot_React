package modules;

import lombok.Data;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Employee {

    private @Id
    @GeneratedValue
    Long id;
    private String firstName;

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

    public int getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(int accountNumber) {
        this.accountNumber = accountNumber;
    }

    private String surname;
    private int accountNumber;

    private Employee() {}

    public Employee(String firstName, String surname, int accountNumber) {
        this.firstName = firstName;
        this.surname = surname;
        this.accountNumber = accountNumber;
    }
}
