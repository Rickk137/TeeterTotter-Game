const getters = {
  sesawAngle({ leftItems, rightItems }) {
    const leftSum = leftItems.reduce((sum, current) => {
      return sum + current.weight * (50 - current.left);
    }, 0);

    const rightSum = rightItems.reduce((sum, current) => {
      return sum + current.weight * current.left;
    }, 0);

    return (rightSum - leftSum) / 50;
  },
  bendingSpeed() {},
};

export default getters;
