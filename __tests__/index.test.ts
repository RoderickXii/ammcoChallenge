import {facebookNetwork, User} from "../src/index"

describe("facebookNetwork", () => {
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

  const result = network.findMostPopularMovie(john);

  it("should return the most popular movie", () => {
    expect(result).toBe("Wicked");
  })
})