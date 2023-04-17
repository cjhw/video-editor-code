export function uuid() {
  return (
    +new Date() +
    Math.random() * 10 +
    Math.random() * 10 +
    Math.random() * 10 +
    Math.random() * 10 +
    "a"
  );
}

export function clearEmpty(val) {
  val = val.replace(" ", "");
  if (val.indexOf(" ") !== -1) {
    return clearEmpty(val);
  } else {
    return val;
  }
}
