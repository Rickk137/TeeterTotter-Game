const getters = {
  sesawAngle({ leftItems, rightItems }) {
    const leftSum = leftItems.reduce((sum, current) => {
      sum += current.weight * (50 - current.left);
      return sum;
    }, 0);

    const rightSum = rightItems.reduce((sum, current) => {
      sum += current.weight * current.left;
      return sum;
    }, 0);

    return (rightSum - leftSum) / 50;
  },
};

export default getters;
