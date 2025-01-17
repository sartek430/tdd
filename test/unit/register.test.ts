import { describe, test } from "@jest/globals";
import { User } from "../../src/models/userModel";
import { RegisterUserService } from "../../src/services/registerUserService";

jest.mock("../../src/repositories/userRepository");

describe("register", () => {
  let registerUserService: RegisterUserService;
  beforeAll(() => {
    registerUserService = new RegisterUserService();
  });

  test("Good user credentials", async () => {
    // Arrange
    const user: User = {
      email: "JohnDoe@gmail.com",
      password: "kgbhjdEZRZ123@ds#",
      name: "John Doe",
    };
    // Act
    const result = await registerUserService.registerUser(user);
    // Assert
    expect(result).toBeUndefined();
  });

  test("Password too short", async () => {
    // Arrange
    const user: User = {
      email: "JohnDoe@gmail.com",
      password: "123",
      name: "John Doe",
    };
    // Act
    try {
      await registerUserService.registerUser(user);
    } catch (error: any) {
      // Assert
      expect(error.message).toBe("Password not strong enough");
    }
  });

  test("Password too long", async () => {
    // Arrange
    const user: User = {
      email: "JohnDoe@gmail.com",
      password:
        "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
      name: "John Doe",
    };
    // Act
    try {
      await registerUserService.registerUser(user);
    } catch (error: any) {
      // Assert
      expect(error.message).toBe("Password not strong enough");
    }
  });

  test("Password no special character", async () => {
    // Arrange
    const user: User = {
      email: "JohnDoe@gmail.com",
      password: "Azaza123gdfgt",
      name: "John Doe",
    };
    // Act
    try {
      await registerUserService.registerUser(user);
    } catch (error: any) {
      // Assert
      expect(error.message).toBe("Password not strong enough");
    }
  });

  test("Password no uppercase", async () => {
    // Arrange
    const user: User = {
      email: "JohnDoe@gmail.com",
      password: "azaza123@",
      name: "John Doe",
    };
    // Act
    try {
      await registerUserService.registerUser(user);
    } catch (error: any) {
      // Assert
      expect(error.message).toBe("Password not strong enough");
    }
  });

  test("Password no lowercase", async () => {
    // Arrange
    const user: User = {
      email: "JohnDoe@gmail.com",
      password: "AZAZA123@",
      name: "John Doe",
    };
    // Act
    try {
      await registerUserService.registerUser(user);
    } catch (error: any) {
      // Assert
      expect(error.message).toBe("Password not strong enough");
    }
  });

  test("Password no number", async () => {
    // Arrange
    const user: User = {
      email: "Johndoegmail.com",
      password: "AzazaAzaza@",
      name: "John Doe",
    };
    // Act
    try {
      await registerUserService.registerUser(user);
    } catch (error: any) {
      // Assert
      expect(error.message).toBe("Password not strong enough");
    }
  });

  test("Email no @", async () => {
    // Arrange
    const user: User = {
      email: "JohnDoe.gmail.com",
      password: "kgbhjdEZRZ123@ds#@",
      name: "John Doe",
    };
    // Act
    try {
      await registerUserService.registerUser(user);
    } catch (error: any) {
      // Assert
      expect(error.message).toBe("Invalid email");
    }
  });

  test("Email no .", async () => {
    // Arrange
    const user: User = {
      email: "JohnDoe@gmailcom",
      password: "kgbhjdEZRZ123@ds#@",
      name: "John Doe",
    };
    // Act
    try {
      await registerUserService.registerUser(user);
    } catch (error: any) {
      // Assert
      expect(error.message).toBe("Invalid email");
    }
  });

  test("Email no domain", async () => {
    // Arrange
    const user: User = {
      email: "JohnDoe@gmail.",
      password: "kgbhjdEZRZ123@ds#",
      name: "John Doe",
    };
    // Act
    try {
      await registerUserService.registerUser(user);
    } catch (error: any) {
      // Assert
      expect(error.message).toBe("Invalid email");
    }
  });

  test("Email no name", async () => {
    // Arrange
    const user: User = {
      email: "@gmail.com",
      password: "kgbhjdEZRZ123@ds#",
      name: "John Doe",
    };
    // Act
    try {
      await registerUserService.registerUser(user);
    } catch (error: any) {
      // Assert
      expect(error.message).toBe("Invalid email");
    }
  });
});
