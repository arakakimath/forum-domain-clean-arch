import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DomainEventCallback = (event: any) => void
export class DomainEvents {
  private static handlersMap: Record<string, DomainEventCallback[]> = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static markedAggregates: AggregateRoot<any>[] = []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static markAggregateForDispatch(aggregate: AggregateRoot<any>) {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id)
    if (!aggregateFound) {
      this.markedAggregates.push(aggregate)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static dispatchAggregateEvents(aggregate: AggregateRoot<any>) {
    aggregate.domainEvents.forEach((event: DomainEvent) => this.dispatch(event))
  }

  private static removeAggregateFromMarkedDispatchList(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    aggregate: AggregateRoot<any>,
  ) {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate))
    this.markedAggregates.splice(index, 1)
  }

  private static findMarkedAggregateByID(
    id: UniqueEntityID,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): AggregateRoot<any> | undefined {
    return this.markedAggregates.find((aggregate) => aggregate.id.equals(id))
  }

  public static dispatchEventsForAggregate(id: UniqueEntityID) {
    const aggregate = this.findMarkedAggregateByID(id)
    if (aggregate) {
      this.dispatchAggregateEvents(aggregate)
      aggregate.clearEvents()
      this.removeAggregateFromMarkedDispatchList(aggregate)
    }
  }

  public static register(
    callback: DomainEventCallback,
    eventClassName: string,
  ) {
    const wasEventRegisteredBefore = eventClassName in this.handlersMap
    if (!wasEventRegisteredBefore) {
      this.handlersMap[eventClassName] = []
    }
    this.handlersMap[eventClassName].push(callback)
  }

  public static clearHandlers() {
    this.handlersMap = {}
  }

  public static clearMarkedAggregates() {
    this.markedAggregates = []
  }

  private static dispatch(event: DomainEvent) {
    const eventClassName: string = event.constructor.name
    const isEventRegistered = eventClassName in this.handlersMap
    if (isEventRegistered) {
      const handlers = this.handlersMap[eventClassName]
      for (const handler of handlers) {
        handler(event)
      }
    }
  }
}
