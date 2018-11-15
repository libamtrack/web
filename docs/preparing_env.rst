=====================
Preparing environment
=====================

Requirements
============

To install and run LibamtrackWeb on your computer you need to have `node.js`_ server installed and web browser 
which supports JavaScript scripts.

.. note:: (Windows users) Be sure that you have Node Package Manager - npm - set in system path.

How to install
==============

1. Clone repository to local directory:
:: 
    
    git clone https://github.com/libamtrack/web.git

2. Go into cloned repository:
::

    cd ./web

3. Install required dependencies:
::

    npm install

4. Run app on local server:
::

    npm run start


Deploying app on GitHub Pages
=============================

To deploy LibamtrackWeb app on GitHub Pages:

1. Specify GitHub Pages URL in **package.json**: 
::

    "homepage": *URL*

2. Run command:
::

    npm run deploy