import entities.*;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

public class Engine implements Runnable {
    private final EntityManager entityManager; // Private field so that the entity manager is accessible from all classes which implement the engine
    private BufferedReader bufferedReader;

    public Engine(EntityManager entityManager) {
        this.entityManager = entityManager;
        this.bufferedReader = new BufferedReader(new InputStreamReader(System.in));
    }

    @Override
    public void run() {
        System.out.println("Select exercise number:");
        try {
            int exerciseNumber = Integer.parseInt(bufferedReader.readLine());
            switch (exerciseNumber) {
                case 2 -> changeCasingExercise2();
                case 3 -> containsEmployeeExercise3();
                case 4 -> employeesWithSalaryOver50_000Exercise4();
                case 5 -> employeesFromRDDepartmentExercise5();
                case 6 -> exercise6();
                case 7 -> exercise7();
                case 8 -> exercise8();
                case 9 -> exercise9();
                case 10 -> exercise10();
                case 11 -> exercise11();
                case 12 -> exercise12();
                case 13 -> exercise13();
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            entityManager.close();
        }
    }

    private void exercise13() throws IOException {
        System.out.println("Enter town name:");
        String townName = bufferedReader.readLine();

        Town town = entityManager.createQuery("SELECT t FROM Town t WHERE t.name = :town_name", Town.class)
                .setParameter("town_name", townName)
                .getSingleResult();

        int removedAddressesByTownName = removedAddressesByTownName(town.getId());

        entityManager.getTransaction().begin();
        entityManager.remove(town);
        entityManager.getTransaction().commit();

        System.out.printf("%d address in %s deleted\n", removedAddressesByTownName, townName);
    }

    private int removedAddressesByTownName(int townId) {
        // Get the address
        List<Address> addresses = entityManager.createQuery("SELECT a FROM Address a WHERE a.town.id = :town_id", Address.class)
                .setParameter("town_id", townId)
                .getResultList();

        int result = addresses.size();

        entityManager.getTransaction().begin();
        // Delete the addresses after having set cascade == Remove in address class in the connection with employees
        addresses.forEach(entityManager::remove);
        entityManager.getTransaction().commit();

        return result;
    }

    private void exercise12() {
        List<Department> departmentList = entityManager.createQuery("SELECT d FROM Department d " +
                "JOIN Employee e ON e.department.id = d.id " +
                "GROUP BY d.id " +
                "HAVING MAX (e.salary) NOT BETWEEN 30000 AND 70000", Department.class)
                .getResultList();

        for (Department department : departmentList) {
            Optional<BigDecimal> max = department.getEmployees()
                    .stream()
                    .map(Employee::getSalary)
                    .max(Comparator.naturalOrder());

            System.out.printf("%s %.2f\n", department.getName(), max.get());
        }

    }

    private void exercise11() throws IOException {
        String beginPattern = bufferedReader.readLine();
        entityManager.createQuery("SELECT e FROM Employee e WHERE substring(e.firstName, 1, 2) = :begin_pattern", Employee.class)
                .setParameter("begin_pattern", beginPattern)
                .getResultList()
                .forEach(employee -> {
                    System.out.printf("%s %s - %s - (%.2f)\n", employee.getFirstName(),
                            employee.getLastName(),
                            employee.getJobTitle(),
                            employee.getSalary());
                });
    }

    private void exercise10() {
        entityManager.createQuery("SELECT e FROM Employee e WHERE e.department.name IN :departments", Employee.class)
                .setParameter("departments",
                        Arrays.asList("Engineering", "Tool Design", "Marketing", "Information Services"))
                .getResultList()
                .forEach(employee -> {
                    // Begin transaction
                    entityManager.getTransaction().begin();

                    // Increase the salary
                    employee.setSalary(employee.getSalary().multiply(new BigDecimal("1.12")));

                    // Commit transaction
                    entityManager.getTransaction().commit();

                    // Print message
                    System.out.printf("%s %s (%.2f)\n", employee.getFirstName(), employee.getLastName(), employee.getSalary());
                });
    }

    private void exercise9() {
        entityManager.createQuery("SELECT p FROM Project p " +
                "ORDER BY p.startDate DESC ", Project.class)
                .setMaxResults(10)
                .getResultList()
                .stream()
                .sorted(Comparator.comparing(Project::getName))
                .forEach(project -> {
                    System.out.println("Project name: " + project.getName());
                    System.out.println("    Project Description: " + project.getDescription());
                    System.out.println("    Project Start Date: " + project.getStartDate());
                    System.out.println("    Project End Date: " + project.getEndDate());
                });
    }

    private void exercise8() throws IOException {
        int id = Integer.parseInt(bufferedReader.readLine());
        Employee employee = entityManager.find(Employee.class, id);
        System.out.println(employee.getFirstName() + " " + employee.getLastName() + " - " + employee.getJobTitle());
        employee.getProjects()
                .stream()
                .map(Project::getName)
                .sorted(Comparator.naturalOrder())
                .forEach(System.out::println);
    }

    private void exercise7() {
        List<Address> addresses = entityManager.createQuery("SELECT address FROM Address address " +
                "ORDER BY address.employees.size DESC", Address.class)
                .setMaxResults(10)
                .getResultList();

        addresses.forEach(address -> {
            System.out.printf("%s, %s - %d employees\n", address.getText(),
                    address.getTown() == null ? "Unknown" : address.getTown().getName(),
                    address.getEmployees().size());
        });
    }

    private void exercise6() throws IOException {
        System.out.println("Enter employee last name:");
        String lastName = bufferedReader.readLine();

        Address address = createAddress();

        // Find the employee
        Employee employee = entityManager.createQuery("SELECT e FROM Employee e WHERE e.lastName = :last_name", Employee.class)
                .setParameter("last_name", lastName)
                .getSingleResult();

        entityManager.getTransaction().begin();
        employee.setAddress(address);
        entityManager.getTransaction().commit();
    }

    private Address createAddress() {
        Address address = new Address();
        address.setText("Vitoshka 15");

        entityManager.getTransaction().begin();
        entityManager.persist(address);
        entityManager.getTransaction().commit();

        return address;
    }

    private void employeesFromRDDepartmentExercise5() {
        entityManager.createQuery("SELECT e FROM Employee e " +
                "WHERE e.department.name = :deparment_name " +
                "ORDER BY e.salary, e.id", Employee.class)
                .setParameter("deparment_name", "Research and Development")
                .getResultList().forEach(e -> {
            System.out.printf("%s %s from %s - $%.2f\n", e.getFirstName(), e.getLastName(), e.getDepartment().getName(), e.getSalary());
        });
    }

    private void employeesWithSalaryOver50_000Exercise4() {
        entityManager.createQuery("SELECT e.firstName FROM Employee e WHERE e.salary > 50000", String.class)
                .getResultList()
                .forEach(System.out::println);
    }

    private void containsEmployeeExercise3() {
        try {
            String[] employeeName = bufferedReader.readLine().split("\\s+");
            String firstName = employeeName[0];
            String lastName = employeeName[1];


            Long result = entityManager.createQuery("SELECT COUNT(e) FROM Employee AS e WHERE e.firstName = :first_name AND e.lastName = :last_name", Long.class)
                    .setParameter("first_name", firstName)
                    .setParameter("last_name", lastName)
                    .getSingleResult();

            if (result == 0) {
                System.out.println("No");
            } else {
                System.out.println("Yes");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void changeCasingExercise2() {
        entityManager.getTransaction().begin();

        Query query = entityManager.createQuery("UPDATE Town AS t " +
                "SET t.name = UPPER(t.name) " +
                "WHERE LENGTH(t.name) >= 5 ");
        int affectedRows = query.executeUpdate();
        System.out.println(affectedRows);

        entityManager.getTransaction().commit();
    }
}
