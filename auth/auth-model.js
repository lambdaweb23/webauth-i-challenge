const express = require("express");
const db = require("../data/db-config");

function add(user) {
// sqlite already sends back 'id' but we need to send it back for other dbs
 return db("users").insert(user, "id");
}
function findBy(filter) {
 return db("users").where(filter);
}
function find() {
   return db('users').select('id', 'username');
 }

module.exports = {
 add,
 findBy,
 find
};