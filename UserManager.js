import { config } from './config.js';

export class User {
  constructor(username, following, followers) {
    this.username = username;
    this.following = following;
    this.followers = followers;
    this.ratio = followers === 0 ? Infinity : following / followers;
    this.slapFlagged = this.ratio >= config.slapRatio && following >= config.followingThreshold;
  }
}

export class UserManager {
  constructor() {
    this.users = new Map();
  }

  addUser(username, following, followers) {
    this.users.set(username, new User(username, following, followers));
  }

  getUser(username) {
    return this.users.get(username);
  }

  has(username) {
    return this.users.has(username);
  }

  getSlapFlaggedUsers() {
    return Array.from(this.users.values()).filter(user => user.slapFlagged);
  }
}
