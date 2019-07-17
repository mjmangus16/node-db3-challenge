const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first()
    .then(scheme => {
      if (scheme) {
        return scheme;
      } else {
        return null;
      }
    });
}

function findSteps(id) {
  // SELECT s.id, s.scheme_name, st.step_number, st.instructions FROM
  // schemes AS s INNER JOIN steps AS st ON s.id = st.scheme_id
  return db("schemes")
    .join("steps", "steps.scheme_id", "schemes.id")
    .select(
      "steps.id",
      "schemes.scheme_name",
      "steps.step_number",
      "steps.instructions"
    )
    .where("schemes.id", id);
}

function add(scheme) {
  return db("schemes")
    .insert(scheme, "id")
    .then(id => {
      return findById(...id);
    });
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .del();
}
