const google = require('googleapis')
const auth = require('../google-apis')
const Promise = require('bluebird')

const events = google.calendar('v3').events
const calendarId = '269m08gnggsctv40qtn2kpclgs@group.calendar.google.com'
const defaultOptions = { auth, calendarId }

exports.index = (req, res) => {
  createAPIRequest(defaultOptions, 'list', res)
}

exports.create = ({ body }, res) => {
  createAPIRequest(Object.assign(body, defaultOptions), 'insert', res)
}

exports.show = ({ body }, res) => {
  createAPIRequest(Object.assign(body, defaultOptions), 'get', res)
}

exports.update = ({ body }, res) => {
  createAPIRequest(Object.assign(body, defaultOptions), 'update', res)
}

exports.destroy = ({ body }, res) => {
  createAPIRequest(Object.assign(body, defaultOptions), 'delete', res)
}

function createAPIRequest (options, method, res) {
  Promise.fromCallback(cb => events[method](options, cb))
    .then(({ items }) => {
      res.json(items)
    })
    .error(error => {
      res.status(error.code).json({
        status: error.code,
        error: {
          code: error.errors[0].reason,
          message: error.errors[0].message
        }
      })
    })
}