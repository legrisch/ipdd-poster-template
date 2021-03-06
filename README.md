# Readme

This template is the starting point of every IPDD poster. It serves as a local development server, a way of previewing the poster in it's final dimensions and a bundler to put everything in a .zip file to send it to the IPDD Webmaster.

This readme is divided into a
* **[Walkthrough for beginners](#walkthrough-for-beginners)** of how to setup and use the template and a 
* **[Pro-oriented rundown](#for-the-professionals)** of the templates' features, common installation requirements and commands.

<div class="card">

## Walkthrough for beginners

This is a step-by-step walkthrough of how to set up this template in order to be able to develop an IPDD Poster.  
You will use an IDE (~ a proper code editor) and gain some knowledge about advanced web development.

### Installing Requirements

To use this template you need to have these things installed:

*   [Node.js](https://nodejs.org/en/). This is a JavaScript Runtime that is able to run outside of your browser and therefore lets you do things like read from and write to your disk or access your network. We use it as a development server (More on that later), to bundle our IPDD poster and compress it to a single .zip file. If you are on macOS, I strongly recommend installing Node.js together with a Node.js version management software. One of those is called `n`, it's great and dead simple, you can get it [here](https://github.com/tj/n).
*   An Editor of your choice, I strongly recommend (and based this guide on) [Microsoft Visual Studio Code](https://code.visualstudio.com/), it's free! This guide will refer to it as VS Code from now on.

### Checks & Additional Requirements

Now that we installed the basics we want to make sure that everything is running fine and add some additional software. As from my experience the majority of HfG students are using a Mac, this guide will from now on focus on working in macOS. If you are on a different platform like Windows or Linux, feel free to contact us.

1. First, download this template by clicking "Code" → "Download zip". Unpack it in a meaningful location and and drag the top level directory (probably called "ipdd-poster-template") on the VS Code icon in the dock. This will open VS Code with this directory as your _Workspace_.

2. Now that VS Code knows where to operate, open up a Terminal with _Terminal → New Terminal_, this opens a Terminal already in the currently opened directory/workspace – very handy as you don't have to [`cd`](https://www.macworld.com/article/2042378/master-the-command-line-navigating-files-and-folders.html) there.
Type in <span class="copy">`node --version`</span> and hit return. It should print something like "v14.15.1" which tells you that Node.js is correctly installed and running whatever version it printed.

3. This template comes with a lot of features already built-in. To use them, we need to install the _dependencies_ – code that this template is depending upon. For this we make use of [npm](https://www.npmjs.com/), Node.js' built-in package manager. All we have to do is use the already opened terminal, type in <span class="copy">`npm install`</span> and hit return – this might take a while.

4. We will install an extension to VS Code called "ESLint". This extension integrates [ESLint](https://ESLint.org/) – a dependency of this template – in VS Code. Click [here](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-ESLint) to install the extension.  
What ESLint does: as JavaScript doesn't need to be compiled in order to run there's no compiler that catches errors before the code is actually running. ESLint scans your JavaScript code for conformance and sets standards and guidelines. Basically it tries to make sure that you write JavaScript code that works by calling out possible errors beforehand and enforcing a coding style on our code.

### Usage

#### Starting up the development server

So now that everything is ready we can start creating our poster. We fire up a local development server with a live preview which lets you see your poster in a real environment – an iframe in another page with certain dimensions.  
Use the already opened terminal, type in <span class="copy">`npm run test`</span> and hit return. This not only starts the server but also openes your browser. As the development server is able to hot-module-reload, there's almost never the need to refresh the page when you make changes to your code.

#### Locations

This is the default file and directory structure:
```
ipdd-poster-template/
│
├── src/                 This is the important directory for you
│   │
│   ├── assets/          images, videos, etc. go here
│   │
│   ├── fallback/        Fallback images
│   │   └── 600.jpg    Template for a fallback image
│   │
│   ├── scripts/         .js files go here
│   │   ├── main.js      Your main application code
│   │   └── ready.js     Do not modify
│   │
│   ├── styles/          .css, .scss files go here
│   │   └── main.scss    Your main application styles
│   │
│   └── index.html       Your main index.html file
│
├── test/…                Do not modify – preview page
└── bundler/…             Do not modify – bundle script
```

* Your poster completely resides in the `src/` directory.
* The main entrypoint of your poster will be `src/index.html`.
  * It is entirely customizable, there's only one exception: It needs to include the script located in `src/scripts/ready.js`.
* Put your stylesheets in `src/styles`.
  * Notice that the default file here `src/styles/main.scss` is a .scss file and makes using [sass](https://sass-lang.com/documentation) (a superset of css) possible. However if you don't feel confident to use sass, it is perfectly possible to write regular css in a .scss file.
* Put your JavaScript in `src/scripts`.
  * [Babel](https://babeljs.io/) will [_transpile_](https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them) your JavaScript code automatically so that you can use the latest JavaScript specs and don't need to worry about supporting older browsers. Feel free to use [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), …
* Put your assets like images and videos into `src/assets`.
  * [Parcel](https://v2.parceljs.org/) will help bundle your poster into one neat .zip package ready to ship to us. It starts from your main entry file – `src/index.html` – and works its way through all referenced files. If it's coming across an image in `src/index.html`, it will be added to the bundle. If there's another .js file referenced in `src/scripts/main.js` with `import { whatever } from './anotherJsFile.js'` it will be added to the bundle as well.
* Put your fallback images in `src/fallback`
  * Your poster will not be visible on mobile browsers to save bandwidth and make the website more accessible to users. To show the best representation of it, we want you to place fallback images in `src/fallback`. These images should always be square and will be placed in an image with a [srcset](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) attribute. In the [bundling step](#wrapping-it-up-aka-bundling) these images are analyzed and added to the bundle automatically, there's **no need to reference** them anywhere.

Everything inside `src/index.html` is subject to change on your side and the defaults merely put you in a good starting position.  
Again: everything that is referenced from `src/index.html` or its references will be included in the final bundle.

#### Wrapping it up a.k.a. Bundling

So you are finished with your poster, heh? There's just one more thing to do: Use the terminal, type in <span class="copy">`npm run bundle`</span> and hit return. This starts a bundling process which collects all files used in your poster and produces a single .zip file. Send this file to us and you're done, congratulations! 🎉

____

#### When something goes wrong

If you feel like something is going sideways when previewing your page these are the things you can do to get back on track:

* Delete the bundler cache folder `.parcel-cache`.
* Delete the bundler dist folder `dist`.
* Reinstall all dependencies:
  1. Delete the folder `node_modules`.
  2. Reinstall the dependencies as you did before with running <span class="copy">`npm install`</span> in a Terminal that is opened in the root directory of this template.

</div>
<div class="card">

## For The Professionals

### Features

*   Bundling using Parcel v2
*   Transpiling ES6+ JavaScript using Babel (→ browserlist property in package.json)
*   SASS/SCSS support
*   Linting using ESLint
*   Vendor-prefixes CSS using Autoprefixer
*   Minifies JavaScript and CSS
*   Watching for changes to source files and rebuilds the poster automatically i.e. hot module reloading
*   Automatic fallback image bundling and static hosting

### Requirements

To use this boilerplate you need to have Node.js installed:

*   [Node.js](https://nodejs.org/en/)

I recommend using VS Code with the ESLint extension installed:

*   [Microsoft Visual Studio Code](https://code.visualstudio.com/)
*   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-ESLint)

### Template Installation

1.  To download the template click on "Code" → "Download zip" or clone this git repository.
2.  Open Terminal.app and go to the poster directory: cd /path/to/poster/directory or drag the poster directory onto the Terminal icon.
3.  Run <span class="copy">`npm install`</span> to install the necessary dependencies.
4.  Run <span class="copy">`npm run test`</span> to build the poster and start a development server with a live preview.
5.  Run <span class="copy">`npm run bundle`</span> to bundle the poster to a single .zip file ready to ship to us.

</div>