const { URL } = require('url')

const API_HOST = 'https://api.utopian.io/api'
const ENDPOINT_MODERATORS = API_HOST + '/moderators'
const ENDPOINT_SPONSORS = API_HOST + '/sponsors'
const ENDPOINT_POSTS = API_HOST + '/posts'
const ENDPOINT_STATS = API_HOST + '/stats'
const ENDPOINT_POSTS_TOP = ENDPOINT_POSTS + '/top'
const GITHUB_REPO_URL = 'https://api.github.com/repos/'
const ENDPOINT_USER = API_HOST + '/users/'

let utopian = {}

/**
 * @method encodeQueryData: Add parameter to a given url
 * @param {Object} parameters: Object of parameter
 * @returns encoded url with the parameters given.
 */
const encodeQueryData = function (parameters) {
  // temporary data holder
  let ret = []
  for (let d in parameters) { ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(parameters[d])) }
  return ret.join('&')
}

/**
 * @method requestURL: Fetch an API and returns its body
 * @param {string} url: String of the url to fetch
 * @returns A promise with the body of the response
 * @throws If promise is done but api returned error, reject the promise with the error. Otherwise, throw an error
 */
const requestURL = function (url) {
  const myURL = new URL(url)
  const options = {
    hostname: myURL.hostname,
    protocol: myURL.protocol,
    path: myURL.pathname + myURL.search,
    headers: { 'User-Agent': '' }
  }
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const lib = url.startsWith('https') ? require('https') : require('http')
    const request = lib.get(options, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode))
      }
      // temporary data holder
      const body = []
      // on every content chunk, push it to the data array
      response.on('data', (chunk) => body.push(chunk))
      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(body.join('')))
    })
    // handle connection errors of the request
    request.on('error', (err) => reject(err))
  }).catch((err) => {
    throw err
  })
}

/**
 * @method getModerators: Return the moderators of Utopian
 * @returns Promise object array of utopian moderators
 */
utopian.getModerators = () => {
  return new Promise((resolve, reject) => {
    requestURL(ENDPOINT_MODERATORS).then((data) => {
      resolve(JSON.parse(data))
    }).catch((err) => reject(err))
  })
}

/**
 * @method getSponsors: Return the sponsors of Utopian
 * @returns Promise object array of utopian sponsors
 */
utopian.getSponsors = () => {
  return new Promise((resolve, reject) => {
    requestURL(ENDPOINT_SPONSORS).then((data) => {
      resolve(JSON.parse(data))
    }).catch((err) => reject(err))
  })
}

/**
 * @method getStats: Return the return utopian statistics
 * @returns Promise object array of utopian statistics
 */
utopian.getStats = () => {
  return new Promise((resolve, reject) => {
    requestURL(ENDPOINT_STATS).then((data) => {
      resolve(JSON.parse(data))
    }).catch((err) => reject(err))
  })
}

/**
 * @method getModerator: Return the return specific data from a moderator
 * @argument {string} username: username of the moderator
 * @returns Promise object array of utopian moderators
 */
utopian.getModerator = (username) => {
  return new Promise((resolve, reject) => {
    utopian.getModerators().then((moderators) => {
      moderators.results.filter((moderator) => {
        if (moderator.account === username && moderator.banned === false && moderator.reviewed === true) {
          resolve(moderator)
        }
      })
    }).catch((err) => reject(err))
  })
}

/**
 * @method getSponsor: Return the return specific data from a Sponsor
 * @argument {string} username: username of the sponsor
 * @returns Promise object array of utopian sponsor
 */
utopian.getSponsor = (username) => {
  return new Promise((resolve, reject) => {
    utopian.getSponsors().then((sponsors) => {
      sponsors.results.filter((sponsor) => {
        if (sponsor.account === username) {
          resolve(sponsor)
        }
      })
    }).catch((err) => reject(err))
  })
}

/**
 * @method getPosts: Return list of posts in a given query
 * @argument {Object}: query for the data
 * @returns Promise object array of posts
 */
