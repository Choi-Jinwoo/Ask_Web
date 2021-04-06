export interface IStorage<T> {
  get(): T | null;
  set(item: T): void;
  hasItem(): boolean;
}