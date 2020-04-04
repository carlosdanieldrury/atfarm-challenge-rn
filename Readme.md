## Objective

We would like to see how someone works when working on production code. Prefer to do things in a correct way over completing every task.

## About this repository

This is a react native application bootstrapped with [expo](https://docs.expo.io/versions/v36.0.0/). The app has 3 screens: Create Field, Fields List, Field Details.

## Guidelines

- Time boxed: 180 minutes.
- Implement tasks from the `ToDo` list. There is no expectation that you will complete all tasks.
- The API is documented in [API.md](API.md).
- Feel free to improve or refactor, as you see the need for it.
- Write tests for what you find relevant to test.
- Style the UI as much as you want, feel free to use any of the supported [UI libraries](https://docs.expo.io/versions/v36.0.0/guides/userinterface) or style it on your own.

### Proposed Branching Strategy
- Fork this repository.
- Set your fork to be a private repository. This is for fairness: every candidate should start from the same point.
- Checkout a feature branch off of `development` for every `ToDo` item that you tackle.
- Open a PR for every feature branch. Take the time to add a PR description to simplify the review.
- Invite the person who invited you to this repository to your fork for review of the PRs.

## ToDo

- **New Field** Screen:
    * Build the form to create a field with the following client side validation:

        | Parameter | Type | Description |
        | :--- | :--- | :--- |
        | `name` | `string` | Required, more than 2 letters
        | `area` | `number` | Required, > 0, < 1000
        | `cropType` | `enum` | Required, cotton|maize|oats|wheat

    * Save the field in the backend.
    * Bonus: The user can also submit the form while being offline. The API call is (re-)triggerd when the network connection resumes. The fields list could be updated optimistically.

- **Fields List** Screen:
    * Fetch the fields list from the API and render it as grid on the screen.
    * When the user presses on field item the app navigates to the field details.
    * Bonus: the field list is cached offline.
    * Bonus: the list can be searched by `name`, `cropType`.
    * Bonus: fields are displayed grouped by `cropType`.
