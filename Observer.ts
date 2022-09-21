/*lets you define a subscription mechanism to notify multiple objects about any events that happen to the
object they're observing.
one-to-many dependency between objects. an object (called as Subject) maintains a list of its dependents
(called as Observers) and notifies them automatically whenever any sSTATE CHANGES by calling one of their
methods.*/

interface ISubject{
    registerObserver(observer:IObserver):void;
    removeObserver(observer:IObserver):void;
    notifyObservers():void;
}

class Subject implements ISubject{
    observers:IObserver[] = [];
    productName:string;
    productPrice:number;
    productAvailability:string;

    constructor(productName:string, productPrice:number, productAvailability:string){
        this.productName = productName;
        this.productPrice =  productPrice;
        this.productAvailability = productAvailability;

    }

    getAvailability():string{
        return this.productAvailability;
    }

    setAvailability(availability:string){
        this.productAvailability = availability;
        console.log(`Availability changed to ${availability}`);
        this.notifyObservers();
    }

    registerObserver(observer:IObserver){
        let castObserver = <Observer>observer;
        console.log(`Observer ${castObserver.username} added`);
        this.observers.push(observer);
    }

    removeObserver(observer:IObserver){
        let index = this.observers.findIndex((el) => el === observer)
        this.observers.splice(index);
    }

    notifyObservers(){
        console.log(`Notifying observers about ${this.productName} availability`);
        for(let observer of this.observers){
            observer.update(this.productAvailability);
        }
        
    }

}

interface IObserver{
    update(availability:string):void;
}

class Observer implements IObserver{
    username:string;

    constructor(username:string, subject:ISubject){
        this.username = username;
        subject.registerObserver(this);
    }
    update(availability: string): void {
        console.log(`Hi ${this.username}, product is now ${availability}`);
    }
}

//client
const redmi8A = new Subject('Redmi 8A',8500,'Unavailable');
const user1:Observer = new Observer('Ian',redmi8A);
const user2:Observer = new Observer('Maggie',redmi8A);
const user3:Observer = new Observer('Patience',redmi8A);

console.log(`Redmi8A current availability: ${redmi8A.getAvailability()}`);
redmi8A.removeObserver(user3);
redmi8A.setAvailability('Available');
