Feature: Create team

  Scenario: Happy path
    Given I make a POST request to /teams
      And I set header Content-Type to application/json
      And I set body to
      """
      {
        "name": "awesome  team"
      }
      """
     When I receive a response
     Then I expect response should have a status 201
      And I expect response time should be less than 1000 ms
      And I expect response header content-type should have application/json; charset=utf-8
      And I expect response should have a json like
      """
      {
        "name": "awesome  team"
      }
      """

  Scenario: Malformed body
    Given I make a POST request to /teams
      And I set header Content-Type to application/json
      And I set body to
      """
      {
        "foo": "bar"
      }
      """
     When I receive a response
     Then I expect response should have a status 400

  Scenario: validation to short name 
    Given I make a POST request to /teams
      And I set header Content-Type to application/json
      And I set body to
      """
      {
        "name": "a"
      }
      """
     When I receive a response
     Then I expect response should have a status 400

  Scenario: No body
    Given I make a POST request to /teams
     When I receive a response
     Then I expect response should have a status 415