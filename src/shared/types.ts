export interface Entity<T> {
  /** Allow an entity to return a read-only properties of itself. T is entity data. */
  get data(): T
}
