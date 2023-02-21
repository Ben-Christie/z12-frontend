const AllValuesDefined = <T extends { [s: string]: unknown } | ArrayLike<unknown>>(obj: T): boolean => {
  return Object.values(obj).every(value => typeof value !== 'undefined');
}

export default AllValuesDefined;