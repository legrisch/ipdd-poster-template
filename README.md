# Readme

This template facilitates the creation of an IPDD Poster for the website ipdd.hfg-karlsruhe.de and should get you started in no time.

## Features

*   Transpiles ES6+ JavaScript using Babel
*   SASS/SCSS support
*   Linting using ESLint
*   Vendor-prefixes CSS using Autoprefixer
*   Minifies JavaScript and CSS
*   Watches for changes to your source files and rebuilds the poster automagically

## Requirements

To use this boilerplate you need to have Node.js installed:

*   Install [Node.js](https://nodejs.org/en/)

## Boilerplate Installation

1.  To download the boilerplate click on Download ZIP or clone this git repository.
2.  Open Terminal.app and go to the poster directory: cd /path/to/poster/directory or drag the poster directory onto the Terminal icon.
3.  Run `npm install` to install the necessary dependencies
4.  Run `npm test` to build the poster and start a development server

### Walkthrough

This is a step-by-step walkthrough of how to set up this template in order to be able to develop an IPDD Poster.  
You may learn how to use an IDE (~ a proper code editor) and gain some knowledge about advanced web development.

#### Installing Requirements

To use this template you need to have these things installed:

*   [Node.js](https://nodejs.org/en/). This is a JavaScript Runtime that is able to run outside of your browser and therefore lets you do things like read from and write to your disk or access your network. We use it as a development server (More on that later), to bundle our IPDD poster and compress it to a single .zip file. If you are on macOS, I strongly recommend installing Node.js together with a Node.js version management software. One of those is called `n`, it's great and dead simple, you can get it [here](https://github.com/tj/n).
*   An Editor of your choice, I strongly recommend (and base this guide on) [Microsoft Visual Studio Code](https://code.visualstudio.com/), it's free! I will refer to it as VS Code from now on.
*   (Optional) git. It's preinstalled on macOS and Linux, however on Windows you need to install it separately. It's a version management tool. Think of it as a meaningful way to make backups inbetween development stages of your poster. If you have never worked with git before it can be a bit daunting at first, so make sure to [get the basics](https://rogerdudler.github.io/git-guide/index.de.html) first. A good Git Client also facilitates an easier workflow, one of them is called Fork, get it [here](https://git-fork.com/).

#### Checks & Additional Requirements

Now that we installed everything we want to make sure that everything is running fine and on the fly gain some basic knowledge navigating the Terminal. As the majority of HfG students are using a Mac, this guide will from now on focus on working oin macOS. If you are on a different platform like Windows or Linux, feel free to contact us.  

First, we will open VS Code. It will as you to open a "Workspace" which is a fancy name for your project folder. This folder will contain everything that is needed to build your IPDD poster. This should be the folder you downloaded earlier.

Now that VS Code knows where to operate, open up a Terminal with _Terminal → New Terminal_, this opens a Terminal in the currently opened directory/workspace – very handy.  
Type in `node --version` and hit return. It should print something like "v14.15.1" which tells you that Node.js is correctly installed and running whatever version it printed.  

We will install an extension to VS Code called eslint. This extension tries to make sure that we write JavaScript that actually works by calling out probable errors and enforce a coding style on our code. Head to the extensions and install the extension "ESLint" by "Dirk Baeumer".

This template comes with a lot of features already built-in. To use them, we need to install the _dependencies_. For this we make use of <a href"https:="" www.npmjs.com="" "="">npm</a>, Node.js' built-in package manager. All we have to do is use the already opened terminal, type in `npm install` and hit return – this might take a while.

#### Usage

We are ready to actually use this template! So what's this fuzz all about? Let's start our development server. Go to your terminal again, type in `npm run test`. This should open up your browser, the addressbar should read something like _http://localhost:1234_. The poster you are developing lives inside _index.html_ in your workspace. Change something there and save the file: you will see that your changes get reflected immediately. This is called hot module reloading and is only one of the perks of this template.

As long as you are developing your IPDD Poster, you will likely want to use `npm run test` to preview your poster the way it will be visible on the IPDD Website.

As soon as you are finished, use `npm run bundle` to compress it to a single .zip file and send it to us.