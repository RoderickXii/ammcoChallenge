export class User {
  name: string;
  movies: string[];
  friends: Set<User>;

  constructor(name: string) {
    this.name = name;
    this.movies = [];
    this.friends = new Set();
  }

  addMovie(movie: string): void{
    this.movies.push(movie);
  }

  addFriend(friend: User): void {
    this.friends.add(friend);
  }
}

export class facebookNetwork {
  findMostPopularMovie(user: User): string | null {
    const movieCounter = new Map<string, number>()
    const prevVisited = new Set<User>();
    const stack: User[] = [user];
  

    prevVisited.add(user);

    while (stack.length > 0) {
      const currentUser = stack.pop()!;

      for (let movie of currentUser.movies) {
        movieCounter.set(movie, (movieCounter.get(movie) || 0) + 1);
      }

      for (let friend of currentUser.friends) {
        if (!prevVisited.has(friend)) {
          prevVisited.add(friend);
          stack.push(friend);
        }
      }
    }

    let mostPopular: string | null = null;
    let maxCount = 0;

    for (const [movie, count] of movieCounter.entries()) {
      if (count > maxCount) {
        maxCount = count;
        mostPopular = movie;
      }
    }
    
    return mostPopular;
  }
}

const network = new facebookNetwork;
const john = new User("John");
john.addMovie("Gladiator");
john.addMovie("Wicked");


const raffy = new User("Raffy");
raffy.addMovie("Wicked");
raffy.addMovie("Deadpool");

const trish = new User("Trish");
trish.addMovie("Moana 2");
trish.addMovie("Gladiator");

const ash = new User("Ash");
ash.addMovie("Avengers");
ash.addMovie("Wicked");

ash.addFriend(raffy);
ash.addFriend(john);
trish.addFriend(ash);
john.addFriend(raffy);
john.addFriend(trish);

console.log(network.findMostPopularMovie(john))