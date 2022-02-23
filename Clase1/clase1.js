class User {
  constructor(name, lastName) {
    this.name = name;
    this.lastName = lastName;
    this.books = [];
    this.pets = [];
  }

  getFullName() {
    return `${this.name} ${this.lastName}`;
  }

  addPets(pet) {
    this.pets.push(pet);
  }

  countPets() {
    return this.pets.length;
  }

  addBook(name, author) {
    this.books.push({ name: name, author: author });
  }

  getBookNames() {
    return this.books.map((names) => names.name);
  }
}

const user = new User("Belen", "Romero");

console.log(user.getFullName());
user.addPets("Dio");
user.addPets("Aiken");
console.log(user.countPets());
user.addBook("Noha", "Sebastian Fitzek");
user.addBook("Personas desconocidas", "John Katzenbach");
console.log(user.getBookNames());
