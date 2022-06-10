---
layout: layouts/post.njk
title: Coding a basic game in Python
description: Some code I wrote to play the game hangman.
date: 2022-06-02T23:00:00.000Z
featuredImage: /media/uploads/test.jpg
---
```python
import random


words = ["suspect","sneeze","chemical", "stupendous", "knowing", "precious",
         "glorious", "clumsy", "detail", "curious", "scent", "possible"]


def result(word):

    sort_word = {key: value for key, value in sorted(word.items(), key=lambda x: x[0])}
    new_word = "".join(sort_word.values())
    
    return new_word


def main():

    play_again = input("\nDo you wish to play?\n").lower()
    input_a = {}
    c_limit = 10

    while play_again[0] == "y":

        count = 0
        word = random.choice(words)
        input_b = []

        for x in range(len(word)):
            input_a[x] = "_"

        word_b = result(input_a)
        guess = ""

        while True:
            
            count += 1

            if count <= c_limit:

                if guess != word and word != word_b:
                    
                    guess = input("\nGuess a letter or a word:\n")
                    input_b.append(guess)
                    index = 0

                    for x in word:
                        if x == guess:
                            input_a[index] = guess
                        index += 1
                        
                    word_b = result(input_a)
                    print("\nYou have guessed:\n")
                    print(", ".join([f"{x}" for x in input_b]))
                    print(f"\n{word_b}\n")
                    print(f"\nNumber of guesses: {count}/10\n")

                elif guess == word or word == word_b:
                    
                    print(f"You win, the word is: {word}")
                    play_again = input("\nDo you wish to play again?\n").lower()
                    break

            else:
                
                print("\nYou lose\n")
                play_again = input("\nDo you wish to play again?\n").lower()
                break

    print("\nGame over\n")


main()
```