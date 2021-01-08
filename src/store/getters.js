const getters = {
  sesawAngle({ leftItems, rightItems }) {
    const leftSum = leftItems.reduce((sum, current) => {
      return sum + current.weight * (50 - current.left);
    }, 0);

    const rightSum = rightItems.reduce((sum, current) => {
      return sum + current.weight * current.left;
    }, 0);

    // if (rightSum - leftSum > 20 && leftSum > 0) return 31;

    return (rightSum - leftSum) / 30;
  },
};

export default getters;
