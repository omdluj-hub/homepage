const Parser = require('rss-parser');
const parser = new Parser();

async function test() {
  try {
    const feed = await parser.parseURL('https://rss.blog.naver.com/hoban2011902');
    console.log('Feed Title:', feed.title);
    
    feed.items.slice(0, 5).forEach((item, index) => {
      console.log(`\n--- Post ${index + 1} ---`);
      console.log('Title:', item.title);
      console.log('Content Keys:', Object.keys(item));
      console.log('Content Sample:', item.content?.substring(0, 500));
      const imgMatch = item.content?.match(/<img[^>]+src="([^">]+)"/);
      console.log('Img Match (Double Quotes):', imgMatch ? imgMatch[1] : 'No match');
      
      const imgMatchSingle = item.content?.match(/<img[^>]+src='([^'>]+)'/);
      console.log('Img Match (Single Quotes):', imgMatchSingle ? imgMatchSingle[1] : 'No match');
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
