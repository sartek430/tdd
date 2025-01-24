import { binding, given, then, when } from "cucumber-tsflow";

@binding()
class Storebook {
  @given("i'm a customer")
  public givenTwoNumbers(): void {}

  @when(
    "i add a book called Fahrenheit 451' by 'Ray Bradbury' in 'Science-Fiction'"
  )
  public whenAddBook(): void {}

  @then("the book is stored")
  public BookStored(): void {}
}
