[Angular Basics: Introduction to Observables - Part 1](https://www.telerik.com/blogs/angular-basics-introduction-observables-rxjs-part-1)

[Angular Basics: Introduction to Observables - Part 2](https://www.telerik.com/blogs/angular-basics-introduction-observables-rxjs-part-2)

[Creating and Using Angular Services: Best Practices and Examples](https://angulardive.com/blog/creating-and-using-angular-services-best-practices-and-examples/)

# Productor i consumidor
## [Observables and observers](https://github.com/tc39/proposal-observable)

An Observable Allows Observers to Subscribe

Creating an observable instance is not enough to start producing and sending data—we also need to subscribe to the observable.

The observable needs to know who to send data to. We let an observable know that an observer is interested in receiving data by subscribing to it.

The observable type has a subscribe() method that accepts an observer as a parameter.

```JavaScript
const subscription = myObservable$.subscribe(observer);
```

The subscribe() method begins sending values to the supplied observer object by executing the observable object’s subscriber function.
Angular Basics: Comparing Data Producers in JavaScript

Learn more about how to distinguish between Observables and other producers—Functions, Promises and Iterables.

The subscribe() method executes the subscriber function, passing along the observer as an argument. The subscriber function then starts producing data and emitting values (or notifications) by executing the observer’s callbacks.

## API
API
Observable

An Observable represents a sequence of values which may be observed.

```Javascript
interface Observable {

    constructor(subscriber : SubscriberFunction);

    // Subscribes to the sequence with an observer
    subscribe(observer : Observer) : Subscription;

    // Subscribes to the sequence with callbacks
    subscribe(onNext : Function,
              onError? : Function,
              onComplete? : Function) : Subscription;

    // Returns itself
    [Symbol.observable]() : Observable;

    // Converts items to an Observable
    static of(...items) : Observable;

    // Converts an observable or iterable to an Observable
    static from(observable) : Observable;

}

interface Subscription {

    // Cancels the subscription
    unsubscribe() : void;

    // A boolean value indicating whether the subscription is closed
    get closed() : Boolean;
}

function SubscriberFunction(observer: SubscriptionObserver) : (void => void)|Subscription;
```


# CLIENT

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
