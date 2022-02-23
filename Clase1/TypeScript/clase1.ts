class UserTs {
  name: string;
  lastName: string;
  books: { name: string; author: string }[] = [];
  pets: string[] = [];

  constructor(name: string, lastName: string) {
    this.name = name;
    this.lastName = lastName;
  }

  getNameTs(): string {
    return `${this.name} ${this.lastName}`;
  }

  addPets(pet: string): void {
    this.pets.push(pet);
  }

  countPets() {
    return this.pets.length;
  }

  addBook(name: string, author: string): void {
    this.books.push({ name: name, author: author });
  }

  getBookNames() {
    return this.books.map((names) => names.name);
  }
}

let userTs = new UserTs("beluzita", "romero");

console.log(userTs.getNameTs());
userTs.addPets("Dio");
userTs.addPets("Chistin");
console.log(userTs.pets);
console.log(userTs.countPets());
userTs.addBook("Noha", "Sebastian Fitzek");
userTs.addBook("El estudiante", "Katzenbach");
console.log(userTs.getBookNames());
