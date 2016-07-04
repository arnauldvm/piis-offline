import { PiisOfflinePage } from './app.po';

describe('piis-offline App', function() {
  let page: PiisOfflinePage;

  beforeEach(() => {
    page = new PiisOfflinePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
