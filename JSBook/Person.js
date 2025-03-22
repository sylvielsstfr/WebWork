class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  getAge() {
    return this.age;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.getFullName()}`);
  }
  displayAge() {
    console.log(`I am ${this.getAge()} years old.`);
  }
}

const person1 = new Person("John", "Doe", 30);
person1.sayHello(); // Hello, my name is John Doe
person1.displayAge(); // I am 30 years old.
