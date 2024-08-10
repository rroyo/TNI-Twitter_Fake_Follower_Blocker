export const config = {
  // Minimum delay between processing each link (in milliseconds)
  minDelay: 2000,

  // Maximum delay between processing each link (in milliseconds)
  maxDelay: 3000,

  // Minimum following count to flag an account
  followingThreshold: 1000,

  // Threshold for the following/followers ratio
  slapRatio: 20.0,

  // Limit the number of accounts to check (0 means check all)
  accountsCheckLimit: 1,
};
