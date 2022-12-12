## When to use this pattern?

 - When you detect that you have a couple of classes that are tightly coupled.

 - When you notice that you are creating a lot of subclasses in order to reuse a basic behavior in different contexts.

 - When you can't reuse a component in a different program because it’s too dependent on other components.

## How to implement it?
 
 1. Identify a class (or classes) that are tightly coupled which would benefit from being more independent and/or free.

 2. Define a mediator interface with a method that your components will use to communicate with each other through the mediator.

 3. Implement the Mediator class. This class would benefit from getting a reference (pointer) to each of the components which will use this class.

 4. The components should implement a reference to the Mediator.

 5. Modify the components method so that they communicate to the mediator instead of methods on other components.
