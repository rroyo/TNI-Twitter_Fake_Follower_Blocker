import { selectAndFilterLinks } from './linkSelector.js';
import { processAllLinks } from './linkProcessor.js';
import { UserManager } from './UserManager.js';

const userManager = new UserManager();

async function main() {
  const filteredLinks = await selectAndFilterLinks();
  await processAllLinks(filteredLinks, userManager);
  checkStoredData(userManager);
}

function checkStoredData(userManager) {
  console.log(`Total users stored: ${userManager.users.size}`);
  userManager.users.forEach((user, username) => {
    console.log(
      `Username: ${username}, Following: ${user.following}, Followers: ${
        user.followers
      }, Ratio: ${user.ratio.toFixed(2)}, Slap Flagged: ${user.slapFlagged}`
    );
  });

  const slapFlaggedUsers = userManager.getSlapFlaggedUsers();
  console.log(`\nSlap Flagged users (${slapFlaggedUsers.length}):`);
  slapFlaggedUsers.forEach(user => {
    console.log(`${user.username} (Following: ${user.following}, Ratio: ${user.ratio.toFixed(2)})`);
  });
}

main().catch(console.error);
