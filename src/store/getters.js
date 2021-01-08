const getters = {
  leftTotalSum({ leftItems }) {
    return leftItems.reduce((sum, current) => sum + current.weight, 0);
  },
  rightTotalSum({ rightItems }) {
    return rightItems.reduce((sum, current) => sum + current.weight, 0);
  },
  leftItemSum({ leftItems }) {
    return Math.floor(
      leftItems.reduce((sum, current) => {
        return sum + current.weight * (50 - current.left);
      }, 0)
    );
  },
  rightItemSum({ rightItems }) {
    return Math.floor(
      rightItems.reduce((sum, current) => {
        return sum + current.weight * current.left;
      }, 0)
    );
  },
  sesawAngle(_, { leftItemSum, rightItemSum }) {
    // if (rightSum - leftSum > 20 && leftSum > 0) return 31;

    return (rightItemSum - leftItemSum) / 30;
  },
};

export default getters;
