# ebnfParser

A simple parser for [EBNF](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form) like grammars.

> ebnfParser is written in ES6 class syntax and will only work in modern enviroments!

## Dependancies
- [ScopeChain](https://github.com/stephan-dum/scopeChain)

## Prefered Usage
Lexing and parsing strings can get quite intensive and should only happen once. Although `ebnfParser` can also be used in browsers,  the best approach is the integrate it with your favorite taskrunner in `node.js`.

## grammarObject

## rule

## symbols


## constructor(...Object<String `key`, Mixed `node`>)
  - if `typeof` node is `String` an existing node with `key == node` of the next rule to use
  
  - if `typeof` node is `Object` the following options are possible:
      
      repeat [Integer from [,Integer to]]
      
      symbols Array
      
      context Class: creates a new context when ever the rule node is entered
      
      method function: executes the given function with the current context if all symbols can be consumed.
      
      greedy boolean backtrack on error 
      
      > Caution backtracking is only performed on the arguments list for the next method calls and will not reset any changes to the context a sub method that went through made.
  - Array







## addNode(String `name`[, Object<String, `node`])

## exec(String `str`, String `root`[, Object `context`])

## Examples

var parser = new Parser(grammar,
