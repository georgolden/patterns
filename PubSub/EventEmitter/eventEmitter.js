import { EventEmitter } from 'node:events';
import { setTimeout } from 'node:timers/promises';

class Journalist {
  constructor(name) {
    this.name = name;
  }

  writeArticle(magazine, message) {
    return {
      magazine,
      message,
      author: this.name,
    };
  }
}

class MediaAgency extends EventEmitter {
  constructor() {
    super();
  }

  publishArticle(article) {
    this.emit(article.magazine, article);
  }

  subscribeToMagazine(magazine, callback) {
    this.on(magazine, callback);
  }
}

// Usage

const nyt = new MediaAgency();

nyt.subscribeToMagazine('vogue', (article) =>
  console.log('I am reading article: ', article),
);

const alice = new Journalist('Alice');
console.log('Alice writes article for vogue...');
await setTimeout(1000);
const article = alice.writeArticle('vogue', 'this is my first fashion article');

nyt.publishArticle(article);
