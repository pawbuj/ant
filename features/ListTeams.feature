Feature: List teams

  Scenario: Empty list
    Given I make a GET request to /teams
      And I set query param limit to 10
     When I receive a response
     Then I expect response should have a status 200
      And I expect response header content-type should have application/json; charset=utf-8
      And I expect response should have a json like
      """
      []
      """

  Scenario: 3 iteams
    Given there is a team teamA
      And there is a team teamB
      And there is a team teamC
      And I make a GET request to /teams
     When I receive a response
     Then I expect response should have a status 200
      And I expect response header content-type should have application/json; charset=utf-8
      And I expect response should have a json like
      """
      [
        {
          "name" : "teamA"
        },
        {
          "name" : "teamB"
        },
        {
          "name" : "teamC"
        }
      ]
      """

  Scenario: 10 iteams, limit 2
    Given there are 10 teams
      And I make a GET request to /teams
      And I set query param limit to 2
     When I receive a response
     Then I expect response should have a status 200
      And I expect response header content-type should have application/json; charset=utf-8
      And I expect response should have a json like
      """
      [
        {
          "name" : "team1"
        },
        {
          "name" : "team2"
        }
      ]
      """
