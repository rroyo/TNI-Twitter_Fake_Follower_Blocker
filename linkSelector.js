export async function selectAndFilterLinks() {
  // Select all relevant <a> elements inside the "Timeline: Followers" section
  const links = document.querySelectorAll(
    'div[aria-label="Timeline: Followers"] a[role="link"][href^="/"]'
  );

  // Convert NodeList to an array, filter out unwanted links, and remove duplicates based on href
  const filteredLinks = [
    ...new Map(
      Array.from(links)
        .filter(link => !link.href.includes('search?q='))
        .map(link => [link.href, link])
    ) // Create a Map to filter out duplicates by href
      .values(),
  ]; // Extract the unique DOM elements from the Map

  return filteredLinks;
}
