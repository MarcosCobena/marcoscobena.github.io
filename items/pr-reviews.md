I've being feeling lately am spending too much effort in cosmetic stuff which add low value instead of concentrating in logic, algorithms.

Serve this as my personal reminder for how to take a PR review:

- If I detect something doesn't conform the style guidelines, instead of adding a comment:

  - think of enforcing such rule in any way: through Git hooks, StyleCop, etc. It's important to consider how much time you'd earn by enabling such instead of once and again adding similar comments in future PRs; or
  - add an in-line comment to leverage this which, indeed, will arrive to the rest of team as well: for example:

  ```c#
  // Marcos says: below fields are ordered alphabetically to easily allow us search
  public const string AppCenterKey = "bar";
  
  public const string APIKey = "foo";
  ```

  ​	; or

  - simply write this down in any communication channel your team has: a Slack/Teams conversation, during tomorrow daily, etc.; or
  - forget your impulse, just keep scrolling down because there for sure will be things far more interesting to consider