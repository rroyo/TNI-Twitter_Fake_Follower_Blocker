import { config } from './config.js';

function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function parseCount(countString) {
  // Remove any commas and convert to integer
  return parseInt(countString.replace(/,/g, ''), 10);
}

export async function processAllLinks(filteredLinks, userManager) {
  const linksToProcess =
    config.accountsCheckLimit === 0
      ? filteredLinks
      : filteredLinks.slice(0, config.accountsCheckLimit);
  for (const link of linksToProcess) {
    await processLink(link, userManager);
    // Add random delay between processing each link
    const delay = getRandomDelay(config.minDelay, config.maxDelay);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  console.log(`Processed ${linksToProcess.length} out of ${filteredLinks.length} available links`);
}

async function processLink(link, userManager) {
  // Trigger mouseover event
  const mouseoverEvent = new MouseEvent('mouseover', {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  link.dispatchEvent(mouseoverEvent);

  // Wait for popup to appear
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    // Extract username from link href
    const username = link.href.split('/').pop();

    // Get following and followers counts
    const followingCount = parseCount(
      document.querySelector(`a[href="/${username}/following"] > span > span:first-child`)
        ?.innerHTML || '0'
    );
    const followersCount = parseCount(
      document.querySelector(`a[href="/${username}/verified_followers"] > span > span:first-child`)
        ?.innerHTML || '0'
    );

    // Add user to UserManager
    userManager.addUser(username, followingCount, followersCount);
  } finally {
    // Close the popup using the selector
    const popup = document.querySelector('div[data-testid="hoverCardParent"]');
    if (popup) {
      popup.remove();
    }
  }
}
