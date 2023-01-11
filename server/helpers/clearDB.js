
// implement module to clear DB
export function clearDatabase(callback) {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('Attempt to clear non testing database!');
  }else callback()
}
