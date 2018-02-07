# utopian-api

This is the official npm package for the utopian api.

[![Build Status](https://travis-ci.org/utopian-io/utopian-api-npm.svg?branch=master)](https://travis-ci.org/utopian-io/utopian-api-npm)

## Installation

To install this libary run: `npm i utopian-api --save`

## Running Tests

For running tests locally run: `npm test`

#### Tests
- Standard(Code Quality)
- Chai & Mocha(API tests)

#### To fix small code quality issues

- Check if standard is installed globally. If not, then run `npm install -g standard`

- Type `standard --fix`

## Methods
`getUser()` : returns an utopian user

`getUserAvatar()` : returns user's avatar

`getModerators()` : returns array of utopian moderators

`getSponsors()` : returns array of utopian sponsors

`getModerator(username)` : returns array with informations if username is an utopian moderator otherwise the array is empty

`getSponsor(username)` : returns array with informations if username is an utopian sponsor otherwise the array is empty

`getPosts(options)` : returns array of posts. Use options to apply filters.

`getPostsByGithubProject(repoName, options)` : returns array of posts related to github repositry. Use options (optionally) to apply filters.

`getPendingPosts()` : alias to get pending posts

`getPendingPostsByModeratorAndCategory(moderator, category)` : alias to get pending posts for the given moderator in the given category

`getPendingPostsByModerator(moderator)` : alias to get pending posts for the given moderator

`getPendingPostsCount()` : get total pending posts count

`getTotalPostCount()` : get total posts count

`getStats()` : get utopian statistics


## Examples

*Get all moderators and log their names:*

````js
const utopian = require('utopian-api');

utopian.getModerators().then((moderators) => {
    for (i = 0; i < moderators.results.length; i++) {
        console.log(moderators.results[i].account)
    }
});
````
*Get all sponsors and log their names:*

````js
const utopian = require('utopian-api');

utopian.getSponsors().then((sponsors) => {
    for (i = 0; i < sponsors.results.length; i++) {
        console.log(sponsors.results[i].account)
    }
});
````

*Check wether a user is a utopian.io mod:*

````js
const utopian = require('./api');
utopian.getModerator("wehmoen").then((result) => {
    console.log(result);
}); // returns [{_id: '5a4bf....}]
utopian.getModerator("ned").then((result) => {
    console.log(result);
}); //returns []
````

*Get posts for the development category:*

````js
const utopian = require('utopian-api');

utopian.getPosts({
    sortBy: 'created',
    type: 'development'
}).then((posts) => {
    console.log(posts.results); //get the first 50 posts
});

utopian.getPosts({
    sortBy: 'created',
    type: 'development',
    skip: 50
}).then((posts) => {
    console.log(posts.results); //get the next 50 posts
});
````
*Limit the number of results:*
````js
const utopian = require('utopian-api');

utopian.getPosts({
    sortBy: 'created',
    type: 'development',
    limit: 5
}).then((posts) => {
    console.log(posts.results); //get the first 5 posts
});
````

*Get pending posts count:*

````js
const utopian = require('utopian-api');

utopian.getPendingPostsCount().then((count) => {
    console.log("There are " + count + " pending posts.");
})
````

*Get total posts count:*

````js
const utopian = require('utopian-api');

utopian.getTotalPostsCount().then((count) => {
    console.log("There are " + count + " posts on utopian.io. AMAZING!");
})
````

*Get posts of utopian-io/utopian-api-npm project hosted on github:*

````js
const utopian = require('utopian-api');

utopian.getPostsByGithubProject('utopian-io/utopian-api-npm', {
    type: 'development'
}).then(response => {
    console.log("There are " + response.total + " posts on utopian-io/utopian-api-npm project. AMAZING!");
})
````


````js
const utopian = require('utopian-api');

utopian.getStats().then((data) => {
  console.log(data);
})
````
````js
let utopian = require('utopian-api');

utopian.getTopProjects({
    limit: 5,
    start_date: '2017-12-08',
    end_date: '2018-01-20',
    sort_by: 'contributions',   // contributions or rewards
    retrieve_by: 'projects',    // projects or contributions
    only_new: false
}).then((data) => {
    console.log(data); 
});
````
*Get an Individual Post*
````js
let utopian = require('utopian-api');

utopian.getPost('ms10398','add-tests-ci-and-standard-code-quality-checks-in-npm-package').then((data) => {
    	console.log(data);
  	}
);
````
*Get Post URL*
````js
let utopian = require('utopian-api');

utopian.getPostURL('26763950').then((data) => {
    	console.log(data);
  	}
);
````
*Get Post By Author*
````js
let utopian = require('utopian-api');

utopian.getPostByAuthor('ms10398').then((data) => {
    	console.log(data);
  	}
);
````
*Get User*
````js
let utopian = require('utopian-api');

utopian.getUser('hsynterkr').then((data) => {
    console.log(data);
});
````
*Get User Avatar*
````js
let utopian = require('utopian-api');

utopian.getUserAvatar('hsynterkr',{
    size: 48,
    round: true
}).then((data) => {
    console.log(data);
});
````
*Get User*
````js
let utopian = require('utopian-api');

utopian.getUserRepos('hsynterkr').then((data) => {
    console.log(data);
});
````
## Contribution

If you want to contribute to this package create a fork, make your changes and create a pull request.
