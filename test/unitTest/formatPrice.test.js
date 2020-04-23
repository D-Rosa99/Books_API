import formatPrice from '../../app/utils/formatPrice';

describe('This is normally test', () => {
  it('Should return a USA dollar format price', () => {
    const value = 50;
    const result = formatPrice(value);

    expect(result).toBe(`US$ ${value}.00`);
  });

  it('Should return a friendly error if the value entered is not a number', () => {
    const value = 'jose jose';
    const result = formatPrice(value);

    const friendlyError = 'This is not a valid value';
    expect(result).toBe(friendlyError);
  });
});
