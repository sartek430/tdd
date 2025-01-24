Feature: User
    Scenario: As a customer, I want to register
        Given my email is "johnDoe@gmail.com" and my password is "#azerty123A"
        When i register an account 
        Then my account is created