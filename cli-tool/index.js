#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

//console.log(chalk.bgGreen('hi mom'));

let playerName;

const sleep = (ms=2000) => new Promise((r)=> setTimeout(r,ms));

const welcome = async () => {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who Wants To Be A JavaScript Millionaire? \n'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
    ${chalk.bgBlue('HOW TO PLAY')}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...


    `);

}


const askName = async () => {
    const answers = await inquirer.prompt({
        name:'player_name',
        type:'input',
        message:'What is your name?',
        default(){
            return 'Player';
        },
    });

    playerName = answers.player_name;
}


const question1 = async () => {
    const answers = await inquirer.prompt({
        name:'question_1',
        type:'list',
        message:'JavaScript was created in 10days then released on\n',
        choices: [
            'May 23rd, 1995',
            'Nov 24th, 1995',
            'Dec 4th, 1995',
            'Dec 17th, 1996',
        ],
    });

    return handleAnswer(answers.question_1 === 'Dec 4th, 1995');
}

const question2 = async () => {
    const answers = await inquirer.prompt({
        name:'question_2',
        type:'list',
        message:'What is x? var x = 1_1 + "1" + Number(1)\n',
        choices: [
            `"1111"`,
            4,
            `"4"`,
            69420,
        ],
    });

    return handleAnswer(answers.question_2 === `"1111"`);
}

const question3 = async () => {
    const answers = await inquirer.prompt({
        name:'question_3',
        type:'list',
        message:`What is the first element in the array? ['🐏', '🦙', '🐍'].length = 0\n`,
        choices: [
            0,
            '🐏',
            '🐍',
            'undefined'
        ],
    });

    return handleAnswer(answers.question_3 === 'undefined');
}

const question4 = async () => {
    const answers = await inquirer.prompt({
        name:'question_4',
        type:'list',
        message:'Which of the following is NOT a primitive type?\n',
        choices: [
            'boolean',
            'number',
            'null',
            'object',
        ],
    });

    return handleAnswer(answers.question_4 === 'object');
}

const question5 = async () => {
    const answers = await inquirer.prompt({
        name:'question_5',
        type:'list',
        message:`JS is a high-level single-threaded, garbage-collected,
interpreted(or just-in-time compiled), prototype-based,
multi-paradigm, dynamic language with a ____ event loop\n`,
        choices: [
            'multi-threaded',
            'non-blocking',
            'promise-based',
            'synchronous',
        ],
    });

    return handleAnswer(answers.question_5 === 'non-blocking');
}


const handleAnswer = async (isCorrect) => {
    const spinner = createSpinner('Checking answer...').start()
    await sleep();

    if(isCorrect){
        spinner.success({text: `Nice work ${playerName}. That's a legit answer`});
    }else{
        spinner.error({text: `💀💀💀 Game over, you lose ${playerName}!`})
        process.exit(1);
    }
}

const winner = async () => {
    console.clear();
    const msg = `Congrats, ${playerName} !\n You are genius!!!`;
    figlet(msg, (err,data) => {
        console.log(gradient.pastel.multiline(data));
    })
}

const msg = async () => {
    console.log(chalk.green(`Programming isn't about what you know; it's about making the command line look cool`));
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await winner();