utopian.getPosts = (options) => {
  if (!options) options = {}

  if (options.limit > 20 || options.limit < 1) {
    options.limit = 20
  }

  if (options.length === 0) {
    options.limit = 20
    options.skip = 0
  }

  return new Promise((resolve, reject) => {
    requestURL(ENDPOINT_POSTS + '?' + encodeQueryData(options)).then((data) => {
      resolve(JSON.parse(data))
    }).catch((err) => reject(err))
  })
}

/**
 * @method getTopProjects: Return list of top projects in a given query
 * @argument {Object}: query for the data
 * @returns Promise object array of top projects
 */
utopian.getTopProjects = (options) => {
  if (!options) options = {}

  return new Promise((resolve, reject) => {
    requestURL(ENDPOINT_POSTS_TOP + '?' + encodeQueryData(options)).then((data) => {
      resolve(JSON.parse(data))
    }).catch((err) => reject(err))
  })
}

/**
 * @method getTotalPostCount: Return count of all posts
 * @returns Promise type number
 */
utopian.getTotalPostCount = () => {
  return new Promise((resolve, reject) => {
    requestURL(ENDPOINT_POSTS + '?' + encodeQueryData({ limit: 1, skip: 0 })).then((data) => {
      resolve(JSON.parse(data).total)
    }).catch((err) => reject(err))
  })
}

/**
 * @method getPost: Return the post in a given query
 * @argument {string, string}: author and permlink of the post
 * @returns Promise object of post
 */
utopian.getPost = (username, permlink) => {
  return new Promise((resolve, reject) => {
    requestURL(ENDPOINT_POSTS + '/' + username + '/' + permlink).then((data) => {
      resolve(JSON.parse(data))
    }).catch((err) => reject(err))
  })
}

/**
 * @method getPostURL: Return the post URL
 * @argument {string}: postID in blockchain
 * @returns Promise URL of the post
 */
utopian.getPostURL = (postID) => {
  return new Promise((resolve, reject) => {
    requestURL(ENDPOINT_POSTS + '/byid/' + postID).then((data) => {
      resolve('https://utopian.io' + JSON.parse(data).url)
    }).catch((err) => reject(err))
  })
}

/**
 * @method getPostByAuthor: Return the posts
 * @argument {username, options}: username of author and limit and skip as options
 * @returns Promise Object of the posts
 */
utopian.getPostByAuthor = (username, options) => {
  return new Promise((resolve, reject) => {
    if (!options) options = {}
    if (options.limit > 20 || options.limit < 1) {
      options.limit = 20
    }
    if (options.length === 0) {
      options.limit = 20
      options.skip = 0
    }
    options.section = 'author'
    options.author = username
    requestURL(ENDPOINT_POSTS + '?' + encodeQueryData(options)).then((data) => {
      resolve(JSON.parse(data))
    }).catch((err) => reject(err))
  })
}

/**
 * @method getPostsByGithubProject: Return list of posts related to given github repository
 * @argument {string} repoName: repository name, i.e.: utopian-io/utopian-api-npm
 * @argument {Object} options: options for the data (optional)
 * @returns Promise object array of posts
 */
utopian.getPostsByGithubProject = (repoName, options) => {
  return new Promise((resolve, reject) => {
    return getGithubRepoIdByRepoName(repoName)
      .then(projectId => {
        return utopian.getPosts(Object.assign({
          section: 'project',
          sortBy: 'created',
          platform: 'github',
          projectId,
          type: 'all'
        }, options || {})).then(resolve).catch(reject)
      }).catch(reject)
  })
}

/**
* @method getGithubRepoIdByRepoName: Return github repo id by given github repo
* @argument {string} repoName: repository full name, i.e.: utopian-io/utopian-api-npm
* @returns Promise object array of posts
*/
function getGithubRepoIdByRepoName (repoName) {
  return new Promise((resolve, reject) => {
    requestURL(GITHUB_REPO_URL + repoName).then((data) => {
      resolve(JSON.parse(data).id)
    }).catch((err) => reject(err))
  })
}

module.exports = utopian
