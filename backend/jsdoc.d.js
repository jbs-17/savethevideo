// jsdoc.d.js
/**
 * @typedef {import('express').Request} ExpressRequest - Objek permintaan Express.
 * @typedef {import("express").Response & {
 *   success: (message: string, data?: any) => void,
 *   fail: (message: string, data?: any, error?: any) => void
 * }} ExpressResponse - Objek respons Express.
 */


/**
 * @typedef {import("express").Response & {
 *   success: (message: string, data?: any) => void,
 *   fail: (message: string, data?: any, error?: any) => void
 * }} ExtendedResponse
 */

/**
 * @typedef {import('mongodb').Db} MongoDBDatabase - Instance database MongoDB yang terhubung.
 * @typedef {import('./services/app-error-service').AppError} AppError -- Error App
 */