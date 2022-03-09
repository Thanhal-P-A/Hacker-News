import axios from 'axios';
import {FetchTopStoriesID, FetchItem} from './AppAction';

jest.mock('axios');

describe('FetchTopStoriesID', async () => {
  it('should return array of length 500 with top story IDs', async () => {
    const story = [...Array(500).keys()];
    axios.get.mockResolvedValueOnce({data: story});
    const data = await FetchTopStoriesID();
    expect(data.length).toEqual(500);
  });
});

describe('FetchItem', async () => {
  it('should return object with same id as one of its property', async () => {
    const item = {
      id: 123456,
      by: 'name',
      descendants: 0,
      score: 100,
      time: 1234567890,
      title: 'story title',
      url: 'https://story.com',
    };
    axios.get.mockResolvedValueOnce({data: item});
    const data = await FetchItem(item.id);
    expect(data.id).toEqual(item.id);
  });
});
