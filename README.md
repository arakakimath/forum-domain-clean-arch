# About the project

This is a project of a question and answers forum, in which is possible to ask or answer a question and comment questions or answers. Also, it is possible to have attachments on questions and answers.

This repository contains all the domain part of this forum. Besides that, there is a subdomain in this project to deal with notifications. Both projects were divided in two parts: entities and use cases.

To built this project, it was used concepts like DDD, SOLID, Clean Architecture, Design patterns (Factory and Repository), etc. Vitest was used for dealing with tests.

The infra part and integration can be found in [this repository](https://github.com/arakakimath/forum-infra-clean-arch).

---

## How to run the project

After downloading this repository from GitHub, certify that node_modules are installed with the command "npm install" and then run unit tests.

```

npm run test

```

or

```

npm run test:watch

```

---

# Architecture

## Entities

These entities were divided based in:

### Role of user

- Student
- Instructor

### Type of main content

- Question
- Answer

### Type of comment

- Comment: As question and answer comments are similar, a common parent entity were proposed to them
- Question comment
- Answer comment

### Attachment

- Attachment: To improve perfomances, attachments are uploaded even before the creation of the answer/question entity, then every attachment belongs to this entity and once question/answer is created, then it is specified its type
- Question attachment
- Answer attachment

### Attachment list

Question/answer attachment list are entities that belongs to a core entity called Watched List, in which its main function is to compare changes between old and new attachments. This comparison is essential when dealing with database as you can improve performance by creating just the actual new attachments and removing just the ones that aren't in the newer list.
 
- Answer attachment list
- Question attachment list

### Notification

- Notification: this entity is from the sub-domain of notification

---

## Core Entities

All the main entities aforementioned have a parent entity called Core Entities. These ones are:

- Entity: Most of entities are childs of this and it states that all of its childs have an id of type UniqueEntityID and props, that are the particularities from each entity.

- Unique Entity ID: It is not a real entity, it is a class that storages and defines the type of the identification of an entity

- Watched List: An abstract class that holds methods for comparison between lists. In this projects, this class was used to compare attachment lists.

- Aggregate Root: A child of entity class that holds the events of the project. In this one, the events are to send notification when certain conditions were achieved.

---

## Use Cases

All the use cases considered for this project:
- Answer question
- Choose question best answer
- Comment on answer
- Comment on question
- Create question
- Delete answer comment
- Delete answer
- Delete question comment
- Delete question
- Edit answer
- Edit question
- Fetch answer comments
- Fetch question answers
- Fetch question comments
- Fetch recent questions
- Get question by slug
- Read notification (Sub-domain)
- Send notification (Sub-domain)

---

### Unit tests

All these use cases were tested with unit tests. To these unit tests, there were created in-memory repositories following Repository Pattern to storage some entities:
- Answer attachments
- Question attachments
- Answer comments
- Question comments
- Answers
- Questions
- Notifications

Factory Pattern were also implemented to otimize some common routines in the tests.

---

# DDD (Domain-driven Design)

Domain-driven Design (DDD) is a software development approach that emphasizes collaboration between technical experts and domain experts to build complex systems. It focuses on aligning the design and implementation of the system with the core business domain.

---

## Table of Contents
1. [Key Principles of DDD](#key-principles-of-ddd)
2. [Core Concepts](#core-concepts)
3. [Benefits of DDD](#benefits-of-ddd)
4. [Implementation Steps](#implementation-steps)
5. [Common Challenges](#common-challenges)
6. [Additional Resources](#additional-resources)

---

## Key Principles of DDD

1. **Focus on the Core Domain**  
   Identify the most critical aspects of the business and prioritize efforts to solve domain-specific problems.

2. **Collaborate with Domain Experts**  
   Work closely with experts to ensure the software reflects the real-world needs and processes.

3. **Use a Ubiquitous Language**  
   Establish a common language between developers and domain experts that avoids ambiguity.

4. **Model-Driven Design**  
   Create models that represent the core domain concepts and drive the software's design and architecture.

---

## Core Concepts

1. **Entities**  
   Objects that have a unique identity throughout their lifecycle (e.g., a Customer, Order).

2. **Value Objects**  
   Immutable objects that represent descriptive aspects of the domain without an identity (e.g., Money, Address).

3. **Aggregates**  
   A cluster of domain objects treated as a single unit, defined by a root entity (Aggregate Root).

4. **Repositories**  
   Patterns for retrieving and persisting domain objects, maintaining a clean interface to the domain.

5. **Domain Events**  
   Represent significant events that occur in the domain, promoting decoupling and enabling event-driven architectures.

6. **Bounded Contexts**  
   Define clear boundaries within the domain where a specific model applies, avoiding ambiguity.

7. **Application Layer**  
   Orchestrates application tasks, coordinates between domain objects, and communicates with external systems.

---

## Benefits of DDD

- Better alignment between business and technical teams.  
- Improved maintainability of the codebase.  
- Easier to adapt to business changes.  
- Clear separation of concerns in architecture.  
- Encourages a deeper understanding of the domain.

---

## Implementation Steps

1. **Understand the Domain**  
   Collaborate with domain experts to gain deep insights into the business processes.

2. **Define the Ubiquitous Language**  
   Create a shared vocabulary to bridge the gap between technical and non-technical stakeholders.

3. **Identify Bounded Contexts**  
   Break down the system into manageable contexts with clear boundaries.

4. **Design Aggregates and Entities**  
   Model the key domain concepts with a focus on clarity and simplicity.

5. **Implement Repositories**  
   Abstract data persistence to ensure domain objects remain pure.

6. **Use Domain Events**  
   Capture and respond to changes in the domain.

7. **Continuously Evolve the Model**  
   Refactor and refine as the understanding of the domain grows.

---

## Common Challenges

- Difficulty in defining clear boundaries between contexts.  
- High initial learning curve for the team.  
- Risk of over-complicating the model.  
- Requires strong collaboration with domain experts, which may not always be feasible.

---

## Additional Resources

- **Books**  
  - *Domain-Driven Design: Tackling Complexity in the Heart of Software* by Eric Evans  
  - *Implementing Domain-Driven Design* by Vaughn Vernon  

- **Articles and Blogs**  
  - [DDD Fundamentals](https://martinfowler.com/tags/domain%20driven%20design.html)  
  - [Event-Driven Architecture with DDD](https://verraes.net/category/ddd/)  

- **Tools and Frameworks**  
  - [DDD Starter Projects](https://github.com/search?q=domain-driven-design)  

---

By following the principles and practices of DDD, you can build systems that are more resilient, adaptable, and aligned with the needs of your business.



# Clean Architecture

![Clean Architecture](./Clean-Architecture-3.png)
