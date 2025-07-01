const Events = (() => {
  const events = {};

  function subscribe(event, callback) {
    events[event] ??= [];
    events[event].push(callback);
    return () => unsubscribe(event, callback);
  }

  function unsubscribe(event, callback) {
    events[event] = events[event]?.filter((cb) => cb != callback) ?? [];
  }

  function publish(event, data) {
    events[event]?.forEach((callback) => callback(data));
  }

  return {
    subscribe,
    unsubscribe,
    publish,
  };
})();

export default Events;
