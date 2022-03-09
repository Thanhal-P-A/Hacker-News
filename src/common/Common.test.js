import {isEmpty} from '.';

describe('isEmpty', () => {
  describe('when pass null', () => {
    it('should return true', () => {
      expect(isEmpty(null)).toBe(true);
    });
  });

  describe('when pass an empty array', () => {
    it('should return true', () => {
      expect(isEmpty([])).toBe(true);
    });
  });

  describe('when pass a non empty array', () => {
    it('should return false', () => {
      expect(isEmpty([1, 2])).toBe(false);
    });
  });
});
