# Lights Out Solver

A numeric solution written in JavaScript to solve an _nxn_ [Lights-Out Game](http://www.logicgamesonline.com/lightsout/).

The game is fairly simple, where you are given an _nxn_ matrix, each cell representing a bulb. Clicking on a bulb with toggle it and all perpendicular touching cells _i.e. up, down, left and right_. Initailly some bulbs are on and some are off. The objective - to switch off all the lights.

The standard solving way is a lookup table, but the problem can be converted to a set of linear equations _mod 2_, since it is just a binary arithematics.

This can be solved by an _n<sup>2</sup>xn<sup>2</sup>_ matrix mutiplication.

On further analysis, we have reduced the problem to gauss elimination on _n<sup>2</sup>xI_, thereby giving a faster solution.

**Note:** The solution can be optimized by post grouping and elimination. I have not done that.

 For a game of above _3x3_ size, their exists a lot of combinations for which their are no solutions. I have not checked that and the solver tries to provide a solution nonetheless. This can be fixed. 

## Run

Download the repo and open the html in any browser
