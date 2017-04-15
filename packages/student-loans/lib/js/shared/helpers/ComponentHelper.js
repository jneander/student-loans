export function bind (context, ...methods) {
  methods.forEach((method) => {
    if (context[method]) {
      context[method] = context[method].bind(context);
    } else {
      console.warn(`method ${method} does not exist on ${context}`);
    }
  });
}

export default {
  bind
};
