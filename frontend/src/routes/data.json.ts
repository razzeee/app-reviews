import * as api from '$lib/api'
import yourJSON as api from 'path-to-file/customers.json'

export async function get({ query, locals }) {

  return {
    status: 200,
    body: {
      yourJSON
    }
  }

}