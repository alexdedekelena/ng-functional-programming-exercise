import { TokenType } from '@angular/compiler';
import { Injectable } from '@angular/core';

// Types and Functions declaration

type Token = {
  type: 'NUMBER' | 'OPERATOR' | 'OPEN_PARENTHESIS' | 'CLOSE_PARENTHESIS';
  value: string;
};
type Success = {
  success: true;
  value: Token[];
  rest: string;
};
type Failure = {
  success: false;
  reason: string;
};
type Result = Success | Failure;
const success = (value: Token[], rest: string): Result => ({
  success: true,
  value: value,
  rest,
});
const failure = (reason: string): Result => ({ success: false, reason });
type Parser = (input: string) => Result;

const parseNumber: Parser = (input: string) => {
  const match = /^\d+/.exec(input);
  if (match) {
    return success(
      [{ type: 'NUMBER', value: match[0] }],
      input.slice(match[0].length)
    );
  }
  return failure('Not a number');
};

// 15. Develop a parser, parseOperator, that identifies the + and − operators
// from a given input string. Important: The parser should only recognise operators. Parsing of the parentheses and their contents should be
// delegated to other parsers.
const parseOperator: Parser = (input: string) => {
  const match = /^[\+\-]/.exec(input);
  if (match) {
    return success(
      [{ type: 'OPERATOR', value: match[0] }],
      input.slice(match[0].length)
    );
  }
  return failure('Expected "+ or -"');
};

// 16. Construct a parser, parseOpenParenthesis, designed to identify open parentheses
const parseOpenParenthesis: Parser = (input: string) => {
  const match = /^[\(]/.exec(input);
  if (match) {
    return success(
      [{ type: 'OPEN_PARENTHESIS', value: match[0] }],
      input.slice(match[0].length)
    );
  }
  return failure('Expected "("');
};

// 17. Construct a parser named parseCloseParenthesis that is designed to detect closed brackets.
const parseCloseParenthesis: Parser = (input: string) => {
  const match = /^[\)]/.exec(input);
  if (match) {
    return success(
      [{ type: 'CLOSE_PARENTHESIS', value: match[0] }],
      input.slice(match[0].length)
    );
  }
  return failure('Expected ")"');
};

// 18. Have you noticed the similarity between the parsers for open and close brackets?
// Let’s be efficient and create a generic function named parseCharacter. This function will take in
// a character and a token type and return the appropriate parser result.

// const parseCharacter: (char: string, tokenType: Token['type']) => Parser = ???

// TODO: It Seems wrong since it is returning a Result by requiring a specific char prior calling this method parseCharacter.
// To correctly achieve task 19 I should convert someway the char as parameter
const parseCharacter: (char: string, tokenType: Token['type']) => Result = (
  char,
  tokenType
) => {
  switch (tokenType) {
    case 'NUMBER':
      return parseNumber(char);

    case 'OPERATOR':
      return parseOperator(char);

    case 'OPEN_PARENTHESIS':
      return parseOpenParenthesis(char);

    case 'CLOSE_PARENTHESIS':
      return parseCloseParenthesis(char);

    default:
      return parseNumber(char);
  }
};

// 19. Refactor parseOpenParenthesis and parseCloseParenthesis by utilising the parseCharacter
// function to eradicate the redundancies between the two implementations.
// TODO: The only way I could get this is by adding an additional function which get the char first.
// But I don't think this is the expected result
const parseOpenParenthesis2 = (char: string) => parseCharacter(char, 'OPEN_PARENTHESIS');
const parseCloseParenthesis2 = (char: string) => parseCharacter(char, 'CLOSE_PARENTHESIS');

// 20. Before refactoring the parseOperator with the parseCharacter function, there’s another thing to address.
// We need a choice function. This handy operator will help us decide between two parsers
const choice: (p1: Parser, p2: Parser) => Parser =
  (p1, p2) => (input) => {
    let result = p1(input);
    console.log('result: ', result)
    if (result.success) {
      return result;
    }

    result = p2(input);
    console.log('result 2: ', result)
    if (result !== null) {
      return result;
    }

    return result;
  };

// 21. Refactor the parseOperator by leveraging the parseCharacter and choice
// parsers.
// const parseOperator2 = choice(parseCharacter(...), ...)
// const parseOperator2 = choice(parseCharacter('+', 'OPERATOR'), )
// TODO: Skip task 21 to 25 I'm not fully understanding method signatures on these functional programming exercises

@Injectable({
  providedIn: 'root',
})
export class FunctionalTokeniserService {
  constructor() {}

  logTestOperator() {
    console.log('-- parseOperator --');
    console.log(parseOperator('+'));
    console.log(parseOperator('1 +'));
    console.log(parseOperator('+ 2'));

    console.log('-- parseOpenParenthesis --');
    console.log(parseOpenParenthesis('('));
    console.log(parseOpenParenthesis('+ ('));
    console.log(parseOpenParenthesis(')'));

    console.log('-- parseCloseParenthesis --');
    console.log(parseCloseParenthesis(')'));
    console.log(parseCloseParenthesis('+ )'));
    console.log(parseCloseParenthesis('()'));

    console.log('-- parseOpenParenthesis2 --');
    console.log(parseOpenParenthesis2('('));
    console.log(parseOpenParenthesis2('+ ('));
    console.log(parseOpenParenthesis2(')'));

    console.log('-- parseCloseParenthesis2 --');
    console.log(parseCloseParenthesis2(')'));
    console.log(parseCloseParenthesis2('+ )'));
    console.log(parseCloseParenthesis2('()'));

    console.log('-- choice --');
    console.log(choice(parseNumber, parseOperator)('1+2'))
    console.log(choice(parseNumber, parseOperator)('+2'))

  }
}
