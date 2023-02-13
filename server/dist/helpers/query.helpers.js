"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Query {
    select(columns, table, where) {
        const sql = [`SELECT ${columns.toString()} FROM ${table}`];
        if (where?.length) {
            where.map((item, i) => sql.push(`WHERE ${item} = $${i + 1} `));
        }
        return sql.join(" ");
    }
    insert(table, columns, returning = []) {
        let counter = 1;
        const keys = [];
        const placeHolder = [];
        const values = [];
        columns.map((item) => {
            const num = [];
            Object.entries(item).map(([key, value]) => {
                if (keys.length < Object.keys(item).length) {
                    keys.push(key);
                }
                num.push(`$${counter}`);
                values.push(value);
                counter++;
            });
            placeHolder.push(`(${num.toString()})`);
        });
        const sql = `INSERT INTO ${table} (${keys.toString()})
      values ${placeHolder.toString()} RETURNING ${returning?.toString()}`;
        return { sql, values };
    }
    update(table, column, returning = []) {
        const values = [];
        const placeHolders = [];
        Object.entries(column).map(([key, value], i) => {
            placeHolders.push(`${key}=$${i + 1}`);
            values.push(value);
        });
        const sql = `UPDATE ${table}
      SET ${placeHolders.toString()}
      WHERE id=$${placeHolders.length + 1}
      RETURNING ${returning?.toString()}`;
        return { sql, values };
    }
    delete(table, returning) {
        const sql = `DELETE FROM ${table} WHERE id=($1) 
                ${returning ? "RETURNING " + returning.toString() : ""}`;
        return sql;
    }
    exist(table, column) {
        const sql = `SELECT  EXISTS (SELECT  count(*) FROM ${table}
    WHERE ${column} = $1 HAVING count(*) > 0) as exist`;
        return sql;
    }
}
const query = new Query();
exports.default = query;
