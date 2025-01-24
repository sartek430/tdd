Feature: Store book
    Scenario: As a customer, I want to store a book 
        Given i'm a customer
        When i add a book called Fahrenheit 451' by 'Ray Bradbury' in 'Science-Fiction'
        Then the book is stored