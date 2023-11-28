/* istanbul ignore file */
module.exports = () => {
  const res = {
    status: jest.fn(() => {
      return res;
    }),
    json: jest.fn(() => {
      return res;
    }),
    send: jest.fn(() => {
      return res;
    }),
  };
  return res;
};
