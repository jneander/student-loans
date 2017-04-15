const ActionHelper = {
  createConstants (keys) {
    const hash = {};
    keys.forEach((key) => { hash[key] = key });
    return hash;
  }
};

export default ActionHelper;
