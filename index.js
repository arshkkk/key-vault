#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

// console.log(chalk.green("hello"))
// chalkAnimation.neon("My Name is John")
// // chalkAnimation.karaoke("My Name is John")
// // chalkAnimation.glitch("My Name is John")
// // chalkAnimation.radar("My Name is John")
// // chalkAnimation.pulse("My Name is John")
// // chalkAnimation.rainbow("My Name is John")

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
      validate: function (value) {
        // Your validation logic here
        // For example, checking if the name contains only letters
        const valid = /^[a-zA-Z]+$/.test(value);
        return valid || "Please enter a valid name (letters only)";
      },
    },
    {
      type: "list",
      name: "travelDestination",
      message: "Where would you like to travel?",
      choices: ["Beach", "Mountains", "City"],
    },
    {
      type: "confirm",
      name: "isTravelling",
      message: "Are you currently travelling?",
      default: false, // Default value if the user just presses Enter
    },
    // Add more questions as needed
  ])
  .then(async (answers) => {
    const spinner = createSpinner("checking").start();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    spinner.success();

    console.log("User responses:", answers);
    // Do something with the user's responses
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });
